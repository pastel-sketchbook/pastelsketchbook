---
type: video
videoId: vep9hSKc9I0
category: development
tags: []
views: 103
date: 2026-03-22T10:40:21Z
summarized: 2026-04-16T22:00:00.000Z
---

# Dial9 Demo - Deep Observability in Async Rust

> [development](../development.md) · 103 views · Mar 22, 2026
> [Watch on YouTube](https://youtu.be/vep9hSKc9I0)

## Summary

This video demonstrates deep observability techniques for async Rust applications built on the Tokio and Axum ecosystem, focusing on per-event telemetry to achieve zero-blind-spot tracing. It contrasts aggregate metrics (P99 latency, queue depth) that show *what* is happening but lack root-cause context, with per-event telemetry that captures raw event streams showing exactly *when*, *which tasks*, and *why* delays occur — enabling precise identification of bottlenecks like long polls or slow database queries.

## Key Takeaways

- Aggregate metrics (P99 durations, queue depth) indicate slowness but lose the specific sequence of events needed to diagnose root causes in async systems.
- Per-event telemetry captures raw event streams that trace individual worker states (idle → processing → blocked), revealing exact bottleneck locations.
- Tokio Console provides great debugging insights but is restricted to debug environments, while runtime metrics are production-viable with lower granularity.
- Architecting a robust telemetry stack for Tokio/Axum requires combining multiple approaches: Tokio Console for development, runtime metrics for production, and per-event tracing for deep investigation.

## Topics Covered

`async rust observability` · `tokio tracing` · `axum telemetry` · `per-event telemetry` · `p99 latency debugging` · `zero blind spot tracing`

## Related Videos

- [The Flight Recorder for Tokio](https://youtu.be/lY5TU8qHduM) — Development · 28 views · Mar 20, 2026 · [Details](lY5TU8qHduM.md) (shared: `async` · `rust` · `tokio`)
- [The Rust Architect's Sketchbook](https://youtu.be/7zFqW-ZcEbo) — Development · 93 views · Jan 8, 2026 · [Details](7zFqW-ZcEbo.md) (shared: `async` · `observability` · `tokio`)
- [The Professional Rust Toolbox](https://youtu.be/js95nIDeA-c) — Development · 8 views · Jan 8, 2026 · [Details](js95nIDeA-c.md) (shared: `async` · `rust` · `tokio`)
- [Tokio: The Asynchronous Runtime for Rust](https://youtu.be/0Sed1oggMKY) — Development · 90 views · Feb 8, 2026 · [Details](0Sed1oggMKY.md) (shared: `async` · `rust` · `tokio`)
- [Architecting with Tonic](https://youtu.be/90hw9qwXbbw) — Development · 159 views · May 2, 2026 · [Details](90hw9qwXbbw.md) (shared: `async` · `rust` · `tokio`)

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Architect's Sketchbook](zmd://wiki/books/architects-sketchbook.md) — Chapter 8** (confidence: 33%)_
