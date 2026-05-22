---
type: video
videoId: d_0swhS1LyQ
category: development
tags: []
views: 45
date: 2026-02-01T12:24:48Z
summarized: 2026-04-16T22:00:00.000Z
---

# Neural TTS in Pastel-HN

> [development](../development.md) · 45 views · Feb 1, 2026
> [Watch on YouTube](https://youtu.be/d_0swhS1LyQ)

## Summary

This video details the architecture of a neural text-to-speech system built into the Pastel-HN desktop application using Rust and Tauri. The system integrates the Piper neural engine for voice synthesis, ONNX Runtime for cross-platform inference, and Rodio for low-level audio playback, achieving fully offline high-fidelity speech with streaming playback that starts under 2 seconds. The implementation was completed on January 30, 2026, with strict requirements around privacy, cross-platform support (macOS/Windows/Linux), and zero cloud dependencies.

## Key Takeaways

- The TTS stack combines Piper neural engine, ONNX Runtime, and Rodio audio to achieve high-fidelity offline speech synthesis entirely on-device with no cloud dependency.
- Strict technical requirements demanded neural voices (not robotic), fully offline operation, cross-platform behavior across macOS/Windows/Linux, and sub-2-second audio start latency.
- Streaming playback begins immediately while voice generation continues in the background, enabling responsive user experience on longer articles.
- The offline-first architecture eliminates per-character cloud costs and prevents privacy leaks from sending article content to external services.

## Topics Covered

`piper neural tts` · `onnx runtime` · `rust audio` · `offline speech synthesis` · `tauri desktop app` · `streaming audio playback`

## Related Videos

- [Building vibe-rust](https://youtu.be/BT08SXPvV6U) — Development · 62 views · Apr 4, 2026 · [Details](BT08SXPvV6U.md) (shared: `tts` · `onnx runtime` · `onnx`)
- [Velox: Bring Tauri to Swift](https://youtu.be/Ul0ixBpd5iM) — Development · 47 views · Jan 27, 2026 · [Details](Ul0ixBpd5iM.md) (shared: `rust` · `tauri` · `desktop`)
- [Tokio: The Asynchronous Runtime for Rust](https://youtu.be/0Sed1oggMKY) — Development · 88 views · Feb 8, 2026 · [Details](0Sed1oggMKY.md) (shared: `runtime` · `rust`)
- [Architecting with Tonic](https://youtu.be/90hw9qwXbbw) — Development · 149 views · May 2, 2026 · [Details](90hw9qwXbbw.md) (shared: `runtime` · `rust`)
- [The Flight Recorder for Tokio](https://youtu.be/lY5TU8qHduM) — Development · 27 views · Mar 20, 2026 · [Details](lY5TU8qHduM.md) (shared: `runtime` · `rust`)

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
