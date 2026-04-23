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

---
*Auto-generated on Apr 22, 2026. Back to [development](../development.md) · [index](../index.md).*
