---
type: video
videoId: xkHQhOgapfY
category: development
tags: [qmd, sqlite, zig, search]
views: 21
date: 2026-04-21T10:14:38Z
summarized: 2026-04-22T22:00:00.000Z
---

# ZMD Architecture & Evolution

> [development](../development.md) · 21 views · Apr 21, 2026
> [Watch on YouTube](https://youtu.be/xkHQhOgapfY)

## Summary

This presentation explores ZMD, a local-first zero-dependency search engine rewritten in native Zig from its QMD predecessor. It details the hybrid scoring pipeline that combines BM25 full-text search, cosine vector similarity, reciprocal rank fusion (RRF), and LLM-based reranking—all with scores normalized to a 0–1 range. The single static binary embeds SQLite (with FTS5 and sqlite-vec), Tree-sitter for syntax-aware chunking, and llama.cpp for optional embeddings, requiring no external runtime dependencies.

## Key Takeaways

- ZMD compiles into a single static binary embedding SQLite 3, Tree-sitter, and llama.cpp with zero runtime dependencies for maximum portability and privacy.
- The hybrid search pipeline normalizes BM25 keyword scores and cosine vector similarity to 0–1, fuses them via reciprocal rank fusion (RRF), then applies LLM-based confidence-weighted reranking.
- A build-time `-fno-sanitize=undefined` flag is required to work around a known benign signed integer overflow in SQLite's FTS5 porter stemmer that triggers Zig's UB sanitizer.
- All score-based sorting and top-K truncation occur internally before results reach the CLI output layer, ensuring only the most relevant data is delivered.

## Topics Covered

`ZMD` · `QMD` · `Zig` · `SQLite` · `FTS5` · `BM25` · `cosine similarity` · `RRF` · `LLM reranking` · `Tree-sitter` · `llama.cpp` · `local-first search`

## Related Videos

- [The Local SOTA Engine for Your Digital Brain](https://youtu.be/j8lMpSezavQ) — Development · 53 views · Apr 13, 2026 · [Details](j8lMpSezavQ.md) (shared: `qmd` · `fts5` · `local-first search`)
- [Architectural Evolution of a Vision Tool](https://youtu.be/Qv9X3ZY474U) — Development · 52 views · Mar 28, 2026 · [Details](Qv9X3ZY474U.md) (shared: `zig` · `llama.cpp`)
- [A Compiler, Not a Renderer](https://youtu.be/E8f87EV4k3A) — Development · 144 views · Apr 17, 2026 · [Details](E8f87EV4k3A.md) (shared: `zig`)
- [microgpt-zig: Atomic Al Training](https://youtu.be/AcpVuvtSXwI) — Development · 50 views · Feb 28, 2026 · [Details](AcpVuvtSXwI.md) (shared: `zig`)
- [Emacs Architecture, Neovim Philosophy](https://youtu.be/wKzz0jKiScM) — Development · 268 views · Apr 19, 2026 · [Details](wKzz0jKiScM.md) (shared: `tree-sitter`)

---
*Auto-generated on Apr 22, 2026. Back to [development](../development.md) · [index](../index.md).*
