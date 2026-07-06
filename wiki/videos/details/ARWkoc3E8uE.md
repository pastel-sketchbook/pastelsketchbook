---
type: video
videoId: ARWkoc3E8uE
category: development
tags: []
views: 31
date: 2026-02-23T23:33:01Z
summarized: 2026-04-16T22:00:00.000Z
---

# Composition by Design

> [development](../development.md) · 31 views · Feb 23, 2026
> [Watch on YouTube](https://youtu.be/ARWkoc3E8uE)

## Summary

This presentation examines how Go and Rust enforce the Gang of Four principle of favoring object composition over class inheritance through their language design. It traces the evolution from deep, fragile inheritance hierarchies to modular component-based architectures, showing how both languages codify composition as a hard rule rather than optional guidance.

## Key Takeaways

- Inheritance creates fragile base class problems where a single parent class change ripples through and breaks numerous subclasses.
- Go and Rust have no class inheritance at all, enforcing composition through interfaces (Go) and traits (Rust) as the only way to share behavior.
- Composition using "has-a" relationships produces code that is significantly more flexible, testable, and reusable than "is-a" inheritance hierarchies.
- The 1994 Gang of Four Design Patterns book advocated composition, but it took decades and new language designs to make it the default paradigm.

## Topics Covered

`composition over inheritance` · `go interfaces` · `rust traits` · `gang of four` · `object-oriented design` · `modular architecture`

## Related Videos

- [Architecting with Tonic](https://youtu.be/90hw9qwXbbw) — Development · 155 views · May 2, 2026 · [Details](90hw9qwXbbw.md) (shared: `rust` · `traits` · `architecture`)
- [Design Patterns in Go](https://youtu.be/DazzkNtnzec) — Development · 118 views · Feb 24, 2026 · [Details](DazzkNtnzec.md) (shared: `composition over inheritance` · `composition` · `inheritance`)
- [melos-rs: Architectural Anatomy](https://youtu.be/WahgsFhj3W0) — Development · 18 views · Mar 1, 2026 · [Details](WahgsFhj3W0.md) (shared: `rust` · `gang` · `four`)
- [Design for Deletion](https://youtu.be/yAeM2vpPWeM) — Development · 161 views · Apr 25, 2026 · [Details](yAeM2vpPWeM.md) (shared: `composition` · `design` · `architecture`)
- [Tokio: The Asynchronous Runtime for Rust](https://youtu.be/0Sed1oggMKY) — Development · 89 views · Feb 8, 2026 · [Details](0Sed1oggMKY.md) (shared: `rust` · `architecture`)

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Architect's Sketchbook](zmd://wiki/books/architects-sketchbook.md) — Chapter 3** (confidence: 22%)_
