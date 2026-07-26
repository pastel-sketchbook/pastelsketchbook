---
type: video
videoId: DazzkNtnzec
category: development
tags: [go, composition, gof]
views: 109
date: 2026-02-24T23:48:12Z
summarized: 2026-04-14T10:20:12.934Z
---

# Design Patterns in Go

> [development](../development.md) · 109 views · Feb 24, 2026
> [Watch on YouTube](https://youtu.be/DazzkNtnzec)

## Summary

This guide explores the transition from traditional object-oriented inheritance to Go’s composition-centric architecture. It demonstrates how to implement classic Gang of Four design patterns—such as Strategy, Observer, and Adapter—using Go-specific features like implicit interfaces and struct embedding to create decoupled, testable systems.

## Key Takeaways

- Go replaces deep class hierarchies ('is-a' relationships) with composition ('has-a' relationships), utilizing struct embedding and method promotion to build flexible architectures.
- Interfaces in Go are satisfied implicitly through duck typing, which decouples components and allows diverse types to satisfy a common interface without an explicit 'implements' keyword.
- The Interface Segregation Principle is a core tenet in Go, favoring small, single-purpose interfaces that can be composed into larger ones, similar to the io.Reader and io.Writer implementations in the standard library.
- The Strategy and Observer patterns are reimagined in Go to eliminate complex conditional logic and enable event-driven architectures by treating algorithms and subscribers as interchangeable interfaces.
- Structural patterns like the Adapter and Decorator are used to wrap legacy systems or add dynamic behaviors like logging and caching without modifying the underlying service logic.

## Topics Covered

`composition over inheritance` · `struct embedding` · `implicit interfaces` · `duck typing` · `interface segregation principle` · `dependency injection` · `method promotion` · `functional decorators`

## Tags

[go](../tags/go.md) · [composition](../tags/composition.md) · [gof](../tags/gof.md)

## Related Videos

- [Composition by Design](https://youtu.be/ARWkoc3E8uE) — Development · 33 views · Feb 23, 2026 · [Details](ARWkoc3E8uE.md) (shared: `composition over inheritance` · `composition` · `inheritance`)
- [The Architecture of Systemic Decoupling](https://youtu.be/R3n8UxyD7mc) — Development · 55 views · Apr 27, 2026 · [Details](R3n8UxyD7mc.md) (shared: `principle` · `dependency injection` · `dependency`)
- [Backend Patterns in Rust](https://youtu.be/Th5MMOFQbh8) — Development · 48 views · Feb 22, 2026 · [Details](Th5MMOFQbh8.md) (shared: `dependency injection` · `dependency` · `injection`)
- [Architecting Scalable Rust Backends](https://youtu.be/SpNfrWmI8iE) — Development · 78 views · Feb 22, 2026 · [Details](SpNfrWmI8iE.md) (shared: `dependency injection` · `dependency` · `injection`)
- [The Repository Pattern](https://youtu.be/cWozmWrqnxs) — Development · 812 views · Feb 13, 2026 · [Details](cWozmWrqnxs.md) (shared: `dependency injection` · `dependency` · `injection`)

---
*Auto-generated on Apr 14, 2026. Back to [development](../development.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Architect's Sketchbook](zmd://wiki/books/architects-sketchbook.md) — Chapter 3** (confidence: 22%)_
