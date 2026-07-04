---
type: video
videoId: rgY4KTMFOMs
category: kubernetes
tags: []
views: 40
date: 2026-02-05T14:29:16Z
summarized: 2026-04-16T22:00:00.000Z
---

# Secure Web App with Azure AD/OAuth2 Proxy

> [kubernetes](../kubernetes.md) · 40 views · Feb 05, 2026
> [Watch on YouTube](https://youtu.be/rgY4KTMFOMs)

## Summary

This video is a technical case study on implementing Azure AD and OAuth2 Proxy authentication for a Bun/TypeScript application deployed on AKS, transitioning from open access to a zero-trust architecture. The two-layer security model uses OAuth2 Proxy combined with Azure AD authentication at the ingress, with Istio as the service mesh for traffic routing. Access is restricted to members of a specific Azure AD group, replacing network-level trust with identity-level trust.

## Key Takeaways

- The migration from open access to zero trust implements two-layer security: OAuth2 Proxy at ingress combined with Azure AD authentication.
- Access is governed through Azure AD group enforcement, restricting the application to specific authorized group members only.
- Istio service mesh handles traffic routing with precision while Azure Workload Identity eliminates stored secrets for service authentication.
- The application is built on Bun with TypeScript, deployed on AKS with the security layer operating entirely at the infrastructure level.

## Topics Covered

`azure ad authentication` · `oauth2 proxy` · `zero trust architecture` · `aks security` · `istio service mesh` · `workload identity`

## Related Videos

- [Zero Trust in Kubernetes](https://youtu.be/4b-H6ZaoNUE) — Kubernetes · 46 views · Jan 17, 2026 · [Details](4b-H6ZaoNUE.md) (shared: `zero` · `trust` · `security`)
- [Advanced Microservices Blueprint on Azure Kubernetes Service](https://youtu.be/BiYKKVsJROk) — Kubernetes · 23 views · Apr 1, 2026 · [Details](BiYKKVsJROk.md) (shared: `zero` · `trust` · `aks`)
- [Architecting Meilisearch on AKS & Istio](https://youtu.be/MIZ0ATwu7C0) — Kubernetes · 27 views · Feb 10, 2026 · [Details](MIZ0ATwu7C0.md) (shared: `azure` · `zero` · `trust`)
- [Securing Service-to-Service Communication in Kubernetes](https://youtu.be/A4-foXsdQiA) — Kubernetes · 23 views · Jan 14, 2026 · [Details](A4-foXsdQiA.md) (shared: `zero` · `trust` · `security`)
- [K8s Services  AKS & Istio](https://youtu.be/C5HqbzLRYZ0) — Kubernetes · 16 views · Jan 10, 2026 · [Details](C5HqbzLRYZ0.md) (shared: `aks` · `istio service mesh` · `istio`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Architect's Sketchbook](zmd://wiki/books/architects-sketchbook.md) — Chapter 5** (confidence: 43%)_
