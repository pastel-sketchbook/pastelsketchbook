---
type: video
videoId: QC-vaMcjq3M
category: development
tags: []
views: 54
date: 2026-04-11T05:33:18Z
summarized: 2026-04-16T22:00:00.000Z
---

# zig-lottie: Compiling Motion

> [development](../development.md) · 54 views · Apr 11, 2026
> [Watch on YouTube](https://youtu.be/QC-vaMcjq3M)

## Summary

This video presents zig-lottie, a zero-dependency Lottie animation renderer written in Zig that compiles to both a native CLI executable and a 78KB WebAssembly binary. The compiler ingests complex Lottie JSON payloads (with deeply nested arrays, mixed types, and optional fields) and transforms them into strictly validated structs, a WASM binary, and a standalone native binary. The architecture centers on src/root.zig as the core engine shared by both compilation targets.

## Key Takeaways

- zig-lottie compiles Lottie JSON into strictly typed Zig structs, a 78KB WASM binary, and a native CLI executable with zero external dependencies.
- Lottie payloads present parsing challenges: deeply nested arrays, mixed integer/float types, and frequently missing optional fields.
- The dual-target architecture shares a single core engine (src/root.zig) containing the type system, JSON parser, and custom memory management.
- The native path compiles through src/main.zig using standard Zig toolchain, while the web path targets WASM for browser rendering.

## Topics Covered

`zig programming` · `lottie animation` · `webassembly` · `zero-dependency design` · `json parsing` · `dual-target compilation`

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
