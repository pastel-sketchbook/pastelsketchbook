---
type: video
videoId: aQpGQClZSvc
category: development
tags: [curiosity, virtual, voice]
views: 10
date: 2026-05-27T22:01:41Z
summarized: 2026-05-28T23:48:00.000Z
---

# The Architecture of a Virtual Voice

> [development](../development.md) · 10 views · May 27, 2026
> [Watch on YouTube](https://youtu.be/aQpGQClZSvc)

## Summary

This presentation formally decomposes the Hatsune Miku vocal synthesis pipeline into a five-stage signal chain: symbolic parsing of lyrics into phonemes, acoustic generation via unit selection or neural timbre models, signal shaping with pitch curves and expression filters, audio rendering through vocoders such as STRAIGHT or WaveNet, and physical realization including post-processing and holographic projection. It expresses each stage with explicit mathematical operators, transfer functions, and complexity bounds.

## Key Takeaways

- Vocal synthesis is best modeled as a layered pipeline that maps symbolic linguistic input to a physical audio waveform through well-defined mathematical transformations.
- The morphological analyzer converts a lyric string into a phoneme sequence in O(N) using a kana mapping followed by context rewrite rules such as SI → SHI.
- Acoustic generation can use concatenative unit selection of pre-recorded segments or neural timbre models that synthesize sound from learned distributions.
- Signal shaping applies pitch curves and expression filters to inject melody, intonation, and emotional nuance into an otherwise neutral acoustic stream.
- Modern vocoders like STRAIGHT and WaveNet drive the final high-fidelity rendering, and the chain can extend into 3D holographic projection for live performance.

## Topics Covered

`vocal synthesis pipeline` · `phoneme parsing` · `unit selection synthesis` · `neural timbre modeling` · `pitch and expression shaping` · `wavenet vocoder` · `straight vocoder` · `holographic performance rendering`

## Tags

[curiosity](../tags/curiosity.md) · [virtual](../tags/virtual.md) · [voice](../tags/voice.md)

## Related Videos

- [The Architecture of Space and Time](https://youtu.be/3ONqqMoLy0s) — Development · 27 views · May 26, 2026 · [Details](3ONqqMoLy0s.md) (shared: `synthesis` · `pipeline` · `neural`)
- [Neural TTS in Pastel-HN](https://youtu.be/d_0swhS1LyQ) — Development · 46 views · Feb 1, 2026 · [Details](d_0swhS1LyQ.md) (shared: `synthesis` · `neural`)
- [The Architecture of Sequelize](https://youtu.be/ZUINk3dp9eA) — Development · 23 views · May 8, 2026 · [Details](ZUINk3dp9eA.md) (shared: `pipeline` · `expression`)
- [The Burn Book](https://youtu.be/B7MMdnv3y1M) — Development · 29 views · May 21, 2026 · [Details](B7MMdnv3y1M.md) (shared: `pipeline` · `performance`)
- [A Compiler, Not a Renderer](https://youtu.be/E8f87EV4k3A) — Development · 156 views · Apr 17, 2026 · [Details](E8f87EV4k3A.md) (shared: `pipeline`)

---
*Auto-generated on May 28, 2026. Back to [development](../development.md) · [index](../index.md).*
