---
type: video
videoId: 2ksi8K7wg3I
category: kubernetes
tags: []
views: 13
date: 2026-04-23T22:03:32Z
summarized: 2026-04-25T09:22:00.000Z
---

# Kubernetes 1.36 (Haru)

> [kubernetes](../kubernetes.md) · 13 views · Apr 23, 2026
> [Watch on YouTube](https://youtu.be/2ksi8K7wg3I)

## Summary

This video tours Kubernetes 1.36 (“Haru”) as a platform-engineering release focused on replacing “external glue” with native, in-process control-plane capabilities while preparing clusters for AI-heavy workloads. It highlights three pillars—hardened core security, AI-native dynamic resource allocation, and a networking shift to Gateway API—plus the operational milestones and migrations teams need to plan for 2026.

## Key Takeaways

- Setting `hostUsers: false` (KEP-127, GA) remaps container UID0 to an unprivileged host UID, reducing container-escape blast radius without relying on third-party sandboxes like gVisor.
- In-tree mutation and admission policies via CEL move critical logic into the API server, eliminating webhook network hops and failure modes that can block a cluster during outages.
- Dynamic Resource Allocation (DRA) is positioned as the path off static device plugins, enabling richer device attributes, real-time capacity visibility, and better scheduling for GPUs/FPGAs in ML workloads.
- The Gateway API (v1.4+) is framed as the successor to annotation-heavy ingress-nginx configs, with typed CRDs, clearer role separation, and multi-protocol routing (HTTP/TCP/UDP/gRPC).
- Migrating artifacts to OCI volume sources decouples models/data from “fat images” and comes with breaking changes (e.g., the gitRepo volume driver removal in 1.36).

## Topics Covered

`kubernetes 1.36` · `hostusers user namespaces` · `cel admission policies` · `dynamic resource allocation (dra)` · `gateway api migration` · `ingress-nginx end of life` · `oci volume source` · `control plane scalability`

## Related Videos

- [Kubernetes Cluster Architecture](https://youtu.be/rJTUB-u8U2Y) — Kubernetes · 13 views · Jan 9, 2026 · [Details](rJTUB-u8U2Y.md) (shared: `kubernetes` · `control` · `plane`)
- [The Anatomy of Kubernetes](https://youtu.be/WrZN5AgpaW4) — Kubernetes · 28 views · May 12, 2026 · [Details](WrZN5AgpaW4.md) (shared: `kubernetes` · `api` · `control`)
- [Architecting Kubernetes Operators](https://youtu.be/hvkvH7i8NLc) — Kubernetes · 18 views · May 31, 2026 · [Details](hvkvH7i8NLc.md) (shared: `kubernetes` · `resource` · `api`)
- [Kubernetes v1.37](https://youtu.be/Itjb_eppRG0) — Kubernetes · 139 views · Aug 28, 2026 · [Details](Itjb_eppRG0.md) (shared: `kubernetes` · `admission` · `dra`)
- [Zero-Trust Database Credentials in Kubernetes](https://youtu.be/nBg53bAuc9A) — Kubernetes · 35 views · Sep 2, 2026 · [Details](nBg53bAuc9A.md) (shared: `kubernetes` · `dynamic` · `volume`)

---
*Auto-generated on Apr 25, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
