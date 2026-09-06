---
type: video
videoId: US99s1ISCkA
category: kubernetes
tags: [k8s, stateful, zero disruption]
views: 31
date: 2026-09-05T23:00:14Z
summarized: 2026-09-06T13:56:43Z
---

# The Stateful Al Playbook

> [kubernetes](../kubernetes.md) · 31 views · Sep 05, 2026
> [Watch on YouTube](https://youtu.be/US99s1ISCkA)

## Summary

The Stateful AI Playbook tackles zero-disruption node patching and PyTorch checkpoint resilience for AI-native Kubernetes, where stateful multi-GPU workloads with model weights, KV caches, and strict CUDA/driver coupling make routine reboots high-stakes operations. It pairs workload-aware drain orchestration — node ranking, separated eviction/drain controllers, queue-aware tainting via Kueue, pre-provisioning for 3-8 minute GPU cold starts, tight PodDisruptionBudgets, and 120-600s termination grace periods — with PyTorch Distributed Checkpoint (DCP) resilience built on `DCP.async_save` two-phase staging/persistence, pinned-memory D2H copies, plan caching, and synchronous emergency saves triggered by preStop hooks. The resilience handshake ties infrastructure signals (PDBs, preStop hooks, taints) to application cooperation (DCP, SIGTERM flag handlers, `dist.barrier` two-barrier durability consensus, and atomic shared-storage resume markers on PVC/S3) so training and stateful inference survive rolling GPU-fleet updates without lost progress or NCCL hangs.

## Key Takeaways

- Use the workload drain matrix for eviction: checkpoint-then-evict long-running training to shared storage, gang-aware all-or-none eviction with topology preservation for distributed training, low-traffic/low-KV-hit node selection with session-aware routing and cache warm-up for stateful inference, and taint-based manual/soft drain with user notification for interactive notebooks.
- Protect voluntary disruptions with tight PDBs (`maxUnavailable: 0 or 1` for training relaxed only after successful checkpoints, percentage-based or maxUnavailable 1 for inference), `unhealthyPodEvictionPolicy: AlwaysAllow`, and `terminationGracePeriodSeconds` of 120-600s so pods can flush checkpoints and drain in-flight requests.
- Hide checkpoint latency with PyTorch DCP `async_save` two-phase design — staging creates a training-safe immutable state-dict copy via pinned memory and non-blocking CUDA copies on a separate stream, then a background thread/process executor persists shards — keeping only one in-flight checkpoint since staging roughly doubles host memory, and choosing blocking async (small models), PyTorch 2.9+ background-thread default (large models), or custom async stagers for special hardware topologies.
- Enable plan caching (`enable plan caching: true`) when model architecture and sharding are constant to skip redundant 100+ rank plan-creation collectives, cutting end-to-end save latency up to 45% (e.g. 1.6TB model from 280s to 155s) by letting rank 0 reuse the cached blueprint.
- Implement emergency drains as a four-stage sequence — drain signal validated by PDB, preStop hook delivering SIGTERM and pausing termination, PyTorch signal handler setting only a flag (never doing IO mid-compute or mid-NCCL all-reduce), then synchronous `dcp.save` at the next safe boundary after `optimizer.step` to PVC/S3 — coordinated by a two-barrier protocol (barrier one: intent-to-save, synchronous save, barrier two: durability consensus, then exit 0) with process-group timeouts and atomic-rename/commit-success resume markers requiring symmetric shard reload plus a barrier before training continues.

## Topics Covered

`zero disruption node patching` · `workload aware drain orchestration` · `pytorch distributed checkpoint async save` · `plan caching collective optimization` · `emergency checkpoint pre-stop hook` · `distributed barrier synchronization` · `pod disruption budget protection`

## Tags

[k8s](../tags/k8s.md) · [stateful](../tags/stateful.md) · [zero disruption](../tags/zero disruption.md)

## Related Videos

- [Upgrading MKE with NFS Stateful Workloads](https://youtu.be/WeVWqluXtlA) — Kubernetes · 21 views · Aug 30, 2026 · [Details](WeVWqluXtlA.md) (shared: `disruption` · `drain` · `orchestration`)
- [Orchestrating Kubernetes Resilience](https://youtu.be/ZECKRFPN8BA) — Kubernetes · 19 views · Aug 25, 2026 · [Details](ZECKRFPN8BA.md) (shared: `disruption` · `drain` · `pod`)
- [Mastering Batch Workload Orchestration on Kubernetes](https://youtu.be/XKTtea0xGsA) — Kubernetes · 25 views · Jul 17, 2026 · [Details](XKTtea0xGsA.md) (shared: `disruption` · `orchestration` · `pod`)
- [Orchestrating Distributed Al on Kubernetes](https://youtu.be/W_rZivDmMRY) — Kubernetes · 17 views · Jul 30, 2026 · [Details](W_rZivDmMRY.md) (shared: `zero` · `distributed` · `pod`)
- [Zero Trust in Kubernetes](https://youtu.be/4b-H6ZaoNUE) — Kubernetes · 47 views · Jan 17, 2026 · [Details](4b-H6ZaoNUE.md) (shared: `zero` · `workload`)

---
*Auto-generated on Sep 06, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
