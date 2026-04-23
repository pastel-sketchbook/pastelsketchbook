---
type: video
videoId: E8f87EV4k3A
category: development
tags: [zig, mmdc, mermaid, compiler]
views: 139
date: 2026-04-17T12:06:22Z
summarized: 2026-04-22T22:00:00.000Z
---

# A Compiler, Not a Renderer

> [development](../development.md) · 139 views · Apr 17, 2026
> [Watch on YouTube](https://youtu.be/E8f87EV4k3A)

## Summary

This video introduces zig-mmdc, a zero-dependency Mermaid diagram engine built in Zig that treats diagram generation as a compilation problem rather than a rendering one. It explains why eliminating the Chromium dependency—with its 300MB footprint and cold start delays—led to an AST-based geometric layout approach that emits SVG directly without DOM or CSS. The talk covers the full compilation pipeline from lexer through parser, layout, and emitter, and why Zig's WASM symmetry, zero runtime, and explicit allocators make it the ideal language for this architecture.

## Key Takeaways

- zig-mmdc reframes Mermaid rendering as a compiler pipeline (lexer → parser → layout → emitter), eliminating the need for a browser runtime entirely.
- Chromium-based rendering carries a 300MB footprint and cold start penalties that are unacceptable for CI/CD and embedded use cases.
- AST-based geometric layout computes node positions and edge routing mathematically, emitting clean SVG without DOM or CSS dependencies.
- Zig's WASM symmetry, zero runtime overhead, and explicit allocator model provide deterministic memory control ideal for a self-contained compilation engine.

## Topics Covered

`zig-mmdc` · `mermaid` · `compiler pipeline` · `AST layout` · `SVG emission` · `Zig` · `WASM` · `zero-dependency`

## Tags

[zig](../tags/zig.md) · [mmdc](../tags/mmdc.md) · [mermaid](../tags/mermaid.md) · [compiler](../tags/compiler.md)

---
*Auto-generated on Apr 22, 2026. Back to [development](../development.md) · [index](../index.md).*