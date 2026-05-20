---
type: video
videoId: n-Yt33ZdEHw
category: kubernetes
tags: []
views: 62
date: 2026-03-18T23:55:13Z
summarized: 2026-04-16T22:00:00.000Z
---

# The Architecture of Modern Identity

> [kubernetes](../kubernetes.md) · 62 views · Mar 18, 2026
> [Watch on YouTube](https://youtu.be/n-Yt33ZdEHw)

## Summary

This video examines the multi-layered architecture of modern enterprise identity management, covering how Kerberos, SAML, OAuth 2.0, OIDC, and SCIM protocols integrate into a cohesive security framework. It describes a four-layer model: Kerberos as the internal network foundation (Layer 1), SAML/OIDC as the cloud bridge for SSO (Layer 2), OAuth 2.0 for API and microservice security (Layer 3), and SCIM for automated identity lifecycle provisioning (background layer). The goal is balancing robust security with frictionless user experience.

## Key Takeaways

- Kerberos (Layer 1) secures internal network authentication using ticket-based symmetric key cryptography, verifying identities without transmitting passwords across the network.
- SAML and OIDC (Layer 2) extend single sign-on capabilities from on-premises to cloud and web applications, serving as the bridge between internal and external identity.
- OAuth 2.0 (Layer 3) secures API-level access and microservice-to-microservice traffic, operating independently from user-facing authentication.
- SCIM automates the full identity lifecycle (provisioning and deprovisioning) in the background, ensuring that access grants and revocations happen without manual intervention.

## Topics Covered

`kerberos` · `saml` · `oauth 2.0` · `oidc` · `scim` · `identity management` · `single sign-on` · `zero trust`

## Related Videos

- [From Blueprint to Battlefield](https://youtu.be/2kvYb2pVe5o) — Development · 32 views · Dec 27, 2025 · [Details](2kvYb2pVe5o.md) (shared: `oauth 2.0` · `oauth` · `2.0`)
- [Advanced Microservices Blueprint on Azure Kubernetes Service](https://youtu.be/BiYKKVsJROk) — Kubernetes · 21 views · Apr 1, 2026 · [Details](BiYKKVsJROk.md) (shared: `identity` · `zero trust` · `zero`)
- [Securing Service-to-Service Communication in Kubernetes](https://youtu.be/A4-foXsdQiA) — Kubernetes · 23 views · Jan 14, 2026 · [Details](A4-foXsdQiA.md) (shared: `identity` · `zero trust` · `zero`)
- [Architecting Meilisearch on AKS & Istio](https://youtu.be/MIZ0ATwu7C0) — Kubernetes · 27 views · Feb 10, 2026 · [Details](MIZ0ATwu7C0.md) (shared: `zero trust` · `zero` · `trust`)
- [From Stateful to Secure](https://youtu.be/0U-SUJCmKAU) — Kubernetes · 47 views · Jan 16, 2026 · [Details](0U-SUJCmKAU.md) (shared: `zero trust` · `zero` · `trust`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
