---
type: video
videoId: 78hLFt3_Gh4
category: development
tags: [flutter, ffmpeg, slidevoice, "pastel sketchbook"]
views: 18
date: 2026-05-29T06:43:48Z
summarized: 2026-05-30T12:15:00.000Z
---

# A Desktop-First Export Strategy for SlideVoice Studio

> [development](../development.md) · 18 views · May 29, 2026
> [Watch on YouTube](https://youtu.be/78hLFt3_Gh4)

## Summary

SlideVoice Studio is pivoting its export pipeline from browser media APIs (canvas capture, Web Audio, MediaRecorder) to a desktop-first Flutter application that hands video encoding to native FFmpeg. The pivot keeps the Flutter codebase portable across web and mobile while concentrating CPU-heavy work on the desktop target, where bounded parallelism over timeline segments unlocks throughput that the browser pipeline cannot match.

## Key Takeaways

- Browser media APIs are the throughput bottleneck for the existing Tauri/React reference engine: real-time encoding, browser-only codecs, and output variability driven by browser state make them unsuitable for large or complex decks.
- The Flutter desktop engine bypasses the browser entirely, processing local files directly and routing intensive encoding to FFmpeg for bounded parallelism, absolute codec control, and predictable output.
- Bounded parallelism splits the video timeline into logical segments dispatched to concurrent CPU-thread nodes, then stitches them back together in an ordered assembly + transition compositing stage before delivering the final video.
- A clean layered Flutter architecture — UI → state (Riverpod providers/notifiers) → repositories → services (Gemini, PDF, storage, audio, export) → immutable models — keeps the portable codebase scalable while concentrating native-only concerns inside the services layer.
- Direct YouTube publishing is the next product milestone but is intentionally architected to upload a locally verified output, preventing network publishing from becoming a fragile dependency inside the rendering path.

## Topics Covered

`flutter desktop export` · `ffmpeg encoding pipeline` · `bounded parallelism segments` · `browser media api bottleneck` · `riverpod state architecture` · `slidevoice studio` · `gemini tts narration` · `desktop-first portable codebase`

## Tags

[flutter](../tags/flutter.md) · [ffmpeg](../tags/ffmpeg.md) · [slidevoice](../tags/slidevoice.md) · [pastel-sketchbook](../tags/pastel-sketchbook.md)

## Related Videos

- [SlideVoice Studio Desktop Shell Architecture](https://youtu.be/ytA6gw6Tgaw) — Development · 31 views · May 17, 2026 · [Details](ytA6gw6Tgaw.md) (shared: `desktop` · `export` · `media`)
- [The Blueprint of Reactivity](https://youtu.be/Gy-ky1pAF0U) — Development · 27 views · May 16, 2026 · [Details](Gy-ky1pAF0U.md) (shared: `flutter` · `riverpod` · `state`)
- [Flutter App Template](https://youtu.be/LWc3AAHoxnU) — Development · 37 views · Jan 18, 2026 · [Details](LWc3AAHoxnU.md) (shared: `flutter` · `state` · `architecture`)
- [svs-cli: 10 Critical Things](https://youtu.be/S3Vc_R-HezY) — Development · 15 views · May 24, 2026 · [Details](S3Vc_R-HezY.md) (shared: `ffmpeg` · `pipeline` · `api`)
- [Building Dynamic Al Interfaces with GenUl](https://youtu.be/CqBZBJTAo3I) — Development · 88 views · May 31, 2026 · [Details](CqBZBJTAo3I.md) (shared: `flutter` · `state` · `architecture`)

---
*Auto-generated on May 30, 2026. Back to [development](../development.md) · [index](../index.md).*
