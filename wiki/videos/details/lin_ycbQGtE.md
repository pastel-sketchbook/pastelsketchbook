---
type: video
videoId: lin_ycbQGtE
category: development
tags: []
views: 26
date: 2026-03-20T12:06:34Z
summarized: 2026-04-16T22:00:00.000Z
---

# Beat - Anatomy of a Real-Time Visualizer

> [development](../development.md) · 26 views · Mar 20, 2026
> [Watch on YouTube](https://youtu.be/lin_ycbQGtE)

## Summary

This video dissects the architecture of a real-time audio visualizer built with the Bevy game engine and Rust, which renders fractal Julia set layers driven by adaptive audio onset detection. The system uses a three-stage pipeline (source, engine, output) with a three-tier audio architecture: live CPAL loopback capture, precomputed RMS energy envelopes decoded via Rodio, and a fallback sine-wave heartbeat. Eight transparent fractal layers are rendered via WGSL fragment shaders, driven by a normalized 0-1 beat-intensity signal.

## Key Takeaways

- The visualizer uses a three-tier audio sourcing hierarchy: Tier 1 is live system audio via CPAL loopback, Tier 2 is precomputed RMS energy from .ogg files decoded with Rodio, and Tier 3 is a fallback sine-wave heartbeat.
- Eight transparent Julia set fractal layers are rendered using WGSL fragment shaders in the Bevy engine, each responding to the normalized beat-intensity signal.
- The architecture cleanly separates audio capture, beat detection, and visual rendering into a pipeline that maintains real-time performance through Rust's zero-cost abstractions.
- Live audio capture can be toggled at runtime with the C key, with the system gracefully falling back through lower tiers when higher-priority sources are unavailable.

## Topics Covered

`bevy game engine` · `rust` · `julia set fractals` · `wgsl shaders` · `cpal audio` · `real-time audio visualization` · `onset detection`

## Related Videos

- [Architecting a Modern Robocode Engine](https://youtu.be/d3JxtD__-L0) — Development · 72 views · May 29, 2026 · [Details](d3JxtD__-L0.md) (shared: `bevy` · `game` · `engine`)
- [Bevy-Demo](https://youtu.be/_zJ3_d1CODg) — Development · 163 views · Mar 18, 2026 · [Details](_zJ3_d1CODg.md) (shared: `bevy` · `engine` · `rust`)
- [Neural TTS in Pastel-HN](https://youtu.be/d_0swhS1LyQ) — Development · 46 views · Feb 1, 2026 · [Details](d_0swhS1LyQ.md) (shared: `rust` · `audio`)
- [The Prisma Ecosystem Architecture](https://youtu.be/LnJbrb0EUaE) — Development · 17 views · May 8, 2026 · [Details](LnJbrb0EUaE.md) (shared: `engine` · `rust`)
- [Diagnostic Guide to Computer Vision Feature Detection](https://youtu.be/AvysIjFrTEw) — Development · 35 views · May 11, 2026 · [Details](AvysIjFrTEw.md) (shared: `real-time` · `detection`)

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Architect's Sketchbook](zmd://wiki/books/architects-sketchbook.md) — Chapter 3** (confidence: 22%)_
