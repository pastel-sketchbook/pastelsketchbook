---
type: video
videoId: y3WwL48DLYw
category: kubernetes
tags: [kubernetes, autoscaling, hpa, vpa]
views: 29
date: 2026-02-24T05:06:42Z
summarized: 2026-04-16T22:00:00.000Z
---

# Kubernetes Auto-Scaling Strategies

> [kubernetes](../kubernetes.md) · 29 views · Feb 24, 2026
> [Watch on YouTube](https://youtu.be/y3WwL48DLYw)

## Summary

This video explores Kubernetes autoscaling strategies across two dimensions: Horizontal Pod Autoscaler (HPA) for scaling out replica counts during traffic bursts, and Vertical Pod Autoscaler (VPA) for scaling up CPU/RAM on individual pods for stateful workloads. It advances into logic-based configurations using KQ for programmatic control over scaling decisions, moving beyond basic metric-threshold automation toward architected scaling approaches.

## Key Takeaways

- HPA scales out by adding replicas based on observed metrics like CPU utilization, ideal for stateless web servers handling traffic bursts.
- VPA scales up by increasing CPU and RAM allocations on individual pods, preferred for stateful databases and monoliths.
- KQ enables logic-based autoscaling configurations that provide programmatic precision beyond simple metric thresholds.
- The two scaling dimensions (horizontal and vertical) address fundamentally different workload types and should be selected accordingly.

## Topics Covered

`horizontal pod autoscaler` · `vertical pod autoscaler` · `kq programmatic scaling` · `kubernetes resource management` · `stateless vs stateful scaling`

## Related Videos

- [Kubernetes Cluster Architecture](https://youtu.be/rJTUB-u8U2Y) — Kubernetes · 12 views · Jan 9, 2026 · [Details](rJTUB-u8U2Y.md) (shared: `pod` · `kubernetes`)
- [K8s Services  AKS & Istio](https://youtu.be/C5HqbzLRYZ0) — Kubernetes · 14 views · Jan 10, 2026 · [Details](C5HqbzLRYZ0.md) (shared: `kubernetes` · `management`)
- [From Stateful to Secure](https://youtu.be/0U-SUJCmKAU) — Kubernetes · 46 views · Jan 16, 2026 · [Details](0U-SUJCmKAU.md) (shared: `kubernetes` · `stateful`)
- [Kubernetes Services & Istio](https://youtu.be/OnwiaDRj1-k) — Kubernetes · 30 views · Jan 12, 2026 · [Details](OnwiaDRj1-k.md) (shared: `kubernetes` · `management`)
- [Strategic Implementation of Blue-Green Deployment](https://youtu.be/Hd767VA7Z-0) — Kubernetes · 13 views · Mar 10, 2026 · [Details](Hd767VA7Z-0.md) (shared: `kubernetes` · `management`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
