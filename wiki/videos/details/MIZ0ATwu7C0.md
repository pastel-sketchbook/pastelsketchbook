---
type: video
videoId: MIZ0ATwu7C0
category: kubernetes
tags: []
views: 26
date: 2026-02-10T09:50:21Z
summarized: 2026-04-16T22:00:00.000Z
---

# Architecting Meilisearch on AKS & Istio

> [kubernetes](../kubernetes.md) · 26 views · Feb 10, 2026
> [Watch on YouTube](https://youtu.be/MIZ0ATwu7C0)

## Summary

This video provides a technical blueprint for deploying Meilisearch on Azure Kubernetes Service within an Istio service mesh, targeting sub-50ms search latency in a zero-trust mTLS environment. It addresses three core challenges: speed (Meilisearch's dependency on LMDB and Linux kernel page cache), state (single-node architecture requiring dedicated persistent block storage, incompatible with NFS/SMB), and security (reconciling Istio sidecar mTLS proxies and kubelet health probes with latency budgets).

## Key Takeaways

- Meilisearch relies on LMDB (Lightning Memory-Mapped Database) and the Linux kernel page cache for sub-50ms query performance, making storage I/O characteristics critical.
- Shared file systems like NFS and SMB are incompatible with Meilisearch's architecture due to unacceptable latency; dedicated persistent block storage is required.
- Istio sidecar proxies and mTLS encryption add latency layers that must be carefully tuned to stay within the 50ms search latency budget.
- Kubelet health probes in a zero-trust Istio mesh require special configuration since the probes bypass the sidecar proxy by default.

## Topics Covered

`meilisearch` · `azure kubernetes service` · `istio service mesh` · `mtls` · `lmdb` · `zero trust` · `persistent storage`

## Related Videos

- [From Stateful to Secure](https://youtu.be/0U-SUJCmKAU) — Kubernetes · 46 views · Jan 16, 2026 · [Details](0U-SUJCmKAU.md) (shared: `kubernetes` · `zero trust` · `zero`)
- [Advanced Microservices Blueprint on Azure Kubernetes Service](https://youtu.be/BiYKKVsJROk) — Kubernetes · 21 views · Apr 1, 2026 · [Details](BiYKKVsJROk.md) (shared: `service` · `istio service mesh` · `istio`)
- [Strategic Implementation of Blue-Green Deployment](https://youtu.be/Hd767VA7Z-0) — Kubernetes · 13 views · Mar 10, 2026 · [Details](Hd767VA7Z-0.md) (shared: `azure kubernetes service` · `azure` · `kubernetes`)
- [Secure Service-to-Service Authorization with SpiceDB](https://youtu.be/KpSjLQpswW4) — Kubernetes · 30 views · Jan 27, 2026 · [Details](KpSjLQpswW4.md) (shared: `azure kubernetes service` · `azure` · `kubernetes`)
- [Secure Web App with Azure AD/OAuth2 Proxy](https://youtu.be/rgY4KTMFOMs) — Kubernetes · 49 views · Feb 5, 2026 · [Details](rgY4KTMFOMs.md) (shared: `azure` · `service` · `istio service mesh`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
