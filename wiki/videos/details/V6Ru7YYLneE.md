---
type: video
videoId: V6Ru7YYLneE
category: development
tags: [rust, burn, ml, distillation, training]
views: 4
date: 2026-05-22T20:52:22Z
summarized: 2026-05-22T22:00:00.000Z
---

# Architecting Local Legal Embeddings

> [development](../development.md) · 4 views · May 22, 2026
> [Watch on YouTube](https://youtu.be/V6Ru7YYLneE)

## Summary

This architecture rationale documents a Rust-native Burn-powered ML pipeline for Korean law, designed to embed 306,000 legal documents and precedents entirely on an Apple M1 Pro with 16 GB unified memory and no CUDA. The five-stage pipeline pairs natural-pair extraction from SQLite with a custom 32K BPE tokenizer, contrastive learning via InfoNCE with Matryoshka dimension truncation, and knowledge distillation from an EmbeddingGemma 300M teacher into a lightweight Burn student model exported as SQLite vec0-compatible F32 embeddings.

## Key Takeaways

- Targets strict local execution on Apple M1 Pro by leveraging Burn's native Metal/WGPU backends, avoiding CUDA dependencies and Python environment management entirely.
- The five-stage macro pipeline (pair extraction → BPE tokenization → contrastive training → knowledge distillation → atomic F32 export) is engineered for a 306K-document Korean legal corpus.
- Uses InfoNCE contrastive learning with Matryoshka dimension truncation to produce scalable embeddings that remain useful at multiple truncated dimensions.
- Knowledge distillation from EmbeddingGemma 300M (teacher) to a smaller Burn student model offsets Burn's smaller pre-trained ecosystem and enables offline inference via llama.cpp.
- Output is SQLite vec0-compatible raw F32 bytes, enabling zero-friction integration with the sibling `legal-ko` Rust repository and high-throughput downstream similarity search.

## Topics Covered

`rust burn ml pipeline` · `korean legal embeddings` · `apple m1 metal acceleration` · `contrastive learning infonce` · `matryoshka dimension truncation` · `knowledge distillation` · `sqlite vec0 embeddings` · `bpe tokenizer training`

## Tags

[rust](../tags/rust.md) · [burn](../tags/burn.md) · [ml](../tags/ml.md) · [distillation](../tags/distillation.md) · [training](../tags/training.md)

## Related Videos

- [The Burn Book](https://youtu.be/B7MMdnv3y1M) — Development · 27 views · May 21, 2026 · [Details](B7MMdnv3y1M.md) (shared: `rust` · `burn` · `pipeline`)
- [Mastering Machine Learning in Rust](https://youtu.be/htpvlYnX77w) — Development · 24 views · May 19, 2026 · [Details](htpvlYnX77w.md) (shared: `rust` · `burn` · `learning`)
- [Zig  Pragmatic Successor to C](https://youtu.be/yOOQNnaOLeM) — Development · 26 views · Jan 9, 2026 · [Details](yOOQNnaOLeM.md) (shared: `rust` · `learning`)
- [Hangul Typing](https://youtu.be/Pp36ysjfWd8) — Development · 9 views · Jan 22, 2026 · [Details](Pp36ysjfWd8.md) (shared: `korean` · `learning`)
- [codeprobe](https://youtu.be/xVdW3yUCbuU) — Development · 33 views · Mar 4, 2026 · [Details](xVdW3yUCbuU.md) (shared: `rust` · `pipeline`)

---
*Auto-generated on May 22, 2026. Back to [development](../development.md) · [index](../index.md).*
