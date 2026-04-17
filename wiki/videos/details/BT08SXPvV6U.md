---
type: video
videoId: BT08SXPvV6U
category: development
tags: []
views: 59
date: 2026-04-04T14:34:30Z
summarized: 2026-04-16T22:00:00.000Z
---

# Building vibe-rust

> [development](../development.md) · 59 views · Apr 4, 2026
> [Watch on YouTube](https://youtu.be/BT08SXPvV6U)

## Summary

This video covers the engineering of vibe-rust, a zero-Python Rust port of Microsoft's Vibe Voice AI suite, leveraging Rust, ONNX Runtime, and Rayon for significant performance gains over the original Python implementation. The Vibe Voice frontier includes three models: ASR (7B parameters, 60-min transcription, 50+ languages), TTS (1.5B parameters, 90-min audio, multi-speaker), and Realtime (0.5B parameters, 200ms first-chunk latency for streaming).

## Key Takeaways

- Vibe Voice ASR is a 7B parameter model supporting 60-minute transcription in 50+ languages with built-in hot word detection.
- The Rust port eliminates Python's GIL bottleneck, startup overhead, and memory inefficiency by using ONNX Runtime for inference and Rayon for parallelism.
- Vibe Voice Realtime achieves ~200ms first-chunk latency for streaming text-to-speech, critical for interactive applications.
- All three Vibe Voice models are open-source under MIT license and available on HuggingFace.

## Topics Covered

`rust` · `onnx runtime` · `voice ai` · `speech-to-text` · `text-to-speech` · `rayon parallelism` · `python to rust port`

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
