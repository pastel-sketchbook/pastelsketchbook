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

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
