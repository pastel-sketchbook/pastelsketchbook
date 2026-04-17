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

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
