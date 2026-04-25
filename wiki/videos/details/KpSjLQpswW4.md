---
type: video
videoId: KpSjLQpswW4
category: kubernetes
tags: []
views: 29
date: 2026-01-27T11:21:16Z
summarized: 2026-04-16T22:00:00.000Z
---

# Secure Service-to-Service Authorization with SpiceDB

> [kubernetes](../kubernetes.md) · 29 views · Jan 27, 2026
> [Watch on YouTube](https://youtu.be/KpSjLQpswW4)

## Summary

This video presents an architectural framework for implementing relationship-based access control (ReBAC) using SpiceDB within Azure Kubernetes Service, replacing traditional RBAC which suffers from role explosion at scale. SpiceDB uses graph-based logic where permissions are computed from actual entity relationships, enabling transitive permission inheritance for complex structures like group memberships and nested hierarchies. The framework is built on zero-trust principles with every service interaction verified and authorized.

## Key Takeaways

- Traditional RBAC suffers from role explosion at scale — static roles cannot adapt to dynamic operational contexts, causing data duplication, security drift, and fragility in ephemeral AKS environments.
- SpiceDB implements Relationship-Based Access Control (ReBAC) using graph-based logic where permissions are computed from actual entity relationships rather than static role assignments.
- ReBAC enables transitive permission inheritance, naturally handling complex structures like nested group memberships and organizational hierarchies that RBAC struggles with.
- The architecture is built on zero-trust principles where every service-to-service interaction in the AKS cluster is verified and authorized through SpiceDB policy evaluation.

## Topics Covered

`spicedb` · `relationship-based access control` · `azure kubernetes service` · `zero trust` · `authorization` · `rbac vs rebac` · `graph-based permissions`

## Related Videos

- [Architecting Meilisearch on AKS & Istio](https://youtu.be/MIZ0ATwu7C0) — Kubernetes · 26 views · Feb 10, 2026 · [Details](MIZ0ATwu7C0.md) (shared: `azure kubernetes service` · `azure` · `kubernetes`)
- [Securing Service-to-Service Communication in Kubernetes](https://youtu.be/A4-foXsdQiA) — Kubernetes · 23 views · Jan 14, 2026 · [Details](A4-foXsdQiA.md) (shared: `kubernetes` · `service` · `zero trust`)
- [The Blueprint for Enterprise AI on Azure](https://youtu.be/8ycnldvJmuA) — Kubernetes · 18 views · Jan 2, 2026 · [Details](8ycnldvJmuA.md) (shared: `azure kubernetes service` · `azure` · `kubernetes`)
- [From Stateful to Secure](https://youtu.be/0U-SUJCmKAU) — Kubernetes · 46 views · Jan 16, 2026 · [Details](0U-SUJCmKAU.md) (shared: `kubernetes` · `zero trust` · `zero`)
- [Choosing Your Messaging Fabric on AKS](https://youtu.be/N4nRAfBZ3BE) — Kubernetes · 5 views · Jan 10, 2026 · [Details](N4nRAfBZ3BE.md) (shared: `azure kubernetes service` · `azure` · `kubernetes`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
