---
type: video
videoId: A7eoKD5m6Ek
category: kubernetes
tags: []
views: 9
date: 2026-01-08T08:17:48Z
summarized: 2026-04-16T22:00:00.000Z
---

# Securely Exposing AKS Applications

> [kubernetes](../kubernetes.md) · 9 views · Jan 8, 2026
> [Watch on YouTube](https://youtu.be/A7eoKD5m6Ek)

## Summary

This session provides a defense-in-depth blueprint for securely exposing private Azure Kubernetes Service applications to the public internet. Traffic traverses three distinct security zones (public internet, DMZ, private VNET) with multi-layered inspection including DDoS protection, a public load balancer, WAF, and Application Gateway before reaching the private AKS cluster.

## Key Takeaways

- A three-zone architecture (public internet, DMZ, private VNET) ensures traffic is inspected and filtered at every step before reaching AKS workloads.
- DDoS protection and a public load balancer form the perimeter defense in the untrusted zone for incoming HTTPS traffic.
- Azure Application Gateway with WAF handles the inspection phase in the DMZ, filtering malicious requests before forwarding to the private cluster.
- The private AKS cluster never has direct public exposure; all traffic is proxied through multiple security layers.

## Topics Covered

`aks security` · `defense in depth` · `azure application gateway` · `waf` · `ddos protection` · `private aks cluster`

## Related Videos

- [Secure Web App with Azure AD/OAuth2 Proxy](https://youtu.be/rgY4KTMFOMs) — Kubernetes · 60 views · Feb 5, 2026 · [Details](rgY4KTMFOMs.md) (shared: `aks security` · `aks` · `security`)
- [The Complete Codebase Lifecycle](https://youtu.be/C6wLm6NRZW4) — Kubernetes · 6 views · Jan 14, 2026 · [Details](C6wLm6NRZW4.md) (shared: `aks` · `azure` · `application`)
- [Azure Enterprise Edge Lab](https://youtu.be/fMjflPvjaJ8) — Kubernetes · 9 views · Mar 31, 2026 · [Details](fMjflPvjaJ8.md) (shared: `security` · `azure` · `waf`)
- [ZAP: Getting Started with Software Security Testing](https://youtu.be/infh5ZZwvLU) — Security · 24 views · Apr 30, 2026 · [Details](infh5ZZwvLU.md) (shared: `security` · `defense in depth` · `defense`)
- [Containing the Untrusted Agent](https://youtu.be/CA1nlknmR3g) — Security · 34 views · Mar 25, 2026 · [Details](CA1nlknmR3g.md) (shared: `security` · `defense in depth` · `defense`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
