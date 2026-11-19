---
type: video
videoId: HNZ_A1B_kTg
category: development
tags: [idp, fire and forget, outbox, inbox]
views: 15
date: 2026-11-16T00:00:19Z
summarized: 2026-11-19T08:20:00.000Z
---

# Architecting Reliable Asynchronous Microservices

> [development](../development.md) · 15 views · Nov 16, 2026
> [Watch on YouTube](https://youtu.be/HNZ_A1B_kTg)

## Summary

This session is a field guide to end-to-end exactly-once processing in asynchronous microservices via the transactional outbox and inbox patterns. It establishes fire-and-forget decoupling and its four pillars, dissects the dual-write failure, builds the outbox with atomic business+event commits and relay strategies (polling vs Debezium CDC), confronts at-least-once duplicate delivery with the inbox deduplication lifecycle, combines both patterns with CDC into a Kafka pipeline, standardizes the message envelope (UUID, correlation ID, type, ISO timestamp, payload), and closes with the operational tradeoffs and five core principles.

## Key Takeaways

- Default to fire-and-forget for side effects: publishing to Kafka/RabbitMQ returns immediately after durable enqueue, decoupling producers from consumers across loose coupling, independent scaling, fault isolation (no cascade to upstream threads), and fast user responses — reserve synchronous calls for queries needing immediate consistency.
- Recognize the dual-write trap: committing business state to the database and then publishing to the broker can fail independently — the transaction cannot roll back after the event drops, permanently fracturing downstream consistency; no distributed transaction required, just compose at-least-once delivery with idempotent consumption.
- Write the outbox atomically: within one local ACID transaction, insert the business row and the serialized event payload into an outbox table — both commit or both roll back, eliminating the dual-write window; an independent relay then publishes unpublished rows and marks/deletes them after broker acknowledgement.
- Pick the relay strategy deliberately: polling is simple and code-native but adds query overhead, connection contention, and latency tied to the interval; change data capture (Debezium tailing Postgres WAL / MySQL binlog into Kafka) gives near-instant delivery with zero query load at the cost of connector infrastructure.
- Make consumers idempotent with the inbox: on at-least-once redelivery (consumer crash before ack), check the inbox table for the message ID inside the same transaction as the business mutation, insert the ID alongside the state change, then commit before acknowledging — duplicates hit the check and are discarded without re-executing side effects.
- Compose the full pipeline: outbox + CDC + inbox yields exactly-once business semantics without two-phase commit — atomic producer writes, log-tailing publication, and transactional deduplicated consumption.
- Standardize the envelope and operate the system: every event carries a producer-generated UUID (idempotency key), correlation ID (end-to-end tracing), event-type routing string, ISO 8601 real-world timestamp, and immutable payload; accept eventual consistency in UIs, TTL-clean inbox/outbox tables (e.g. 7 days), and alert on outbox/consumer lag with dead-letter queues — the five principles being fire-and-forget default, outbox on write, inbox on read, standardized metadata, and active monitoring.

## Topics Covered

`fire and forget decoupling` · `dual write failure` · `transactional outbox` · `polling vs debezium cdc` · `at least once delivery` · `transactional inbox idempotency` · `exactly once business semantics` · `event envelope and pipeline monitoring`

## Tags

[idp](../tags/idp.md) · [fire and forget](../tags/fire%20and%20forget.md) · [outbox](../tags/outbox.md) · [inbox](../tags/inbox.md)

## Related Videos

- [Architecting Intelligence](https://youtu.be/BCBRMUO54p8) — Development · 14 views · Jul 24, 2026 · [Details](BCBRMUO54p8.md) (shared: `transactional` · `debezium` · `cdc`)
- [The Modern Delivery Flywheel](https://youtu.be/B2x09utLjtM) — Development · 9 views · Jan 9, 2026 · [Details](B2x09utLjtM.md) (shared: `delivery` · `pipeline`)
- [Emulating the Server Push](https://youtu.be/wZC8NL32yfg) — Development · 17 views · Apr 19, 2026 · [Details](wZC8NL32yfg.md) (shared: `polling` · `event`)
- [AX: The Distributed Agent Runtime](https://youtu.be/xiTVDbJscik) — Development · 97 views · May 23, 2026 · [Details](xiTVDbJscik.md) (shared: `semantics` · `event`)
- [Engineering High-Performance Distributed Systems with Rust and AWS](https://youtu.be/sZRIbxwHSCo) — Kubernetes · 24 views · Jun 10, 2026 · [Details](sZRIbxwHSCo.md) (shared: `dual` · `write` · `transactional`)

---
*Auto-generated on Nov 19, 2026. Back to [development](../development.md) · [index](../index.md).*
