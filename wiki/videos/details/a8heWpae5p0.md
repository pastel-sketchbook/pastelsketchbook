---
type: video
videoId: a8heWpae5p0
category: kubernetes
tags: []
views: 14
date: 2026-04-12T04:50:10Z
summarized: 2026-04-16T22:00:00.000Z
---

# minikv: Distributed Systems Meets Data Science

> [kubernetes](../kubernetes.md) · 14 views · Apr 12, 2026
> [Watch on YouTube](https://youtu.be/a8heWpae5p0)

## Summary

This video introduces minikv, an open-source (MIT) distributed key-value store built on the Raft consensus algorithm with native time series and vector similarity search engines. The v1.0.0 GA release features a two-phase commit protocol, write-ahead log for durability, RBAC multi-tenancy, AES-256-GCM encryption, and a dedicated Kubernetes operator with CRDs for deployment.

## Key Takeaways

- minikv uses Raft consensus for distributed metadata consistency and a two-phase commit protocol with write-ahead log for data durability.
- Native time series engine and vector similarity search are integrated directly into the core, eliminating the need for external specialized services.
- Enterprise features include RBAC multi-tenancy and AES-256-GCM encryption for data protection out of the box.
- A dedicated Kubernetes operator with custom resource definitions (CRDs) enables automated deployment and lifecycle management.

## Topics Covered

`raft consensus` · `distributed key-value store` · `vector search` · `time series` · `kubernetes operator` · `write-ahead log`

## Related Videos

- [From Consensus Physics to Messaging Engineering](https://youtu.be/V9tvg6Yg3m4) — Kubernetes · 47 views · May 7, 2026 · [Details](V9tvg6Yg3m4.md) (shared: `raft` · `consensus` · `distributed`)
- [Architecting Real-Time State](https://youtu.be/WRpjJV4SUKc) — Kubernetes · 75 views · Apr 5, 2026 · [Details](WRpjJV4SUKc.md) (shared: `distributed` · `kubernetes` · `write-ahead log`)
- [Architecting Cost Efficiency for Al Workloads](https://youtu.be/eaPXjvB194w) — Kubernetes · 25 views · Apr 25, 2026 · [Details](eaPXjvB194w.md) (shared: `vector search` · `vector` · `search`)
- [BadgerDB: The Go-Native Key-Value Store](https://youtu.be/eI2DXGISpbk) — Kubernetes · 64 views · Feb 12, 2026 · [Details](eI2DXGISpbk.md) (shared: `key-value` · `store`)
- [kube-log-viewer](https://youtu.be/aiYBPCkvhes) — Kubernetes · 24 views · Mar 5, 2026 · [Details](aiYBPCkvhes.md) (shared: `kubernetes` · `log`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Architect's Sketchbook](zmd://wiki/books/architects-sketchbook.md) — Chapter 8** (confidence: 33%)_
