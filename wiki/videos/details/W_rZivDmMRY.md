---
type: video
videoId: W_rZivDmMRY
category: kubernetes
views: 8
date: 2026-07-30T23:00:09Z
summarized: 2026-08-01T17:56:00.000Z
---

# Orchestrating Distributed AI on Kubernetes

> [kubernetes](../kubernetes.md) · 8 views · Jul 30, 2026
> [Watch on YouTube](https://youtu.be/W_rZivDmMRY)

## Summary

This talk presents KubeRay as the native Kubernetes operator for orchestrating Ray distributed AI workloads, translating high-level Ray cluster requirements into native Kubernetes lifecycle operations. It walks the three core custom resources — RayCluster, RayJob, and RayService — and covers zero-downtime model serving through overlapping clusters with canary traffic shifting via Kubernetes Gateway and HTTP routes. Performance and operability come from virtual kubelet pod pools that pre-initialize workers, an API v2 native HTTP proxy with compute template middleware, a kubectl plugin plus Python SDK (builder/director patterns), a Next.js dashboard, and sidecar-based post-mortem diagnostics that gzip Ray history to object storage before ephemeral clusters terminate.

## Key Takeaways

- Raw Kubernetes primitives (pods, services, ingress) make distributed ML orchestration tangled and slow; KubeRay acts as a specialized control plane that reconciles desired state via controllers and admission webhooks.
- Three CRDs cover the lifecycle: RayCluster for interactive and persistent compute (GCS fault tolerant, autoscaling), RayJob for scheduled batch training, and RayService for production model serving with zero-downtime upgrades.
- Zero-downtime upgrades overlap blue and green Ray clusters and manipulate native Gateway/HTTPRoute resources to canary-shift traffic (e.g. 10%/90%) between model versions.
- Virtual kubelet pod pools sidestep scheduling and image-pull latency: a pre-initialized reservoir of standby pods gives instantaneous Ray worker provisioning.
- API v2 drops the heavy gRPC abstraction for a native HTTP proxy mirroring the Kubernetes open API, with compute template middleware injecting CPU, memory, GPU, and tolerations into Ray specs in-flight.

## Topics Covered

`kuberay operator` · `ray distributed computing` · `kubernetes custom resources` · `zero downtime model serving` · `virtual kubelet pod pool` · `canary deployment traffic shifting` · `kubernetes gateway httproute` · `kubernetes api proxy` · `postmortem log retention` · `gcs fault tolerance`

## Related Videos

- [minikv: Distributed Systems Meets Data Science](https://youtu.be/a8heWpae5p0) — Kubernetes · 19 views · Apr 11, 2026 · [Details](a8heWpae5p0.md) (shared: `operator` · `distributed` · `kubernetes`)
- [Architecting Kubernetes Operators](https://youtu.be/hvkvH7i8NLc) — Kubernetes · 18 views · May 31, 2026 · [Details](hvkvH7i8NLc.md) (shared: `kubernetes` · `custom` · `resources`)
- [KAITO: The Kubernetes Al Toolchain Operator](https://youtu.be/kFzdToXTfn8) — Kubernetes · 19 views · Jul 21, 2026 · [Details](kFzdToXTfn8.md) (shared: `operator` · `kubernetes` · `model`)
- [Istio-Based Weighted Traffic Management on AKS](https://youtu.be/4YsX6tYi5x4) — Kubernetes · 14 views · May 6, 2026 · [Details](4YsX6tYi5x4.md) (shared: `kubernetes` · `pod` · `canary`)
- [Deploying Istio Service Mesh on AWS](https://youtu.be/hs7CiLpLgnY) — Kubernetes · 3 views · Jul 23, 2026 · [Details](hs7CiLpLgnY.md) (shared: `zero` · `pod` · `gateway`)

---
*Auto-generated on Aug 1, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
