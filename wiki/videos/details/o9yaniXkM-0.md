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

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
