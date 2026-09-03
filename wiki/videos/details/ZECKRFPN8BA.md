---
type: video
videoId: ZECKRFPN8BA
category: kubernetes
tags: [resilience, k8s]
views: 8
date: 2026-08-25T23:00:00Z
summarized: 2026-08-28T03:00:00.000Z
---

# Orchestrating Kubernetes Resilience

> [kubernetes](../kubernetes.md) · 8 views · Aug 25, 2026
> [Watch on YouTube](https://youtu.be/ZECKRFPN8BA)

## Summary

A visual and conceptual guide to orchestrating Kubernetes resilience from the pod as the smallest deployable unit through replica sets and deployments that control rolling updates with max surge and max unavailable. It details the probe cascade where startup probes gate liveness and readiness, readiness removes a pod from service while the container keeps running, and liveness kills and restarts unresponsive containers, alongside the node-maintenance trilogy of cordon, drain, and evict. It then shows how pod disruption budgets with minAvailable/maxUnavailable act as an API-level gatekeeper during voluntary disruptions, with the eviction API returning HTTP 429 Too Many Requests when a budget would be violated.

## Key Takeaways

- Pod is the smallest deployable unit in Kubernetes — a logical host sharing a single cluster IP, network namespace, and storage volumes; containers within a pod communicate via localhost and enable patterns for sidecars (log shipping, Envoy proxy, mesh/monitoring), init containers (migrations, config, dependencies), and adapter/ambassador proxies.
- Replica sets provide self-healing and scaling by watching label selectors to maintain a target replica count, while deployments sit above them for declarative lifecycle management, orchestrating rolling updates by ramping a new replica set up and the old one down (kept at zero for rollback) with max surge 25% and max unavailable 0 to preserve availability.
- Probe cascade controls health: startup probe disables liveness and readiness until it passes to protect slow starts; readiness failure removes the pod from service endpoints without killing the container; liveness failure triggers kubelet to kill and restart the container per restart policy.
- Node-maintenance trilogy: cordon (`kubectl cordon`) marks a node SchedulingDisabled and blocks new pods without affecting existing ones; drain (`kubectl drain`) cordons then gracefully evicts all pods; evict is a single-pod API eviction request that underlies drain and respects PDBs, with the workflow respecting graceful termination and rescheduling.
- Pod disruption budgets define minAvailable or maxUnavailable as an integer or percentage (never both, e.g., minAvailable 80% for 5 replicas guarantees 4 remain) matched via selector labels, serving as an API gatekeeper that approves evictions when the budget allows and rejects with 429 when it would be exceeded; resolution tiers are Tier 1 fix replacements or scale up deployment, Tier 2 temporarily delete the PDB, Tier 3 bypass eviction API with `kubectl drain --disable-eviction`, and Tier 4 surgical `kubectl delete pod` bypassing the eviction endpoint entirely.

## Topics Covered

`kubernetes pod resilience` · `replica set self-healing` · `deployment rolling updates` · `max surge max unavailable` · `startup readiness liveness probes` · `cordon drain evict trilogy` · `pod disruption budget pdb` · `eviction api 429 gatekeeper`

## Tags

[resilience](../tags/resilience.md) · [k8s](../tags/k8s.md)

## Related Videos

- [Scaling Node.js from PM2 to Cloud-Native Orchestration](https://youtu.be/p9LNSeAt5Zw) — Kubernetes · 22 views · Apr 22, 2026 · [Details](p9LNSeAt5Zw.md) (shared: `kubernetes` · `rolling` · `updates`)
- [Mastering Batch Workload Orchestration on Kubernetes](https://youtu.be/XKTtea0xGsA) — Kubernetes · 25 views · Jul 17, 2026 · [Details](XKTtea0xGsA.md) (shared: `kubernetes` · `pod` · `disruption`)
- [Orchestrating Distributed Al on Kubernetes](https://youtu.be/W_rZivDmMRY) — Kubernetes · 17 views · Jul 30, 2026 · [Details](W_rZivDmMRY.md) (shared: `kubernetes` · `pod` · `deployment`)
- [Upgrading MKE with NFS Stateful Workloads](https://youtu.be/WeVWqluXtlA) — Kubernetes · 17 views · Aug 30, 2026 · [Details](WeVWqluXtlA.md) (shared: `pod` · `drain` · `disruption`)
- [Kubernetes Cluster Architecture](https://youtu.be/rJTUB-u8U2Y) — Kubernetes · 13 views · Jan 9, 2026 · [Details](rJTUB-u8U2Y.md) (shared: `kubernetes` · `pod`)

---
*Auto-generated on Aug 28, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
