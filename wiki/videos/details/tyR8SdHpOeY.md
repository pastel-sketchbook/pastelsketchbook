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

## Related Videos

- [zig-lottie: Compiling Motion](https://youtu.be/QC-vaMcjq3M) — Development · 83 views · Apr 11, 2026 · [Details](QC-vaMcjq3M.md) (shared: `zig programming` · `zig` · `programming`)
- [Swift Firefly](https://youtu.be/P58Zt8A_1Mc) — Development · 113 views · Jan 24, 2026 · [Details](P58Zt8A_1Mc.md) (shared: `zig` · `programming` · `architecture`)
- [zig-twitter: Anatomy of a Hybrid Terminal Client](https://youtu.be/a2kADxV0kBM) — Development · 37 views · Mar 14, 2026 · [Details](a2kADxV0kBM.md) (shared: `zig` · `architecture` · `api`)
- [Smooth Motion](https://youtu.be/qbBA7GWZbu4) — Development · 48 views · Jan 24, 2026 · [Details](qbBA7GWZbu4.md) (shared: `zig programming` · `zig` · `programming`)
- [pastel-hn](https://youtu.be/cJl2cchaHL8) — Development · 59 views · Jan 24, 2026 · [Details](cJl2cchaHL8.md) (shared: `zig` · `architecture` · `webassembly`)

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Internals Companion](zmd://wiki/books/internals-companion.md) — Chapter 14** (confidence: 33%)_
