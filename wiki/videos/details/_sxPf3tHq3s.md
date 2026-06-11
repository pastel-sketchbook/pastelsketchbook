---
type: video
videoId: _sxPf3tHq3s
category: kubernetes
tags: []
views: 27
date: 2026-01-16T08:00:15Z
summarized: 2026-04-16T22:00:00.000Z
---

# The 100+ Service Problem

> [kubernetes](../kubernetes.md) · 27 views · Jan 16, 2026
> [Watch on YouTube](https://youtu.be/_sxPf3tHq3s)

## Summary

This video addresses the scaling challenge organizations face when managing over 100 microservices deploying to Kubernetes, evaluating three Helm chart strategies: per-service charts, a monolithic universal chart, and a layered abstracted approach. It argues that copy-pasting Helm charts per service creates unmanageable duplication, while a single universal chart becomes an unmaintainable monolith, and presents a middle-ground architecture.

## Key Takeaways

- Per-service Helm charts lead to massive code duplication and make routine upgrades like ingress changes a miserable manual process across dozens of repositories.
- A monolithic universal chart overcorrects by creating a single massive chart that becomes impossible to maintain and reason about.
- The recommended approach uses a layered abstraction with shared base charts that individual services extend with minimal configuration.
- The central scaling question is whether to embed Helm folders in every repo or create a single abstracted chart that all applications share.

## Topics Covered

`helm charts` · `kubernetes at scale` · `microservices deployment` · `chart abstraction` · `deployment architecture`

## Related Videos

- [Architecting Modern Deployments](https://youtu.be/eZNBXDUc8OQ) — Kubernetes · 16 views · Apr 22, 2026 · [Details](eZNBXDUc8OQ.md) (shared: `helm` · `chart` · `architecture`)
- [Kubernetes Cluster Architecture](https://youtu.be/rJTUB-u8U2Y) — Kubernetes · 12 views · Jan 9, 2026 · [Details](rJTUB-u8U2Y.md) (shared: `kubernetes` · `architecture`)
- [The Blueprint for Enterprise AI on Azure](https://youtu.be/8ycnldvJmuA) — Kubernetes · 18 views · Jan 2, 2026 · [Details](8ycnldvJmuA.md) (shared: `kubernetes` · `architecture`)
- [Seamless GitOps on Azure](https://youtu.be/9ga0NT3ZohQ) — Kubernetes · 11 views · May 22, 2026 · [Details](9ga0NT3ZohQ.md) (shared: `kubernetes` · `deployment` · `architecture`)
- [Choosing Your Messaging Fabric on AKS](https://youtu.be/N4nRAfBZ3BE) — Kubernetes · 5 views · Jan 10, 2026 · [Details](N4nRAfBZ3BE.md) (shared: `kubernetes` · `architecture`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
