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

- [Design Patterns in Go](https://youtu.be/DazzkNtnzec) — Development · 112 views · Feb 24, 2026 · [Details](DazzkNtnzec.md) (shared: `composition over inheritance` · `composition` · `inheritance`)
- [melos-rs: Architectural Anatomy](https://youtu.be/WahgsFhj3W0) — Development · 18 views · Mar 1, 2026 · [Details](WahgsFhj3W0.md) (shared: `rust` · `gang` · `four`)
- [Tokio: The Asynchronous Runtime for Rust](https://youtu.be/0Sed1oggMKY) — Development · 86 views · Feb 8, 2026 · [Details](0Sed1oggMKY.md) (shared: `rust` · `architecture`)
- [Pathways Over Tools](https://youtu.be/84M1mVL0cjo) — Development · 19 views · Mar 9, 2026 · [Details](84M1mVL0cjo.md) (shared: `design` · `architecture`)
- [NotebookLM's Intelligence Flow](https://youtu.be/IF5sNQH-01c) — Development · 46 views · Dec 28, 2025 · [Details](IF5sNQH-01c.md) (shared: `design` · `architecture`)

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
