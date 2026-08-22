---
type: video
videoId: Q4qm1hvVR2A
category: kubernetes
tags: []
views: 21
date: 2026-01-31T16:23:17Z
summarized: 2026-04-16T22:00:00.000Z
---

# Dragonfly on AKS

> [kubernetes](../kubernetes.md) · 21 views · Jan 31, 2026
> [Watch on YouTube](https://youtu.be/Q4qm1hvVR2A)

## Summary

This video covers deploying Dragonfly as a high-performance in-memory data store on Azure Kubernetes Service (AKS) integrated with the Istio service mesh. It highlights the "multi-core gap" where legacy single-threaded systems like Redis waste 31 of 32 available CPU cores, while Dragonfly's shared-nothing architecture utilizes all cores for maximum throughput. The session bridges AKS, Istio, and Dragonfly to create a scalable, high-efficiency infrastructure.

## Key Takeaways

- Redis's single-threaded event loop creates a multi-core gap, leaving 31 of 32 cores idle on modern Azure E5v5 instances.
- Dragonfly uses a shared-nothing architecture where each thread operates independently, enabling full multi-core utilization.
- The deployment integrates Dragonfly with Istio service mesh on AKS for mTLS, traffic management, and observability.
- Moving from shared-memory structures to per-thread isolated data eliminates contention and maximizes parallel throughput.

## Topics Covered

`dragonfly db` · `redis alternative` · `aks deployment` · `shared-nothing architecture` · `multi-core utilization` · `istio integration`

## Related Videos

- [Seamless GitOps on Azure](https://youtu.be/9ga0NT3ZohQ) — Kubernetes · 15 views · May 22, 2026 · [Details](9ga0NT3ZohQ.md) (shared: `aks` · `deployment` · `architecture`)
- [Secure Web App with Azure AD/OAuth2 Proxy](https://youtu.be/rgY4KTMFOMs) — Kubernetes · 80 views · Feb 5, 2026 · [Details](rgY4KTMFOMs.md) (shared: `aks` · `architecture` · `istio`)
- [The 100+ Service Problem](https://youtu.be/_sxPf3tHq3s) — Kubernetes · 27 views · Jan 16, 2026 · [Details](_sxPf3tHq3s.md) (shared: `deployment` · `architecture`)
- [The Codebase Lifecycle](https://youtu.be/ctKLD4d146g) — Kubernetes · 16 views · Jan 13, 2026 · [Details](ctKLD4d146g.md) (shared: `deployment` · `integration`)
- [K8s Services  AKS & Istio](https://youtu.be/C5HqbzLRYZ0) — Kubernetes · 27 views · Jan 10, 2026 · [Details](C5HqbzLRYZ0.md) (shared: `aks` · `istio`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Architect's Sketchbook](zmd://wiki/books/architects-sketchbook.md) — Chapter 3** (confidence: 22%)_
