---
type: video
videoId: o9yaniXkM-0
category: development
tags: []
views: 47
date: 2026-01-30T01:28:52Z
summarized: 2026-04-16T22:00:00.000Z
---

# Practical Data Oriented Design in Zig

> [development](../development.md) · 47 views · Jan 30, 2026
> [Watch on YouTube](https://youtu.be/o9yaniXkM-0)

## Summary

Based on Andrew Kelly's work at the Zig Software Foundation, this video explains data-oriented design as a practical approach to breaking through the "plateau of good enough code" that most developers hit between years 2-15 of their career. The core thesis is that the primary performance bottleneck in modern software is not CPU computation but memory access patterns—organizing data to align with hardware cache architecture can deliver orders-of-magnitude improvements. The presentation uses Zig to demonstrate how shifting focus from abstract objects to physical memory layout transforms application performance.

## Key Takeaways

- Most developers plateau between years 2-15 where they would write the same code today as a year ago; data-oriented design is the key to breaking through this stagnation.
- The primary performance bottleneck in modern software is memory access latency, not CPU computation—cache misses dominate execution time.
- Data-oriented design replaces object-oriented "array of structs" with "struct of arrays" layouts that maximize cache line utilization and minimize memory fetches.
- Zig's explicit control over memory layout makes it an ideal language for implementing data-oriented design patterns without hidden allocations or abstractions.

## Topics Covered

`data-oriented design` · `zig` · `cache optimization` · `memory layout` · `struct of arrays` · `andrew kelly` · `performance engineering`

## Related Videos

- [Memory Layout in Zig](https://youtu.be/h31-NtagNoU) — Development · 61 views · Jan 29, 2026 · [Details](h31-NtagNoU.md) (shared: `data-oriented design` · `data-oriented` · `design`)
- [Hardening a Prototype](https://youtu.be/DCGTYftRGWE) — Development · 23 views · Jan 25, 2026 · [Details](DCGTYftRGWE.md) (shared: `data-oriented design` · `data-oriented` · `design`)
- [Cloth Simulation: A Performance Study](https://youtu.be/US7oyxbcJCc) — Development · 12 views · Jan 25, 2026 · [Details](US7oyxbcJCc.md) (shared: `data-oriented design` · `data-oriented` · `design`)
- [Cloth Simulation ](https://youtu.be/3Fpey_L_XRU) — Development · 13 views · Jan 25, 2026 · [Details](3Fpey_L_XRU.md) (shared: `zig` · `struct of arrays` · `struct`)
- [The Memory Management Trilemma](https://youtu.be/axvxGj3yOgA) — Development · 34 views · Jan 6, 2026 · [Details](axvxGj3yOgA.md) (shared: `design` · `zig` · `memory`)

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
