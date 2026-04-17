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

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
