---
type: video
videoId: lY5TU8qHduM
category: development
tags: []
views: 23
date: 2026-03-20T22:45:15Z
summarized: 2026-04-16T22:00:00.000Z
---

# The Flight Recorder for Tokio

> [development](../development.md) · 23 views · Mar 20, 2026
> [Watch on YouTube](https://youtu.be/lY5TU8qHduM)

## Summary

This video introduces a flight-recorder-style telemetry system for the Tokio async runtime in Rust, designed to debug subtle latency issues that aggregate metrics miss. It presents a real case study where a Rust component managing thousands of host connections hit a performance cliff at exactly 90% CPU—worker threads appeared idle while task queues overflowed. The solution uses Dial 9 telemetry to capture continuous, time-ordered event streams that reveal the causal sequence behind failures.

## Key Takeaways

- Aggregate metrics act like a "blender" that masks the timeline of events; flight-recorder-style telemetry preserves the exact sequence needed to diagnose concurrency bugs.
- The case study demonstrates a contradictory scenario where Tokio worker threads reported idle while task queues overflowed at 90% CPU utilization, a bug invisible to standard monitoring.
- The flight recorder captures continuous telemetry across a precise time axis, analogous to an aircraft black box, enabling developers to replay the exact sequence of events leading to a failure.
- Standard counters and gauges signal that a system is failing but lack the granularity to show why; ordered event streams are essential for debugging async runtime behavior in Tokio.

## Topics Covered

`tokio runtime` · `rust` · `latency debugging` · `flight recorder telemetry` · `async concurrency` · `dial 9 telemetry`

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
