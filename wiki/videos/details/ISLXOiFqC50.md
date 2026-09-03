---
type: video
videoId: ISLXOiFqC50
category: development
tags: [rust, cli, slidevoice, pastel sketchbook]
views: 4
date: 2026-06-19T21:17:16Z
summarized: 2026-06-20T01:35:00.000Z
---

# SlideVoice Studio CLI Architecture

> [development](../development.md) · 4 views · Jun 19, 2026
> [Watch on YouTube](https://youtu.be/ISLXOiFqC50)

## Summary

SlideVoice Studio (SVS) CLI is a Rust-based headless video production tool that orchestrates a five-stage automated pipeline — rasterize, notes, narrate, encode, assemble — to convert PDF slides into narrated videos. The tool uses Tokio semaphores for bounded stage concurrency, Gemini REST API for vision and text-to-speech, and FFmpeg for encoding, all managed through a transparent file-based cache for resume capability across CI, cron, and SSH workflows.

## Key Takeaways

- SVS CLI is one of three SVS variants sharing an identical production pipeline: FL SVS (Flutter/Riverpod desktop GUI), Swift SVS (native macOS), and SVS CLI (headless Rust automation).
- The five-stage pipeline processes content segment-by-segment: PDF rasterization via pdftoppm, note extraction via Gemini Vision, narration via Gemini TTS, segment encoding via FFmpeg, and final assembly via FFmpeg concatenation.
- Bounded stage concurrency with Tokio semaphores prevents Gemini rate-limit contention by processing all items within a stage before advancing — each stage has its own semaphore (Gemini: 4 concurrent, FFmpeg: half CPU cores).
- The file-based cache directory (`project.svs/`) is inspectable, resumable, schemaless, and portable — intermediate assets live as plain files that can be opened with standard tools.
- Rust's single static binary with zero GC pauses and Tokio's async concurrency provides predictable cross-platform execution on Linux, macOS, and Windows.

## Topics Covered

`rust cli architecture` · `tokio semaphore concurrency` · `gemini vision tts` · `ffmpeg video encoding` · `pdftoppm rasterization` · `bounded stage pipeline` · `file-based caching` · `cross-platform binary`

## Tags

[rust](../tags/rust.md) · [cli](../tags/cli.md) · [slidevoice](../tags/slidevoice.md) · [pastel sketchbook](../tags/pastel-sketchbook.md)

## Related Videos

- [A Desktop-First Export Strategy for SlideVoice Studio](https://youtu.be/78hLFt3_Gh4) — Development · 32 views · May 29, 2026 · [Details](78hLFt3_Gh4.md) (shared: `architecture` · `gemini` · `tts`)
- [SlideVoice Studio Swift](https://youtu.be/r1rhrISQXeA) — Development · 40 views · Jun 4, 2026 · [Details](r1rhrISQXeA.md) (shared: `gemini` · `tts` · `ffmpeg`)
- [Tokio: The Asynchronous Runtime for Rust](https://youtu.be/0Sed1oggMKY) — Development · 90 views · Feb 8, 2026 · [Details](0Sed1oggMKY.md) (shared: `rust` · `architecture` · `tokio`)
- [Architecting with Tonic](https://youtu.be/90hw9qwXbbw) — Development · 159 views · May 2, 2026 · [Details](90hw9qwXbbw.md) (shared: `rust` · `architecture` · `tokio`)
- [The Flight Recorder for Tokio](https://youtu.be/lY5TU8qHduM) — Development · 28 views · Mar 20, 2026 · [Details](lY5TU8qHduM.md) (shared: `rust` · `tokio` · `concurrency`)

---

*Auto-generated on Jun 20, 2026. Back to [development](../development.md) · [index](../index.md).*
