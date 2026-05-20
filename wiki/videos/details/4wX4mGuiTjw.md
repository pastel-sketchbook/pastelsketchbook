---
type: video
videoId: 4wX4mGuiTjw
category: development
tags: [migrogpt-zig, zig, gunghap, saju]
views: 8
date: 2026-03-08T08:48:54Z
summarized: 2026-04-06T21:56:49.082Z
---

# Teaching an Ancient Calendar to a Microscopic AI

> [development](../development.md) · 8 views · Mar 8, 2026
> [Watch on YouTube](https://youtu.be/4wX4mGuiTjw)

## Summary

This study demonstrates the implementation of a 15.6k parameter, one-layer GPT model written in pure Zig to master the deterministic constraints of the Saju calendrical system. The project showcases how a minimalist neural architecture can learn complex, rule-based semantic systems like the Korean four pillars through optimized tokenization and multi-task learning.

## Key Takeaways

- Transitioning from byte-level UTF-8 tokenization to code point level processing reduced the computation graph by 50% and sequence length from 24 to 8 tokens.
- The model utilizes a rejection sampling pipeline to achieve a 100% structural validity rate, compensating for the 15% failure rate in complex cross-pillar Five Tiger rule violations.
- Implementing prefix mode enables conditional generation by warming up the key-value (KV) cache with forced tokens before switching to auto-regressive sampling.
- Augmenting training data with elemental annotations resulted in a 2x reduction in per-token loss (1.76 to 0.88) due to a multitask learning effect without degrading structural validity.
- While the single-layer architecture excels at classification tasks, it fails at complex joint-probability generation, such as dual-person compatibility pillars, due to limited computational capacity.

## Topics Covered

`zig` · `micro-gpt` · `tokenization optimization` · `rejection sampling` · `kv cache` · `multitask learning` · `deterministic rule-based systems` · `saju calendrical framework`

## Tags

[migrogpt-zig](../tags/migrogpt-zig.md) · [zig](../tags/zig.md) · [gunghap](../tags/gunghap.md) · [saju](../tags/saju.md)

## Related Videos

- [Zig  Pragmatic Successor to C](https://youtu.be/yOOQNnaOLeM) — Development · 26 views · Jan 9, 2026 · [Details](yOOQNnaOLeM.md) (shared: `zig` · `learning` · `systems`)
- [Memory Layout in Zig](https://youtu.be/h31-NtagNoU) — Development · 61 views · Jan 29, 2026 · [Details](h31-NtagNoU.md) (shared: `zig` · `optimization` · `cache`)
- [Practical Data Oriented Design in Zig](https://youtu.be/o9yaniXkM-0) — Development · 69 views · Jan 29, 2026 · [Details](o9yaniXkM-0.md) (shared: `zig` · `optimization` · `cache`)
- [Engineering the Overnight Researcher in Zig](https://youtu.be/7yqkfHo8Mwk) — Development · 74 views · Mar 9, 2026 · [Details](7yqkfHo8Mwk.md) (shared: `zig` · `optimization`)
- [Let's check about Zig](https://youtu.be/olsB3bJxA2A) — Development · 350 views · Dec 28, 2025 · [Details](olsB3bJxA2A.md) (shared: `zig` · `systems`)

---
*Auto-generated on Apr 6, 2026. Back to [development](../development.md) · [index](../index.md).*