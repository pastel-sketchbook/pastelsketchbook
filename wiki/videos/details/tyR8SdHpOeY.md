---
type: video
videoId: tyR8SdHpOeY
category: development
tags: []
views: 15
date: 2026-04-13T00:06:42Z
summarized: 2026-04-16T22:00:00.000Z
---

# Book-Finder Architecture

> [development](../development.md) · 15 views · Apr 13, 2026
> [Watch on YouTube](https://youtu.be/tyR8SdHpOeY)

## Summary

This video presents the architecture of BookFinder, a multi-source library catalog tool built entirely in Zig with zero external dependencies. The system aggregates bibliographic data from Open Library, Library of Congress, and Franklin Penn Libraries through a single core parser, then delivers results to three UI targets: a native CLI, a WebAssembly-powered web interface, and a terminal UI via OpenUI. The design addresses the challenge of wildly inconsistent JSON shapes returned by different public library catalog APIs.

## Key Takeaways

- BookFinder's Zig core parser has zero external dependencies, ensuring maximum portability and consistent performance across CLI, WebAssembly, and terminal UI targets.
- The architecture maintains a single source of truth for parsing logic while deploying to three distinct environments: native CLI, WASM web, and OpenUI terminal.
- Public library catalogs return wildly inconsistent JSON shapes, making robust parsing the central technical challenge that the Zig core must solve.
- The three data sources — Open Library, Library of Congress, and Franklin Penn Libraries — are abstracted behind a unified interface enabling seamless multi-source search.

## Topics Covered

`zig programming` · `zero dependency architecture` · `webassembly` · `library catalog api` · `json parsing` · `multi-target deployment`

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
