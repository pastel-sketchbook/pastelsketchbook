---
type: video
videoId: mYClRFIlsFc
category: kubernetes
tags: []
views: 13
date: 2026-02-19T13:31:03Z
summarized: 2026-04-16T22:00:00.000Z
---

# ScyllaDB: The Next-Generation NoSQL Platform

> [kubernetes](../kubernetes.md) · 13 views · Feb 19, 2026
> [Watch on YouTube](https://youtu.be/mYClRFIlsFc)

## Summary

This technical deep dive covers ScyllaDB, a high-performance NoSQL database built in C++ on a shard-per-core architecture that provides API compatibility with Apache Cassandra (CQL) and DynamoDB (Alternator). By eliminating JVM overhead and garbage collection pauses, ScyllaDB delivers millions of operations per second with predictable single-digit millisecond latency. The video examines the connection state paradox at 10M+ concurrent connections and how ScyllaDB's shared-nothing architecture addresses real-time application demands.

## Key Takeaways

- ScyllaDB's shard-per-core architecture in C++ eliminates JVM garbage collection pauses, delivering 10x higher throughput than Java-based alternatives like Cassandra with predictable single-digit millisecond latency.
- Full API compatibility with Apache Cassandra (CQL) and Amazon DynamoDB (via Alternator) enables drop-in adoption for teams already using these protocols.
- The shared-nothing model assigns each CPU core its own shard of data, eliminating cross-core contention and enabling efficient utilization of modern multi-core processors.
- Real-time applications like mobile chat face a "connection state paradox" at 10M+ concurrent connections that ScyllaDB's architecture is specifically designed to handle.

## Topics Covered

`scylladb` · `shard-per-core` · `nosql` · `apache cassandra` · `dynamodb compatibility` · `c++ database` · `real-time applications`

## Related Videos

- [Drasi: The Future of Change-Driven Architecture](https://youtu.be/5Ztm7JNVa8E) — Kubernetes · 51 views · Feb 17, 2026 · [Details](5Ztm7JNVa8E.md) (shared: `real-time`)
- [The 2026 Architectural Standard](https://youtu.be/WHonjixQgBY) — Kubernetes · 54 views · Jan 31, 2026 · [Details](WHonjixQgBY.md) (shared: `database`)
- [Kubernetes Version Upgrade Strategy](https://youtu.be/ftODZr2_V5Q) — Kubernetes · 29 views · Dec 26, 2025 · [Details](ftODZr2_V5Q.md) (shared: `compatibility`)
- [The Cloud Rosetta Stone](https://youtu.be/PMgUhFxrjPc) — Kubernetes · 23 views · Apr 18, 2026 · [Details](PMgUhFxrjPc.md) (shared: `database`)
- [Continuous Flow](https://youtu.be/tcrNdx1yH_E) — Kubernetes · 15 views · Mar 22, 2026 · [Details](tcrNdx1yH_E.md) (shared: `real-time`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
