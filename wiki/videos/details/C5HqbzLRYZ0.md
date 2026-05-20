---
type: video
videoId: C5HqbzLRYZ0
category: kubernetes
tags: []
views: 12
date: 2026-01-10T16:26:22Z
summarized: 2026-04-16T22:00:00.000Z
---

# K8s Services  AKS & Istio

> [kubernetes](../kubernetes.md) · 12 views · Jan 10, 2026
> [Watch on YouTube](https://youtu.be/C5HqbzLRYZ0)

## Summary

This video explains the four standard Kubernetes service types (ClusterIP, NodePort, LoadBalancer, ExternalName) and how their role fundamentally changes when Istio service mesh is introduced on Azure Kubernetes Service. It walks through the progression from basic pod-to-pod discovery problems to sophisticated mesh-based traffic management with mTLS.

## Key Takeaways

- Kubernetes services provide stable addressing for ephemeral pods whose IP addresses constantly change as they are created and destroyed.
- ClusterIP (default) provides internal-only addressing, NodePort exposes on every node, LoadBalancer provisions cloud infrastructure, and ExternalName maps to DNS.
- Istio service mesh transforms the role of Kubernetes services by handling mTLS, traffic management, and observability at the infrastructure layer.
- The combination of AKS and Istio moves security and routing logic out of application code into sidecar proxies managed by the mesh.

## Topics Covered

`kubernetes services` · `clusterip` · `istio service mesh` · `aks` · `service discovery` · `mtls` · `traffic management`

## Related Videos

- [Kubernetes Services & Istio](https://youtu.be/OnwiaDRj1-k) — Kubernetes · 30 views · Jan 12, 2026 · [Details](OnwiaDRj1-k.md) (shared: `kubernetes services` · `kubernetes` · `services`)
- [Strategic Implementation of Blue-Green Deployment](https://youtu.be/Hd767VA7Z-0) — Kubernetes · 13 views · Mar 10, 2026 · [Details](Hd767VA7Z-0.md) (shared: `kubernetes` · `istio service mesh` · `istio`)
- [Architecting Meilisearch on AKS & Istio](https://youtu.be/MIZ0ATwu7C0) — Kubernetes · 27 views · Feb 10, 2026 · [Details](MIZ0ATwu7C0.md) (shared: `kubernetes` · `istio service mesh` · `istio`)
- [Advanced Microservices Blueprint on Azure Kubernetes Service](https://youtu.be/BiYKKVsJROk) — Kubernetes · 21 views · Apr 1, 2026 · [Details](BiYKKVsJROk.md) (shared: `istio service mesh` · `istio` · `service`)
- [Secure Web App with Azure AD/OAuth2 Proxy](https://youtu.be/rgY4KTMFOMs) — Kubernetes · 51 views · Feb 5, 2026 · [Details](rgY4KTMFOMs.md) (shared: `istio service mesh` · `istio` · `service`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
