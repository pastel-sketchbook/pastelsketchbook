---
type: video
videoId: 4YsX6tYi5x4
category: kubernetes
views: 2
date: 2026-05-06T20:43:06Z
summarized: 2026-05-06T22:19:59.000Z
---

# Istio-Based Weighted Traffic Management on AKS

> [kubernetes](../kubernetes.md) · 2 views · May 6, 2026
> [Watch on YouTube](https://youtu.be/4YsX6tYi5x4)

## Summary

This session presents an architectural blueprint for weighted traffic management on Azure Kubernetes Service using Istio with Envoy proxies at layer 7. It contrasts native Azure tooling like the Standard Load Balancer and Traffic Manager against Istio's application-aware routing, demonstrating precise 80/20 backend splits, deterministic session affinity via cookies, and observability through Kiali and Prometheus for canary, blue/green, and A/B deployment patterns across pod and VM backends.

## Key Takeaways

- Istio operates at layer 7 via Envoy proxies, providing HTTP-aware routing, header and cookie inspection, and declarative real-time control that DNS- and L4-level tools cannot match.
- An exact 80/20 traffic split is enforced through a weight dial for new sessions, while a sticky lock pins returning users to their assigned backend via session cookies.
- Azure Standard Load Balancer is constrained to layer 4 five-tuple hashing, and Azure Traffic Manager is hindered by DNS caching delays, eliminating both for application-aware shaping.
- The architecture supports unified routing across both Kubernetes pod workloads and VM backends within a fully private internal AKS topology.
- Weighted routing enables progressive delivery patterns including canary rollouts, blue/green deployments, A/B testing across user cohorts, and capacity-aware traffic distribution.

## Topics Covered

`istio service mesh` · `weighted traffic shaping` · `azure kubernetes service` · `envoy layer 7 proxies` · `session affinity cookies` · `canary blue green deployments` · `pod and vm backends` · `kiali prometheus observability`

## Related Videos

- [Strategic Implementation of Blue-Green Deployment](https://youtu.be/Hd767VA7Z-0) — Kubernetes · 13 views · Mar 10, 2026 · [Details](Hd767VA7Z-0.md) (shared: `istio service mesh` · `istio` · `service`)
- [Architecting Meilisearch on AKS & Istio](https://youtu.be/MIZ0ATwu7C0) — Kubernetes · 26 views · Feb 10, 2026 · [Details](MIZ0ATwu7C0.md) (shared: `istio service mesh` · `istio` · `service`)
- [K8s Services  AKS & Istio](https://youtu.be/C5HqbzLRYZ0) — Kubernetes · 14 views · Jan 10, 2026 · [Details](C5HqbzLRYZ0.md) (shared: `istio service mesh` · `istio` · `service`)
- [Kubernetes Services & Istio](https://youtu.be/OnwiaDRj1-k) — Kubernetes · 30 views · Jan 12, 2026 · [Details](OnwiaDRj1-k.md) (shared: `istio service mesh` · `istio` · `service`)
- [Secure Web App with Azure AD/OAuth2 Proxy](https://youtu.be/rgY4KTMFOMs) — Kubernetes · 51 views · Feb 5, 2026 · [Details](rgY4KTMFOMs.md) (shared: `istio service mesh` · `istio` · `service`)

---
*Auto-generated on May 6, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
