---
type: video
videoId: KdLQEv3Tiiw
category: kubernetes
tags: []
views: 14
date: 2026-04-08T02:45:20Z
summarized: 2026-04-16T22:00:00.000Z
---

# Mastering Hybrid CDC Architectures

> [kubernetes](../kubernetes.md) · 14 views · Apr 8, 2026
> [Watch on YouTube](https://youtu.be/KdLQEv3Tiiw)

## Summary

This video covers hybrid Change Data Capture (CDC) architectures using Debezium to stream events from on-premises SQL Server through RabbitMQ into a cloud-based Kubernetes cluster. The architecture spans three zones: on-premises SQL Server source, a hybrid low-latency network bridge, and a cloud Kubernetes cluster with persistent storage. The presentation provides deep dives into Kubernetes stateful storage (PersistentVolumeClaims, PersistentVolumes) and how they decouple compute from data to maintain state across pod restarts.

## Key Takeaways

- Debezium captures every insert, update, and delete event from SQL Server database logs and streams them through RabbitMQ for downstream consumption in a Kubernetes cluster.
- The architecture spans three zones: on-premises SQL Server (zone 1), hybrid low-latency network bridge (zone 2), and cloud Kubernetes cluster with persistent storage (zone 3).
- Kubernetes PersistentVolumeClaims (PVCs) decouple compute from data, allowing pods to restart without losing CDC engine state.
- The hybrid bridge between on-premises and cloud must be designed for low latency and secure transmission to maintain real-time data streaming fidelity.

## Topics Covered

`change data capture` · `debezium` · `rabbitmq` · `kubernetes persistent storage` · `hybrid cloud architecture` · `sql server cdc` · `stateful workloads`

## Related Videos

- [From Stateful to Secure](https://youtu.be/0U-SUJCmKAU) — Kubernetes · 47 views · Jan 16, 2026 · [Details](0U-SUJCmKAU.md) (shared: `rabbitmq` · `kubernetes` · `persistent`)
- [Architecting Real-Time State](https://youtu.be/WRpjJV4SUKc) — Kubernetes · 75 views · Apr 5, 2026 · [Details](WRpjJV4SUKc.md) (shared: `change data capture` · `change` · `data`)
- [Continuous Flow](https://youtu.be/tcrNdx1yH_E) — Kubernetes · 15 views · Mar 22, 2026 · [Details](tcrNdx1yH_E.md) (shared: `change data capture` · `change` · `data`)
- [The 2026 Change Data Capture Blueprint](https://youtu.be/am9FvNiJ24M) — Development · 30 views · Apr 8, 2026 · [Details](am9FvNiJ24M.md) (shared: `change data capture` · `change` · `data`)
- [Consuming CDC with ScyllaDB](https://youtu.be/nomIVRSBEG4) — Kubernetes · 76 views · Apr 17, 2026 · [Details](nomIVRSBEG4.md) (shared: `change data capture` · `change` · `data`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
