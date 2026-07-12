---
type: video
videoId: RvgI3oEThcA
category: development
tags: []
views: 10
date: 2026-07-13T23:00:12Z
summarized: 2026-07-14T22:36:00.000Z
---

# Flattening the Hierarchy

> [development](../development.md) · 10 views · Jul 13, 2026
> [Watch on YouTube](https://youtu.be/RvgI3oEThcA)

## Summary

This talk argues that deep object-oriented inheritance hierarchies create fragile, hard-to-maintain systems, and shows how to scale OO design by flattening the tree with composition and data-driven types. It covers the architecture of inertia bloat (data-only subclass layers), the cognitive yo-yo problem of tracing 20-level chains, and a two-step collapse: extract variable-only classes into data profiles, then isolate capabilities as pluggable strategy components.

## Key Takeaways

- Deep inheritance built only to model slight data variations produces "inertia bloat": intermediate data-only layers that add no behavior and leave leaf classes as fragile base classes.
- Human working memory holds roughly 7±2 chunks; tracing bugs through 20 inheritance layers forces constant context reloads — the yo-yo problem — so well-architected systems rarely exceed two or three levels of inheritance.
- Prefer breadth over depth: grow outward with composition and data profiles (properties for data, strategies for behavior) instead of vertical subclass stacks.
- Collapse a deep hierarchy in two steps: first extract classes that only set variables into flat data profiles; then isolate capabilities into pluggable components rather than rewriting the entire tree overnight.
- Composition with data-driven types loosens coupling, improves refactorability, and scales OO systems horizontally instead of forcing every property change into a new subclass.

## Topics Covered

`flatten inheritance hierarchy` · `composition over inheritance` · `data-driven types` · `inertia bloat subclasses` · `yo-yo problem cognitive load` · `data profiles and strategies` · `pluggable capability components` · `breadth over depth architecture`

## Related Videos

- [Composition by Design](https://youtu.be/ARWkoc3E8uE) — Development · 33 views · Feb 23, 2026 · [Details](ARWkoc3E8uE.md) (shared: `inheritance` · `composition over inheritance` · `composition`)
- [Data Centric Flutter Apps](https://youtu.be/4_mBGmXA244) — Development · 32 views · Jan 9, 2026 · [Details](4_mBGmXA244.md) (shared: `data-driven` · `data` · `architecture`)
- [Design Patterns in Go](https://youtu.be/DazzkNtnzec) — Development · 118 views · Feb 24, 2026 · [Details](DazzkNtnzec.md) (shared: `inheritance` · `composition over inheritance` · `composition`)
- [The Rules and The Rebellion](https://youtu.be/dDtVuJXVYJk) — Development · 35 views · Apr 6, 2026 · [Details](dDtVuJXVYJk.md) (shared: `data` · `architecture`)
- [Bulletproof Frontend Architecture](https://youtu.be/5Vloo08zQ7o) — Development · 32 views · Feb 16, 2026 · [Details](5Vloo08zQ7o.md) (shared: `data` · `architecture`)

---
*Auto-generated on Jul 14, 2026. Back to [development](../development.md) · [index](../index.md).*
