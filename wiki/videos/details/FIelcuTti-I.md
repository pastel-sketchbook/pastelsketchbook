---
type: video
videoId: FIelcuTti-I
category: development
tags: [rust, extenddb, cdc, nats]
views: 18
date: 2026-05-26T06:05:16Z
summarized: 2026-05-28T23:48:00.000Z
---

# Local Change Data Capture at Scale

> [development](../development.md) · 18 views · May 26, 2026
> [Watch on YouTube](https://youtu.be/FIelcuTti-I)

## Summary

This architecture decision record describes a zero-dependency, fully observable change data capture pipeline that runs entirely in Docker Compose using ExtendDB as a DynamoDB-compatible Postgres adapter and NATS as the event bus. A three-layer runtime — DynamoDB-compatible API, a background poller that wraps stream records into CloudEvents with trace context, and a NATS publisher — delivers every mutation to downstream consumers in real time while preserving 100% AWS SDK compatibility.

## Key Takeaways

- The stack runs locally with zero cloud dependency yet stays byte-compatible with real AWS DynamoDB so SDK code transitions unchanged to production.
- Running locally eliminates network latency and eventual-consistency surprises, enabling deterministic CDC testing on every developer machine.
- A pull topology is mandatory because DynamoDB Streams do not support push or webhooks, so consumers must continuously call `GetRecords` per shard iterator.
- A single Tokio-spawned poller loop ticks every ~1000ms, iterates active shards, wraps records into CloudEvents, and forwards them to NATS for downstream fan-out.
- Shared `Arc<AppState>` provides connection pooling and immutable configuration across the API, poller, and event-bus layers for consistency and observability.
- Mapping the poller pattern to AWS Lambda's stream trigger model keeps the local and cloud execution semantics identical.

## Topics Covered

`change data capture` · `dynamodb streams compatibility` · `nats event bus` · `cloudevents wrapping` · `tokio polling loop` · `arc app state sharing` · `local-first observability` · `pull-based stream consumption`

## Tags

[rust](../tags/rust.md) · [extenddb](../tags/extenddb.md) · [cdc](../tags/cdc.md) · [nats](../tags/nats.md)

## Related Videos

- [The 2026 Change Data Capture Blueprint](https://youtu.be/am9FvNiJ24M) — Development · 32 views · Apr 8, 2026 · [Details](am9FvNiJ24M.md) (shared: `change data capture` · `change` · `data`)
- [Consuming CDC with ScyllaDB](https://youtu.be/nomIVRSBEG4) — Kubernetes · 77 views · Apr 17, 2026 · [Details](nomIVRSBEG4.md) (shared: `change data capture` · `change` · `data`)
- [Emulating the Server Push](https://youtu.be/wZC8NL32yfg) — Development · 17 views · Apr 19, 2026 · [Details](wZC8NL32yfg.md) (shared: `compatibility` · `event` · `polling`)
- [Continuous Flow](https://youtu.be/tcrNdx1yH_E) — Kubernetes · 15 views · Mar 22, 2026 · [Details](tcrNdx1yH_E.md) (shared: `change data capture` · `change` · `data`)
- [The Rust Architect's Sketchbook](https://youtu.be/7zFqW-ZcEbo) — Development · 93 views · Jan 8, 2026 · [Details](7zFqW-ZcEbo.md) (shared: `data` · `tokio` · `observability`)

---
*Auto-generated on May 28, 2026. Back to [development](../development.md) · [index](../index.md).*
