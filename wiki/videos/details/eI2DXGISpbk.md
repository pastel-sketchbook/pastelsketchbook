---
type: video
videoId: eI2DXGISpbk
category: kubernetes
tags: []
views: 37
date: 2026-02-13T00:09:38Z
summarized: 2026-04-16T22:00:00.000Z
---

# BadgerDB: The Go-Native Key-Value Store

> [kubernetes](../kubernetes.md) · 37 views · Feb 13, 2026
> [Watch on YouTube](https://youtu.be/eI2DXGISpbk)

## Summary

This video introduces BadgerDB, a pure Go embeddable key-value store engineered for SSDs and built as a high-performance alternative to RocksDB. Developed by the Dgraph team to eliminate CGo bottlenecks, BadgerDB implements the WiscKey thesis of separating keys from values to reduce write amplification inherent in traditional LSM-tree stores like LevelDB and RocksDB. Now at stable v4.x, it powers petabyte-scale datasets in production environments.

## Key Takeaways

- BadgerDB eliminates the CGo friction of integrating C++ stores like RocksDB, which causes build complexity, difficult memory profiling, and scheduler conflicts between Go and C++ threads.
- The WiscKey thesis separates keys from values during LSM-tree compaction, dramatically reducing write amplification compared to traditional stores that rewrite both together.
- Pure Go architecture provides native access to Go's profiling tools (pprof), efficient goroutine management, and fast compilation without cross-language integration overhead.
- BadgerDB v4.x already powers petabyte-scale datasets in demanding production environments, proving its reliability at scale.

## Topics Covered

`badgerdb` · `lsm-tree` · `wisckey thesis` · `write amplification` · `pure go storage` · `ssd optimization` · `key-value store`

## Related Videos

- [minikv: Distributed Systems Meets Data Science](https://youtu.be/a8heWpae5p0) — Kubernetes · 18 views · Apr 11, 2026 · [Details](a8heWpae5p0.md) (shared: `key-value` · `store`)
- [Introducing ExtendDB](https://youtu.be/LxI5YjCUswI) — Kubernetes · 38 views · May 24, 2026 · [Details](LxI5YjCUswI.md) (shared: `write` · `storage`)
- [Architecting Meilisearch on AKS & Istio](https://youtu.be/MIZ0ATwu7C0) — Kubernetes · 27 views · Feb 10, 2026 · [Details](MIZ0ATwu7C0.md) (shared: `storage`)
- [From Stateful to Secure](https://youtu.be/0U-SUJCmKAU) — Kubernetes · 47 views · Jan 16, 2026 · [Details](0U-SUJCmKAU.md) (shared: `storage`)
- [Building an End-to-End MLOps Pipeline](https://youtu.be/mGMaqTvWrCc) — Kubernetes · 33 views · Apr 14, 2026 · [Details](mGMaqTvWrCc.md) (shared: `storage`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
