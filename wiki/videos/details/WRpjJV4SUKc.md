---
type: video
videoId: WRpjJV4SUKc
category: kubernetes
tags: [cdc, debezium, rabbitmq, outbox]
views: 67
date: 2026-04-05T12:14:36Z
summarized: 2026-04-14T10:21:43.908Z
---

# Architecting Real-Time State

> [kubernetes](../kubernetes.md) · 67 views · Apr 5, 2026
> [Watch on YouTube](https://youtu.be/WRpjJV4SUKc)

## Summary

This video outlines a technical blueprint for architecting real-time state synchronization using Debezium for log-based Change Data Capture (CDC) and RabbitMQ as a message broker within Kubernetes. The session argues that log-based CDC is superior to query-based polling because it captures every state change, including hard deletes, with minimal impact on the source database.

## Key Takeaways

- Log-based CDC via Debezium provides millisecond latency and high-fidelity data capture by reading transaction logs like the Postgres WAL or MySQL binlog, avoiding the performance penalties of traditional polling.
- The Debezium standalone topology enables streaming directly to RabbitMQ, bypassing the operational overhead of managing a Kafka cluster while utilizing RabbitMQ's topic exchanges for flexible wildcard-based routing.
- Stateful management in Kubernetes is critical; Debezium offsets must be stored in persistent volumes to ensure the connector can resume from the exact point in the transaction log after pod restarts.
- To prevent critical system failures, teams must monitor replication slot lag, as a stalled connector can cause transaction logs to accumulate and rapidly exhaust database disk space.
- Downstream consumers must be designed for idempotency to handle Debezium's 'at-least-once' delivery guarantee and prevent data inconsistency during retries.

## Topics Covered

`change data capture (cdc)` · `debezium standalone` · `rabbitmq topic exchange` · `outbox pattern` · `kubernetes persistent volumes` · `replication slot lag` · `write-ahead log` · `distributed tracing`

## Tags

[cdc](../tags/cdc.md) · [debezium](../tags/debezium.md) · [rabbitmq](../tags/rabbitmq.md) · [outbox](../tags/outbox.md)

---
*Auto-generated on Apr 14, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*