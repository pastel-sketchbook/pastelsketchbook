---
type: video
videoId: Itjb_eppRG0
category: kubernetes
tags: [k8s, 1.37, garhwal]
views: 128
date: 2026-08-28T23:00:21Z
summarized: 2026-09-03T03:00:00.000Z
---

# Kubernetes v1.37

> [kubernetes](../kubernetes.md) · 128 views · Aug 28, 2026
> [Watch on YouTube](https://youtu.be/Itjb_eppRG0)

## Summary

Kubernetes v1.37 "Garhwal" — named for the resilience of the Garhwal Himalayas — ships 67 enhancements (16 stable, 23 beta, 27 alpha, 1 deprecation) across three tightly woven layers: compute and AI ecosystem, control plane and API, and storage and node operations. Stable pillars lock resilient watch cache initialization on (PostStartHook + HTTP 429 back-offs preventing etcd thundering herds while warming), graduate storage version migration for declarative CRD rewriting (V1beta1→V1) and encryption-at-rest, switch SELinux mount to `o=context` bypassing slow recursive relabel, and deliver native identity via pod certificates/cluster trust bundles (signer controller + projected volume rotation) alongside metrics v1 as the production HPA/`kubectl top` API (with native histograms advancing to beta via dynamic exponential buckets for Prometheus). Beta completes the loop with HPA scale-to-zero to exactly zero pods on external/object metrics, manifest admission loading on-disk webhooks/CEL policies before API/etcd boot, etcd rangestream chunked streaming with adaptive sizing and MVCC revision pinning plus concurrent watch decode over 10 worker goroutines cutting init up to 55%, stale-controller read-your-writes via bookmark, DRA claim templates shared across workloads/podGroups, gang scheduling via pod-group queuing and workload-aware preemption, pod-level NUMA resource managers pooling CPU/memory per NUMA boundary for HPC sidecars, CSI capacity scoring, PVC last-use tracking, CSI-aware autoscaling gated by `prevent-pod-scheduling-if-missing`, and cgroups v2 memory QoS (memory.min/low/high); alpha previews pod checkpoints via CRI for node-local snapshot/restore and DRA derived CEL attributes plus device-compatibility groups blocking MIG/vGPU mismatches, while deprecations chart kube-dns→CoreDNS (no packages after 1.40), kube-proxy IPVS→NFTables (disabled 1.40/removed 1.43), cgroup v1→v2 (failCgroupV1=true), and `kubectl run --filename`.

## Key Takeaways

- Resilient control plane is now production-hardened: stable resilient watch cache locks initialization and 429-gates List/Watch thundering herds, beta etcd rangestream replaces memory-crushing unary RPCs with adaptive chunked pagination pinned to an MVCC revision for snapshot consistency, beta concurrent watch decode parallelizes deserialization across a bounded pool of 10 Go routines to cut cache init up to 55%, and beta stale-controller consistency guarantees read-your-writes (bookmark-tracked resourceVersion, pause reconciliation until informer catches up) eliminating false node-lease expiry and mass pod evictions.
- Dynamic Resource Allocation matures in three tracks to natively replace device plugins: stable claims expose standardized device data (network interface IPs) and fulfill extended resources (GPUs) plus device taints/tolerations mapped to physical hardware; beta claim templates associate with workloads/podGroups letting AI/ML batches share a single claim and slash per-pod API overhead; alpha adds derived attributes via CEL for virtual hardware and device-compatibility groups preventing incompatible MIG/vGPU co-scheduling on one node.
- AI-scale scheduling and execution enforce coordinated all-or-nothing semantics: beta gang scheduling via workload API pod groups with pod-group queuing and workload-aware preemption evaluates whole groups as a unit (preempting lower-priority groups collectively) to prevent partial-schedule deadlocks that strand GPUs, while pod-level NUMA (pod-level resource managers feature gate) pools CPU/memory per NUMA node so a high-performance container reserves localized cores and sidecars share the remainder within the same boundary, maximizing throughput and minimizing latency for HPC/inference.
- Security hardens from boot to runtime: beta manifest admission closes the pre-etcd window via three phases — disk (t0) loads webhooks/CEL from local disk before networking, boot (t1) blocks malicious admission at the API server, etcd (t2) initializes already-secured; stable pod certificates and cluster trust bundles with a signer controller watching PodCertificateRequests and projected-volume auto-rotation replace third-party cert managers; stable SELinux mount via `mount -o context` drops recursive relabel (fallback `recursive` policy for shared-volume label conflicts); memory QoS beta leverages cgroups v2 tiered thresholds (memory.min/low/high) to throttle before hard eviction.
- Efficiency and operational resilience converge: beta HPA scale-to-zero (enabled by default for external/object metrics, scale-to-zero status condition) steps replicas to zero on queue-depth decay and restores instantly, saving idle GPU/batch costs; storage graduates version migration and adds beta capacity scoring (volume binding plugin scores nodes by CSI free capacity for bin-packing), beta PVC last-use time (unused condition + timestamp for automated orphan reclamation), and beta CSI-aware autoscaling (autoscaler simulates against templated CSI Node objects, scheduler gate `prevent-pod-scheduling-if-missing` blocks placement until driver reports volume limits) preventing mount-failure deadlocks; observability graduates metrics v1 (v1beta1 remains usable) and beta native histograms, while alpha pod checkpoints via CRI enable forensic snapshot/restore at the node.

## Topics Covered

`kubernetes v1.37 garhwal` · `resilient watch cache` · `hpa scale to zero` · `manifest admission` · `dra gang scheduling` · `pod-level numa` · `etcd rangestream`

## Tags

[k8s](../tags/k8s.md) · [1.37](../tags/1.37.md) · [garhwal](../tags/garhwal.md)

## Related Videos

- [Kubernetes Cluster Architecture](https://youtu.be/rJTUB-u8U2Y) — Kubernetes · 13 views · Jan 9, 2026 · [Details](rJTUB-u8U2Y.md) (shared: `kubernetes` · `scheduling` · `etcd`)
- [The 100+ Service Problem](https://youtu.be/_sxPf3tHq3s) — Kubernetes · 27 views · Jan 16, 2026 · [Details](_sxPf3tHq3s.md) (shared: `kubernetes` · `scale`)
- [Kubernetes 1.36 (Haru)](https://youtu.be/2ksi8K7wg3I) — Kubernetes · 95 views · Apr 23, 2026 · [Details](2ksi8K7wg3I.md) (shared: `kubernetes` · `admission` · `dra`)
- [Architecting LLM Inference at Scale](https://youtu.be/WI8yUaPon0w) — Kubernetes · 22 views · Jul 31, 2026 · [Details](WI8yUaPon0w.md) (shared: `kubernetes` · `cache` · `zero`)
- [Architecting Meilisearch on AKS & Istio](https://youtu.be/MIZ0ATwu7C0) — Kubernetes · 27 views · Feb 10, 2026 · [Details](MIZ0ATwu7C0.md) (shared: `kubernetes` · `zero`)

---
*Auto-generated on Sep 03, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
