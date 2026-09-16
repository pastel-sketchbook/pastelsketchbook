---
type: video
videoId: sSIDBOrX_Ig
category: development
views: 22
date: 2026-09-10T23:00:14Z
summarized: 2026-09-11T11:09:23.000Z
---

# The Architecture of KataGo

> [development](../development.md) · 22 views · Sep 10, 2026
> [Watch on YouTube](https://youtu.be/sSIDBOrX_Ig)

## Summary

This video is a technical teardown of KataGo's Go AI engine, covering its residual convolutional network with separate policy and value heads trained by self-play and gradient descent, extended by Monte Carlo graph search with history-sensitive hashing for transposition merging. It details the surrounding ecosystem: the C++ engine with OpenCL, CUDA, TensorRT, and Eigen backends speaking Go Text Protocol and Kata Analyze JSON to the Python-based KaTrain GUI, plus the PyTorch training pipeline of shuffle.py, train.py, and export_model.py producing .bin.gz weights.

## Key Takeaways

- KataGo stacks convolutional layers and residual blocks with ReLU over multi-channel inputs encoding stones, liberties, move history, superko, komi, and SGF metadata, branching into a policy head for move probabilities and a value head for win-rate estimation.
- Unlike win-rate-only engines that play slack once ahead, KataGo dynamically tracks expected score and punishes point-losing mistakes even at 99%+ win rate to maximize the final margin.
- Monte Carlo graph search replaces tree search with a directed acyclic graph via history-sensitive hashing, merging identical board positions reached by different move orders to eliminate redundant search.
- The C++ engine is headless and GTP-driven, bootstrapped via gen_config to custom.cfg, thread-count tuning, and gtp launch with model weights, while KaTrain provides heat maps, score deltas, and strength-adjusted bots over Kata Analyze JSON.
- Transformer inference forces a backend tradeoff: OpenCL for broad Intel/AMD compatibility, CUDA with cuDNN 9.8+ for fast startup, TensorRT 10.16 for fastest inference with very slow startup, and AVX2 Eigen as CPU-only fallback.

## Topics Covered

`residual convolutional policy-value network` · `monte carlo graph search` · `history-sensitive transposition hashing` · `score-maximizing endgame play` · `go text protocol integration` · `cuda versus tensorrt backends` · `pytorch self-play training pipeline` · `katrain analysis interface`

## Related Videos

- [OpenCV Library Architecture and Capabilities](https://youtu.be/ZfAc2pqcS-4) — Development · 59 views · May 11, 2026 · [Details](ZfAc2pqcS-4.md) (shared: `graph` · `cuda` · `backends`)
- [codeprobe](https://youtu.be/xVdW3yUCbuU) — Development · 34 views · Mar 4, 2026 · [Details](xVdW3yUCbuU.md) (shared: `integration` · `pipeline` · `analysis`)
- [The PyTorch Architecture Blueprint](https://youtu.be/KXx_6BhzOFE) — Development · 61 views · Jun 13, 2026 · [Details](KXx_6BhzOFE.md) (shared: `graph` · `pytorch` · `pipeline`)
- [The Burn Book](https://youtu.be/B7MMdnv3y1M) — Development · 33 views · May 21, 2026 · [Details](B7MMdnv3y1M.md) (shared: `integration` · `training` · `pipeline`)
- [AEM + Meilisearch: A High-Performance Integration](https://youtu.be/KDnTY0Svmr0) — Development · 15 views · Feb 10, 2026 · [Details](KDnTY0Svmr0.md) (shared: `search` · `integration`)

---
*Auto-generated on Sep 11, 2026. Back to [development](../development.md) · [index](../index.md).*
