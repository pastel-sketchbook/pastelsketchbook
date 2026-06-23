---
type: video
videoId: PofJfj6nRuw
category: kubernetes
tags: [copilot, dts, orchestration, platform]
views: 3
date: 2026-06-11T23:00:19Z
summarized: 2026-06-13T22:10:00.000Z
---

# Architecting AI at Global Scale

> [kubernetes](../kubernetes.md) · 3 views · Jun 11, 2026
> [Watch on YouTube](https://youtu.be/PofJfj6nRuw)

## Summary

This talk presents the Microsoft Copilot blueprint for running hundreds of millions of multi-step AI workflows per week using the Durable Task Scheduler (DTS) on Azure Functions and AKS. It argues for moving durability, state management, and replay-based recovery out of individual feature code and into a centralized orchestration layer, replacing fragmented per-feature retry logic. The result is one reliability engine serving 25+ orchestrations and 10+ microservices, delivering uniform resilience while accelerating engineering velocity.

## Key Takeaways

- Custom per-feature recovery logic becomes operationally untenable at scale; standardizing on the Durable Task Scheduler centralizes state persistence, failure recovery, and automatic workflow replay.
- Agentic tasks can be categorized along two dimensions — user-initiated vs. autonomous, and one-time vs. perpetual — but all four quadrants require robust background execution that survives infrastructure shifts.
- Durable orchestration guarantees replay resumes from the exact point of interruption without duplicating already-completed steps, so long-running scheduled tasks complete even through regional failures.
- One DTS reliability engine on AKS orchestrates heterogeneous workloads (scheduled AI, personalized discovery, memory indexing, deep research, account lifecycle) at ~300M weekly memory-indexing and tens of millions of other activities.
- Three platform principles: shift the locus of durability into the orchestration layer, standardize the resilience pattern with durable timers and sub-orchestrations, and scale without fragmenting reliability across teams.

## Topics Covered

`durable task scheduler` · `ai workflow orchestration` · `azure functions durability` · `automatic workflow replay` · `state management and checkpointing` · `agentic task taxonomy` · `aks reliability engine` · `engineering velocity at scale`

## Tags

[copilot](../tags/copilot.md) · [dts](../tags/dts.md) · [orchestration](../tags/orchestration.md) · [platform](../tags/platform.md)

## Related Videos

- [The Complete Codebase Lifecycle](https://youtu.be/C6wLm6NRZW4) — Kubernetes · 6 views · Jan 14, 2026 · [Details](C6wLm6NRZW4.md) (shared: `azure` · `aks`)
- [Bridging Helm and CUE for Deterministic Value Composition](https://youtu.be/7eoxSgjwYlM) — Kubernetes · 26 views · Feb 19, 2026 · [Details](7eoxSgjwYlM.md) (shared: `management` · `engineering`)
- [K8s Services  AKS & Istio](https://youtu.be/C5HqbzLRYZ0) — Kubernetes · 15 views · Jan 10, 2026 · [Details](C5HqbzLRYZ0.md) (shared: `management` · `aks`)
- [Securely Exposing AKS Applications](https://youtu.be/A7eoKD5m6Ek) — Kubernetes · 9 views · Jan 8, 2026 · [Details](A7eoKD5m6Ek.md) (shared: `azure` · `aks`)
- [Agentic Platform Engineering with GitHub Copilot](https://youtu.be/lexZnOlyml0) — Kubernetes · 70 views · Mar 26, 2026 · [Details](lexZnOlyml0.md) (shared: `agentic` · `engineering`)

---
*Auto-generated on Jun 13, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
