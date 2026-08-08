---
type: video
videoId: 3Fpey_L_XRU
category: development
tags: []
views: 13
date: 2026-01-25T22:13:48Z
summarized: 2026-04-16T22:00:00.000Z
---

# Cloth Simulation

> [development](../development.md) · 13 views · Jan 25, 2026
> [Watch on YouTube](https://youtu.be/3Fpey_L_XRU)

## Summary

This video presents a cloth simulation project exploring the interoperability of Zig, WebAssembly, and Swift as a macOS desktop overlay. The physics core is authored in Zig using a struct-of-arrays (SOA) memory layout for cache efficiency, compiled to WebAssembly, and executed by a native Swift host application, achieving over 17,000 constraint evaluations per frame.

## Key Takeaways

- The physics engine is written in Zig using struct-of-arrays (SOA) memory layout and Verlet integration for optimal cache efficiency and high-performance simulation.
- The Zig core compiles to WebAssembly and is bridged to a native Swift host application, demonstrating cross-language interoperability.
- The system handles over 17,000 constraint evaluations per frame by decoupling heavy computation from the UI layer.
- The WebAssembly bridge manages shared memory and exported functions while ensuring robust ABI validation between Zig and Swift.

## Topics Covered

`zig` · `webassembly` · `swift interop` · `cloth simulation` · `struct of arrays` · `verlet integration` · `macos development`

## Related Videos

- [Hardening a Prototype](https://youtu.be/DCGTYftRGWE) — Development · 24 views · Jan 25, 2026 · [Details](DCGTYftRGWE.md) (shared: `cloth simulation` · `cloth` · `simulation`)
- [Swift Firefly](https://youtu.be/P58Zt8A_1Mc) — Development · 113 views · Jan 24, 2026 · [Details](P58Zt8A_1Mc.md) (shared: `zig` · `webassembly` · `interop`)
- [Cloth Simulation: A Performance Study](https://youtu.be/US7oyxbcJCc) — Development · 15 views · Jan 25, 2026 · [Details](US7oyxbcJCc.md) (shared: `zig` · `webassembly` · `swift`)
- [Practical Data Oriented Design in Zig](https://youtu.be/o9yaniXkM-0) — Development · 99 views · Jan 29, 2026 · [Details](o9yaniXkM-0.md) (shared: `zig` · `struct of arrays` · `struct`)
- [Memory Layout in Zig](https://youtu.be/h31-NtagNoU) — Development · 62 views · Jan 29, 2026 · [Details](h31-NtagNoU.md) (shared: `zig` · `struct` · `arrays`)

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Internals Companion](zmd://wiki/books/internals-companion.md) — Chapter 4** (confidence: 10%)_
