---
type: video
videoId: JKXsba2_TgY
category: kubernetes
tags: [cdc, deployment]
views: 11
date: 2026-10-15T23:00:19Z
summarized: 2026-10-18T08:25:00.000Z
---

# Architecting CDC Pipelines

> [kubernetes](../kubernetes.md) · 11 views · Oct 15, 2026
> [Watch on YouTube](https://youtu.be/JKXsba2_TgY)

## Summary

This session architects change data capture pipelines that capture row-level database changes in real time and stream them into RabbitMQ through Debezium, weighing Kafka Connect against Debezium Server. It frames the decision space from infrastructure models — bare metal, virtual machines, Kubernetes, and fully managed brokers — through TCO crossover points, developer velocity, operational toil percentages, storage tiers, and failure domains, then closes on three principles: simplify the stack, respect network topology, and evolve from local parity to production scale deliberately.

## Key Takeaways

- Bypass the Kafka Connect tax by running Debezium Server to push change events directly into RabbitMQ quorum queues, shrinking operations from half to two-plus FTEs of cluster management to a single standalone component.
- Pick infrastructure by the TCO crossover: managed cloud wins at low utilization by compressing ops overhead, while Kubernetes and bare metal win beyond enterprise scale where egress, IOPS, and compounding costs turn cloud pricing punitive.
- Count the operational toil by model: roughly 100 percent manual on bare metal, 70 percent on virtual machines, 40 percent on Kubernetes, and 10 percent on managed services that own hardware, host patching, and baseline high availability.
- Match the storage layer to write-intensive CDC: network block storage like EBS or SAN is the production default, NFS and EFS file shares are disqualified by latency profiles and locking constraints, and object storage is for backups and archival tiers only.
- Apply the three closing principles: cut Kafka out of the middle where throughput allows, keep RabbitMQ cluster members in the same rack or availability zone because WAN clustering degrades under partition, and validate with Docker Compose or minikube before scaling out with Kubernetes operators.

## Topics Covered

`change data capture architecture` · `debezium server vs kafka connect` · `rabbitmq quorum queues` · `infrastructure tco crossover` · `operational toil comparison` · `storage tier selection` · `failure domain scaling` · `local parity to production`

## Tags

[cdc](../tags/cdc.md) · [deployment](../tags/deployment.md)

## Related Videos

- [Mastering Hybrid CDC Architectures](https://youtu.be/KdLQEv3Tiiw) — Kubernetes · 27 views · Apr 7, 2026 · [Details](KdLQEv3Tiiw.md) (shared: `change` · `data` · `capture`)
- [The Blueprint of Distributed Consensus](https://youtu.be/elpnbTmiuCs) — Kubernetes · 52 views · Sep 11, 2026 · [Details](elpnbTmiuCs.md) (shared: `kafka` · `rabbitmq quorum queues` · `rabbitmq`)
- [The 2026 Architectural Standard](https://youtu.be/WHonjixQgBY) — Kubernetes · 54 views · Jan 31, 2026 · [Details](WHonjixQgBY.md) (shared: `data` · `architecture` · `infrastructure`)
- [Architecting Real-Time State](https://youtu.be/WRpjJV4SUKc) — Kubernetes · 78 views · Apr 5, 2026 · [Details](WRpjJV4SUKc.md) (shared: `change` · `data` · `capture`)
- [Continuous Flow](https://youtu.be/tcrNdx1yH_E) — Kubernetes · 15 views · Mar 22, 2026 · [Details](tcrNdx1yH_E.md) (shared: `change` · `data` · `capture`)

---
*Auto-generated on Oct 18, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
