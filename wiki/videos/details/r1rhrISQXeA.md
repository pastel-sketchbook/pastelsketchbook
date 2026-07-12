---
type: video
videoId: r1rhrISQXeA
category: development
tags: [swift, slidevoice, pastel sketchbook]
views: 10
date: 2026-06-04T23:00:24Z
summarized: 2026-06-06T15:00:00.000Z
---

# SlideVoice Studio Swift

> [development](../development.md) · 10 views · Jun 4, 2026
> [Watch on YouTube](https://youtu.be/r1rhrISQXeA)

## Summary

SlideVoice Studio Swift is a native macOS/iOS application built with Swift and SwiftUI that transforms slide decks into fully narrated presentation videos. The five-stage pipeline — import, script generation, audio synthesis, preview, and export — leverages the Gemini API for both narration script generation and text-to-speech, with FFmpeg handling final video assembly and encoding.

## Key Takeaways

- The platform uses a five-stage workflow: PDF/image rasterization in import, Gemini-powered narration script generation, Gemini text-to-speech audio synthesis, interactive preview with voice and transition editing, and FFmpeg-backed MP4 export.
- Native Swift and SwiftUI implementation closely tracks the behavior of the original Flutter reference app while maximizing Apple ecosystem integration and performance.
- All AI capabilities (script generation and voice synthesis) are handled through the Gemini API, eliminating the need for multiple third-party services.
- Users can fine-tune narration notes, select specific narrator voices, and adjust presentation transitions during the preview phase before final export.
- The architecture is designed for seamless integration across all Apple platforms, leveraging native frameworks for optimal performance and user experience.

## Topics Covered

`swift slide-to-video` · `gemini api narration` · `text-to-speech synthesis` · `ffmpeg video export` · `native apple development` · `presentation automation`


## Tags

[swift](../tags/swift.md) · [slidevoice](../tags/slidevoice.md) · [pastel sketchbook](../tags/pastel sketchbook.md)

## Related Videos

- [A Desktop-First Export Strategy for SlideVoice Studio](https://youtu.be/78hLFt3_Gh4) — Development · 32 views · May 29, 2026 · [Details](78hLFt3_Gh4.md) (shared: `gemini` · `api` · `narration`)
- [SlideVoice Studio Desktop Shell Architecture](https://youtu.be/ytA6gw6Tgaw) — Development · 31 views · May 17, 2026 · [Details](ytA6gw6Tgaw.md) (shared: `gemini api narration` · `gemini` · `api`)
- [SlideVoice Studio CLI Architecture](https://youtu.be/ISLXOiFqC50) — Development · 13 views · Jun 19, 2026 · [Details](ISLXOiFqC50.md) (shared: `gemini` · `tts` · `ffmpeg`)
- [Velox: Bring Tauri to Swift](https://youtu.be/Ul0ixBpd5iM) — Development · 48 views · Jan 27, 2026 · [Details](Ul0ixBpd5iM.md) (shared: `swift` · `native` · `development`)
- [svs-cli: 10 Critical Things](https://youtu.be/S3Vc_R-HezY) — Development · 15 views · May 24, 2026 · [Details](S3Vc_R-HezY.md) (shared: `gemini` · `api` · `ffmpeg`)

---
*Auto-generated on Jun 6, 2026. Back to [development](../development.md) · [index](../index.md).*