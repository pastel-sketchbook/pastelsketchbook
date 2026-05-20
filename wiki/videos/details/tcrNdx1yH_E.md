---
type: video
videoId: tcrNdx1yH_E
category: kubernetes
tags: []
views: 15
date: 2026-03-22T14:47:34Z
summarized: 2026-04-16T22:00:00.000Z
---

# Continuous Flow

> [kubernetes](../kubernetes.md) · 15 views · Mar 22, 2026
> [Watch on YouTube](https://youtu.be/tcrNdx1yH_E)

## Summary

This video presents an architecture for streaming change events from Azure SQL Managed Instance to Azure Event Hubs, replacing traditional polling-based ETL with real-time event-driven data propagation. It explains the event-driven decoupler pattern for breaking down monolithic applications, eliminating the latency, dual-write complexity, and high database overhead inherent in polling mechanisms. The architecture enables downstream consumers to react immediately to database changes through a scalable Event Hubs buffer.

## Key Takeaways

- Traditional polling creates heavy ETL overhead, dual-write complexity, and inherent latency since data freshness is limited to the polling interval.
- Azure SQL Managed Instance's change event streaming pushes data changes in real time to Azure Event Hubs, eliminating the need for periodic database queries.
- The event-driven decoupler pattern breaks monolithic applications into loosely coupled components that communicate through change events rather than direct database access.
- Azure Event Hubs acts as a scalable buffer between the source database and downstream consumers, ensuring the entire ecosystem stays synchronized in near real-time.

## Topics Covered

`change data capture` · `azure event hubs` · `azure sql managed instance` · `event-driven architecture` · `real-time streaming` · `etl replacement`

## Related Videos

- [Choosing Your Messaging Fabric on AKS](https://youtu.be/N4nRAfBZ3BE) — Kubernetes · 5 views · Jan 10, 2026 · [Details](N4nRAfBZ3BE.md) (shared: `azure event hubs` · `azure` · `event`)
- [The Two-System Pattern](https://youtu.be/VxWyvAO3qb8) — Kubernetes · 14 views · Jan 15, 2026 · [Details](VxWyvAO3qb8.md) (shared: `azure event hubs` · `azure` · `event`)
- [Mastering Hybrid CDC Architectures](https://youtu.be/KdLQEv3Tiiw) — Kubernetes · 21 views · Apr 7, 2026 · [Details](KdLQEv3Tiiw.md) (shared: `change data capture` · `change` · `data`)
- [Drasi: The Future of Change-Driven Architecture](https://youtu.be/5Ztm7JNVa8E) — Kubernetes · 51 views · Feb 17, 2026 · [Details](5Ztm7JNVa8E.md) (shared: `data` · `event-driven architecture` · `event-driven`)
- [The 2026 Change Data Capture Blueprint](https://youtu.be/am9FvNiJ24M) — Development · 30 views · Apr 8, 2026 · [Details](am9FvNiJ24M.md) (shared: `change data capture` · `change` · `data`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
