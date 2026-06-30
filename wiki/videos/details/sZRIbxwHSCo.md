---
type: video
videoId: sZRIbxwHSCo
category: kubernetes
tags: [aws, messaging, sqs, kinesis]
views: 2
date: 2026-06-10T23:45:04Z
summarized: 2026-06-29T00:30:00.000Z
---

# Engineering High-Performance Distributed Systems with Rust and AWS

> [kubernetes](../kubernetes.md) · 2 views · Jun 10, 2026
> [Watch on YouTube](https://youtu.be/sZRIbxwHSCo)

## Summary

This session evaluates AWS messaging services through native Rust SDK implementations, leveraging Tokio's async runtime, deterministic execution without GC pauses, and lean modular crates. It compares SQS, Kinesis, EventBridge, and Amazon MQ across synchronous and asynchronous communication patterns, then closes with cost optimization (long polling) and the transactional outbox pattern for reliable event publishing.

## Key Takeaways

- The native Rust SDK paradigm delivers deterministic execution, microscopic memory footprints, and lean artifacts via per-service crates compiled only when needed.
- SQS long polling (`wait_time_seconds = 20`) maintains a single persistent TCP session, cutting daily API requests from 86,400 to 4,320 — a ~95% cost reduction.
- Kinesis HTTP/2 Enhanced Fan-Out pushes data to consumers with multiplexing, HPACK compression, and window-update flow control to prevent client memory overflow.
- Amazon MQ separates planes: the AWS SDK handles provisioning only, while wire-level crates (lapin for AMQP, rumqttc for MQTT, stomp-rs) carry data over raw TCP/TLS.
- The transactional outbox pattern atomically commits business data and an outbox event, then a Tokio background worker publishes and marks records sent for at-least-once delivery.

## Topics Covered

`native rust aws sdk` · `tokio async runtime` · `sqs long polling` · `kinesis enhanced fan-out` · `eventbridge choreography` · `amazon mq wire protocols` · `transactional outbox pattern` · `dual write dilemma`

## Tags

[aws](../tags/aws.md) · [messaging](../tags/messaging.md) · [sqs](../tags/sqs.md) · [kinesis](../tags/kinesis.md)

## Related Videos

- [Introducing ExtendDB](https://youtu.be/LxI5YjCUswI) — Kubernetes · 51 views · May 24, 2026 · [Details](LxI5YjCUswI.md) (shared: `native` · `rust` · `wire`)
- [The Professional Rust Toolbox](https://youtu.be/js95nIDeA-c) — Development · 8 views · Jan 8, 2026 · [Details](js95nIDeA-c.md) (shared: `rust` · `tokio async runtime` · `tokio`)
- [Architectural Principles of Fearless Concurrency](https://youtu.be/F59lTcC6xJ0) — Development · 51 views · Mar 28, 2026 · [Details](F59lTcC6xJ0.md) (shared: `rust` · `tokio async runtime` · `tokio`)
- [Tokio: The Asynchronous Runtime for Rust](https://youtu.be/0Sed1oggMKY) — Development · 89 views · Feb 8, 2026 · [Details](0Sed1oggMKY.md) (shared: `rust` · `tokio` · `async`)
- [Architecting with Tonic](https://youtu.be/90hw9qwXbbw) — Development · 153 views · May 2, 2026 · [Details](90hw9qwXbbw.md) (shared: `rust` · `tokio` · `async`)

---
*Auto-generated on Jun 29, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
