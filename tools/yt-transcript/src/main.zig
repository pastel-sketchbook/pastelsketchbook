const std = @import("std");
const http = std.http;

// ── Types ──

const Segment = struct {
    text: []const u8,
    offset: f64,
    duration: f64,
};

const OutputFormat = enum { text, json };

const Args = struct {
    video_id: []const u8 = "",
    lang: []const u8 = "en",
    max_chars: usize = 0,
    format: OutputFormat = .text,
};

// ── Entry ──

pub fn main(init: std.process.Init) !void {
    const io = init.io;

    var gpa = std.heap.DebugAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const args = parseArgs(init.minimal.args) catch |err| {
        switch (err) {
            error.ShowHelp => {
                printUsage(io);
                return;
            },
            else => {
                printUsage(io);
                std.process.exit(1);
            },
        }
    };

    const segments = fetchTranscript(allocator, io, args.video_id, args.lang) catch |err| {
        var buf: [256]u8 = undefined;
        const msg = std.fmt.bufPrint(&buf, "error: failed to fetch transcript: {s}\n", .{@errorName(err)}) catch "error: failed to fetch transcript\n";
        std.Io.File.stderr().writeStreamingAll(io, msg) catch {};
        std.process.exit(1);
    };
    defer {
        for (segments) |seg| allocator.free(seg.text);
        allocator.free(segments);
    }

    if (segments.len == 0) {
        try std.Io.File.stderr().writeStreamingAll(io, "error: no transcript segments found\n");
        std.process.exit(1);
    }

    switch (args.format) {
        .text => writeText(io, segments, args.max_chars) catch std.process.exit(1),
        .json => writeJson(io, segments) catch std.process.exit(1),
    }
}

// ── Arg parsing ──

fn parseArgs(args: std.process.Args) !Args {
    var it = std.process.Args.Iterator.init(args);
    _ = it.next(); // skip program name

    var result = Args{};

    var positional_only = false;
    while (it.next()) |arg| {
        if (positional_only) {
            result.video_id = arg;
        } else if (std.mem.eql(u8, arg, "--")) {
            positional_only = true;
        } else if (std.mem.eql(u8, arg, "--help") or std.mem.eql(u8, arg, "-h")) {
            return error.ShowHelp;
        } else if (std.mem.eql(u8, arg, "--lang")) {
            result.lang = it.next() orelse return error.MissingArgValue;
        } else if (std.mem.eql(u8, arg, "--max-chars")) {
            const val = it.next() orelse return error.MissingArgValue;
            result.max_chars = std.fmt.parseInt(usize, val, 10) catch return error.InvalidNumber;
        } else if (std.mem.eql(u8, arg, "--format")) {
            const val = it.next() orelse return error.MissingArgValue;
            if (std.mem.eql(u8, val, "json")) {
                result.format = .json;
            } else if (std.mem.eql(u8, val, "text")) {
                result.format = .text;
            } else {
                return error.InvalidFormat;
            }
        } else if (!std.mem.startsWith(u8, arg, "-")) {
            result.video_id = arg;
        } else {
            return error.UnknownFlag;
        }
    }

    if (result.video_id.len == 0) return error.MissingVideoId;
    return result;
}

fn printUsage(io: std.Io) void {
    const msg =
        \\Usage: yt-transcript <video-id> [options]
        \\
        \\Fetch YouTube video captions as plain text or JSON.
        \\
        \\Options:
        \\  --lang <code>       Language code (default: en)
        \\  --max-chars <n>     Truncate text output to n characters (0 = no limit)
        \\  --format <fmt>      Output format: text (default) or json
        \\  -h, --help          Show this help
        \\
        \\Examples:
        \\  yt-transcript dQw4w9WgXcQ
        \\  yt-transcript dQw4w9WgXcQ --lang en --max-chars 30000
        \\  yt-transcript dQw4w9WgXcQ --format json
        \\  yt-transcript -- -tZGlR8Zztg          # use -- for IDs starting with -
        \\
    ;
    std.Io.File.stdout().writeStreamingAll(io, msg) catch {};
}

// ── HTTP helpers ──

fn readResponseBody(allocator: std.mem.Allocator, response: *http.Client.Response) ![]const u8 {
    var transfer_buf: [8192]u8 = undefined;
    var decompress: http.Decompress = undefined;
    var decompress_buf: [std.compress.flate.max_window_len]u8 = undefined;
    var reader = response.readerDecompressing(&transfer_buf, &decompress, &decompress_buf);
    return try reader.allocRemaining(allocator, std.Io.Limit.limited(4 * 1024 * 1024));
}

fn httpGet(allocator: std.mem.Allocator, io: std.Io, url: []const u8) ![]const u8 {
    var client = http.Client{ .allocator = allocator, .io = io };
    defer client.deinit();

    const uri = try std.Uri.parse(url);

    var req = try client.request(.GET, uri, .{
        .extra_headers = &.{
            .{ .name = "User-Agent", .value = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" },
            .{ .name = "Accept-Language", .value = "en" },
        },
    });
    defer req.deinit();

    try req.sendBodiless();

    var redirect_buf: [8192]u8 = undefined;
    var response = try req.receiveHead(&redirect_buf);

    return readResponseBody(allocator, &response);
}

fn httpPost(allocator: std.mem.Allocator, io: std.Io, url: []const u8, payload: []const u8) ![]const u8 {
    var client = http.Client{ .allocator = allocator, .io = io };
    defer client.deinit();

    const uri = try std.Uri.parse(url);

    var req = try client.request(.POST, uri, .{
        .extra_headers = &.{
            .{ .name = "Content-Type", .value = "application/json" },
            .{ .name = "User-Agent", .value = "com.google.android.youtube/20.10.38 (Linux; U; Android 14)" },
        },
    });
    defer req.deinit();

    req.transfer_encoding = .{ .content_length = payload.len };
    var body_writer = try req.sendBodyUnflushed(&.{});
    try body_writer.writer.writeAll(payload);
    try body_writer.end();
    try req.connection.?.flush();

    var redirect_buf: [8192]u8 = undefined;
    var response = try req.receiveHead(&redirect_buf);

    return readResponseBody(allocator, &response);
}

// ── Transcript fetching ──

fn fetchTranscript(allocator: std.mem.Allocator, io: std.Io, video_id: []const u8, lang: []const u8) ![]Segment {
    const caption_url = getCaptionUrlInnertube(allocator, io, video_id, lang) catch
        try getCaptionUrlWatchPage(allocator, io, video_id, lang);
    defer allocator.free(caption_url);

    const xml = try httpGet(allocator, io, caption_url);
    defer allocator.free(xml);

    return parseTranscriptXml(allocator, xml);
}

fn getCaptionUrlInnertube(allocator: std.mem.Allocator, io: std.Io, video_id: []const u8, lang: []const u8) ![]const u8 {
    const payload = try std.fmt.allocPrint(allocator,
        \\{{"context":{{"client":{{"clientName":"ANDROID","clientVersion":"20.10.38"}}}},"videoId":"{s}"}}
    , .{video_id});
    defer allocator.free(payload);

    const body = try httpPost(allocator, io, "https://www.youtube.com/youtubei/v1/player?prettyPrint=false", payload);
    defer allocator.free(body);

    return extractCaptionUrl(allocator, body, lang);
}

fn getCaptionUrlWatchPage(allocator: std.mem.Allocator, io: std.Io, video_id: []const u8, lang: []const u8) ![]const u8 {
    const url = try std.fmt.allocPrint(allocator, "https://www.youtube.com/watch?v={s}", .{video_id});
    defer allocator.free(url);

    const html = try httpGet(allocator, io, url);
    defer allocator.free(html);

    if (std.mem.indexOf(u8, html, "class=\"g-recaptcha\"") != null) {
        return error.RateLimited;
    }

    const marker = "var ytInitialPlayerResponse = ";
    const start_idx = std.mem.indexOf(u8, html, marker) orelse return error.PlayerResponseNotFound;
    const json_start = start_idx + marker.len;

    var depth: usize = 0;
    var json_end: usize = json_start;
    for (html[json_start..]) |ch| {
        if (ch == '{') depth += 1;
        if (ch == '}') {
            if (depth == 0) return error.MalformedPlayerResponse;
            depth -= 1;
            json_end += 1;
            if (depth == 0) break;
        } else {
            json_end += 1;
        }
    }

    if (depth != 0) return error.MalformedPlayerResponse;

    const player_json = html[json_start..json_end];
    return extractCaptionUrl(allocator, player_json, lang);
}

fn extractCaptionUrl(allocator: std.mem.Allocator, json_body: []const u8, lang: []const u8) ![]const u8 {
    const tracks_marker = "\"captionTracks\":";
    const tracks_start = std.mem.indexOf(u8, json_body, tracks_marker) orelse return error.NoCaptionTracks;
    const search_region = json_body[tracks_start..];

    if (findBaseUrlForLang(allocator, search_region, lang)) |url| return url;
    if (findFirstBaseUrl(allocator, search_region)) |url| return url;

    return error.NoCaptionTracks;
}

fn findBaseUrlForLang(allocator: std.mem.Allocator, region: []const u8, lang: []const u8) ?[]const u8 {
    var pos: usize = 0;
    while (pos < region.len) {
        const base_marker = "\"baseUrl\":\"";
        const idx = std.mem.indexOfPos(u8, region, pos, base_marker) orelse break;
        const url_start = idx + base_marker.len;
        const url_end = std.mem.indexOfPos(u8, region, url_start, "\"") orelse break;
        const url = region[url_start..url_end];

        // Check for languageCode within next 500 chars
        const search_end = @min(url_end + 500, region.len);
        const nearby = region[url_end..search_end];

        const lang_marker = "\"languageCode\":\"";
        if (std.mem.indexOf(u8, nearby, lang_marker)) |lang_idx| {
            const lang_start = lang_idx + lang_marker.len;
            const lang_end = std.mem.indexOfPos(u8, nearby, lang_start, "\"") orelse {
                pos = url_end + 1;
                continue;
            };
            const found_lang = nearby[lang_start..lang_end];
            if (std.mem.eql(u8, found_lang, lang)) {
                return unescapeJsonUrl(allocator, url) catch null;
            }
        }

        pos = url_end + 1;
    }
    return null;
}

fn findFirstBaseUrl(allocator: std.mem.Allocator, region: []const u8) ?[]const u8 {
    const base_marker = "\"baseUrl\":\"";
    const idx = std.mem.indexOf(u8, region, base_marker) orelse return null;
    const url_start = idx + base_marker.len;
    const url_end = std.mem.indexOfPos(u8, region, url_start, "\"") orelse return null;
    const url = region[url_start..url_end];

    if (std.mem.indexOf(u8, url, "youtube.com") == null) return null;

    return unescapeJsonUrl(allocator, url) catch null;
}

fn unescapeJsonUrl(allocator: std.mem.Allocator, escaped: []const u8) ![]const u8 {
    var result = std.ArrayListUnmanaged(u8).empty;
    errdefer result.deinit(allocator);

    var i: usize = 0;
    while (i < escaped.len) {
        if (i + 5 < escaped.len and std.mem.eql(u8, escaped[i .. i + 6], "\\u0026")) {
            try result.append(allocator, '&');
            i += 6;
        } else if (i + 1 < escaped.len and escaped[i] == '\\' and escaped[i + 1] == '/') {
            try result.append(allocator, '/');
            i += 2;
        } else {
            try result.append(allocator, escaped[i]);
            i += 1;
        }
    }

    return try result.toOwnedSlice(allocator);
}

// ── XML parsing ──

fn parseTranscriptXml(allocator: std.mem.Allocator, xml: []const u8) ![]Segment {
    var segments = std.ArrayListUnmanaged(Segment).empty;
    errdefer {
        for (segments.items) |seg| allocator.free(seg.text);
        segments.deinit(allocator);
    }

    if (try parseSrv3(allocator, xml, &segments)) {
        return try segments.toOwnedSlice(allocator);
    }

    try parseClassic(allocator, xml, &segments);
    return try segments.toOwnedSlice(allocator);
}

fn parseSrv3(allocator: std.mem.Allocator, xml: []const u8, segments: *std.ArrayListUnmanaged(Segment)) !bool {
    var found = false;
    var pos: usize = 0;

    while (pos < xml.len) {
        const p_start = std.mem.indexOfPos(u8, xml, pos, "<p ") orelse break;
        const p_tag_end = std.mem.indexOfPos(u8, xml, p_start, ">") orelse break;
        const p_close = std.mem.indexOfPos(u8, xml, p_tag_end, "</p>") orelse break;

        const tag = xml[p_start..p_tag_end];
        const content = xml[p_tag_end + 1 .. p_close];

        const t_val = extractAttr(tag, "t") orelse {
            pos = p_close + 4;
            continue;
        };
        const d_val = extractAttr(tag, "d") orelse {
            pos = p_close + 4;
            continue;
        };

        const offset_ms = std.fmt.parseFloat(f64, t_val) catch {
            pos = p_close + 4;
            continue;
        };
        const dur_ms = std.fmt.parseFloat(f64, d_val) catch {
            pos = p_close + 4;
            continue;
        };

        // Extract text from <s> tags
        var text_buf = std.ArrayListUnmanaged(u8).empty;
        defer text_buf.deinit(allocator);

        var s_pos: usize = 0;
        while (s_pos < content.len) {
            const s_open = std.mem.indexOfPos(u8, content, s_pos, "<s") orelse break;
            const s_tag_end = std.mem.indexOfPos(u8, content, s_open, ">") orelse break;
            const s_close = std.mem.indexOfPos(u8, content, s_tag_end, "</s>") orelse break;

            const s_text = content[s_tag_end + 1 .. s_close];
            if (text_buf.items.len > 0 and s_text.len > 0) {
                try text_buf.append(allocator, ' ');
            }
            try text_buf.appendSlice(allocator, s_text);
            s_pos = s_close + 4;
        }

        if (text_buf.items.len > 0) {
            const decoded = try decodeEntities(allocator, text_buf.items);
            try segments.append(allocator, .{
                .text = decoded,
                .offset = offset_ms / 1000.0,
                .duration = dur_ms / 1000.0,
            });
            found = true;
        }

        pos = p_close + 4;
    }

    return found;
}

fn parseClassic(allocator: std.mem.Allocator, xml: []const u8, segments: *std.ArrayListUnmanaged(Segment)) !void {
    var pos: usize = 0;

    while (pos < xml.len) {
        const text_start = std.mem.indexOfPos(u8, xml, pos, "<text ") orelse break;
        const tag_end = std.mem.indexOfPos(u8, xml, text_start, ">") orelse break;
        const text_close = std.mem.indexOfPos(u8, xml, tag_end, "</text>") orelse break;

        const tag = xml[text_start..tag_end];
        const content = xml[tag_end + 1 .. text_close];

        const start_val = extractAttr(tag, "start") orelse {
            pos = text_close + 7;
            continue;
        };
        const dur_val = extractAttr(tag, "dur") orelse {
            pos = text_close + 7;
            continue;
        };

        const offset = std.fmt.parseFloat(f64, start_val) catch {
            pos = text_close + 7;
            continue;
        };
        const dur = std.fmt.parseFloat(f64, dur_val) catch {
            pos = text_close + 7;
            continue;
        };

        if (content.len > 0) {
            const decoded = try decodeEntities(allocator, content);
            try segments.append(allocator, .{
                .text = decoded,
                .offset = offset,
                .duration = dur,
            });
        }

        pos = text_close + 7;
    }
}

fn extractAttr(tag: []const u8, name: []const u8) ?[]const u8 {
    var search_buf: [64]u8 = undefined;
    const needle = std.fmt.bufPrint(&search_buf, "{s}=\"", .{name}) catch return null;

    const idx = std.mem.indexOf(u8, tag, needle) orelse return null;
    const val_start = idx + needle.len;
    const val_end = std.mem.indexOfPos(u8, tag, val_start, "\"") orelse return null;
    return tag[val_start..val_end];
}

// ── HTML entity decoding ──

fn decodeEntities(allocator: std.mem.Allocator, input: []const u8) ![]const u8 {
    var result = std.ArrayListUnmanaged(u8).empty;
    errdefer result.deinit(allocator);

    var i: usize = 0;
    while (i < input.len) {
        if (input[i] == '&') {
            if (matchEntity(input[i..])) |match| {
                try result.appendSlice(allocator, match.replacement);
                i += match.len;
                continue;
            }
        }
        try result.append(allocator, input[i]);
        i += 1;
    }

    return try result.toOwnedSlice(allocator);
}

const EntityMatch = struct {
    replacement: []const u8,
    len: usize,
};

fn matchEntity(s: []const u8) ?EntityMatch {
    const named = [_]struct { []const u8, []const u8 }{
        .{ "&amp;", "&" },
        .{ "&lt;", "<" },
        .{ "&gt;", ">" },
        .{ "&quot;", "\"" },
        .{ "&#39;", "'" },
        .{ "&apos;", "'" },
        .{ "&#x27;", "'" },
        .{ "&nbsp;", " " },
    };

    for (named) |entry| {
        if (s.len >= entry[0].len and std.mem.startsWith(u8, s, entry[0])) {
            return .{ .replacement = entry[1], .len = entry[0].len };
        }
    }

    return null;
}

// ── Output formatting ──

fn writeText(io: std.Io, segments: []const Segment, max_chars: usize) !void {
    var buf: [4096]u8 = undefined;
    var fw = std.Io.File.stdout().writer(io, &buf);
    const writer = &fw.interface;

    var written: usize = 0;
    for (segments, 0..) |seg, i| {
        if (max_chars > 0 and written >= max_chars) break;

        if (i > 0) {
            try writer.writeAll(" ");
            written += 1;
        }

        if (max_chars > 0 and written + seg.text.len > max_chars) {
            const remaining = max_chars - written;
            try writer.writeAll(seg.text[0..remaining]);
            break;
        }

        try writer.writeAll(seg.text);
        written += seg.text.len;
    }
    try writer.writeAll("\n");
    try writer.flush();
}

fn writeJson(io: std.Io, segments: []const Segment) !void {
    var buf: [512]u8 = undefined;
    var fw = std.Io.File.stdout().writer(io, &buf);
    const writer = &fw.interface;

    try writer.writeAll("[");
    for (segments, 0..) |seg, i| {
        if (i > 0) try writer.writeAll(",");
        try writer.writeAll("\n  {\"text\":\"");
        try writeJsonEscaped(writer, seg.text);
        try writer.print("\",\"offset\":{d:.3},\"duration\":{d:.3}}}", .{ seg.offset, seg.duration });
    }
    try writer.writeAll("\n]\n");
    try writer.flush();
}

fn writeJsonEscaped(writer: *std.Io.Writer, s: []const u8) !void {
    for (s) |ch| {
        switch (ch) {
            '"' => try writer.writeAll("\\\""),
            '\\' => try writer.writeAll("\\\\"),
            '\n' => try writer.writeAll("\\n"),
            '\r' => try writer.writeAll("\\r"),
            '\t' => try writer.writeAll("\\t"),
            else => {
                if (ch < 0x20) {
                    try writer.print("\\u{X:0>4}", .{ch});
                } else {
                    try writer.writeByte(ch);
                }
            },
        }
    }
}

// ── Tests ──

test "decode HTML entities" {
    const alloc = std.testing.allocator;

    const result = try decodeEntities(alloc, "Hello &amp; world &lt;tag&gt; &quot;quoted&quot;");
    defer alloc.free(result);
    try std.testing.expectEqualStrings("Hello & world <tag> \"quoted\"", result);
}

test "extract attribute from tag" {
    const tag = "<text start=\"1.23\" dur=\"4.56\"";
    try std.testing.expectEqualStrings("1.23", extractAttr(tag, "start").?);
    try std.testing.expectEqualStrings("4.56", extractAttr(tag, "dur").?);
    try std.testing.expect(extractAttr(tag, "missing") == null);
}

test "parse classic XML format" {
    const alloc = std.testing.allocator;
    var segments = std.ArrayListUnmanaged(Segment).empty;
    defer {
        for (segments.items) |seg| alloc.free(seg.text);
        segments.deinit(alloc);
    }

    const xml =
        \\<transcript>
        \\<text start="1.23" dur="2.5">Hello world</text>
        \\<text start="3.73" dur="3.0">Second line</text>
        \\</transcript>
    ;

    try parseClassic(alloc, xml, &segments);
    try std.testing.expectEqual(@as(usize, 2), segments.items.len);
    try std.testing.expectEqualStrings("Hello world", segments.items[0].text);
    try std.testing.expectEqualStrings("Second line", segments.items[1].text);
}

test "unescape JSON URL" {
    const alloc = std.testing.allocator;
    const result = try unescapeJsonUrl(alloc, "https:\\/\\/www.youtube.com\\/api\\/timedtext?v=abc\\u0026lang=en");
    defer alloc.free(result);
    try std.testing.expectEqualStrings("https://www.youtube.com/api/timedtext?v=abc&lang=en", result);
}

test "parse srv3 XML format" {
    const alloc = std.testing.allocator;
    var segments = std.ArrayListUnmanaged(Segment).empty;
    defer {
        for (segments.items) |seg| alloc.free(seg.text);
        segments.deinit(alloc);
    }

    const xml =
        \\<timedtext>
        \\<p t="1000" d="2500"><s>Hello </s><s>world</s></p>
        \\<p t="3500" d="3000"><s>Second line</s></p>
        \\</timedtext>
    ;

    const found = try parseSrv3(alloc, xml, &segments);
    try std.testing.expect(found);
    try std.testing.expectEqual(@as(usize, 2), segments.items.len);
    try std.testing.expectEqualStrings("Hello  world", segments.items[0].text);
    try std.testing.expectEqualStrings("Second line", segments.items[1].text);
    // Verify ms → seconds conversion
    try std.testing.expectApproxEqAbs(1.0, segments.items[0].offset, 0.001);
    try std.testing.expectApproxEqAbs(2.5, segments.items[0].duration, 0.001);
}
