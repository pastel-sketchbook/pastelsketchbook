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

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
