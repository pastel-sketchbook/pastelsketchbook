---
type: video
videoId: AbCc2yfz2uw
category: development
tags: [rust, iceoryx2, zenoh, crossflow, bevy]
views: 1
date: 2026-06-30T22:01:56Z
summarized: 2026-06-30T22:07:52.000Z
---

# RB Simulation Architecture

> [development](../development.md) · 1 views · Jun 30, 2026
> [Watch on YouTube](https://youtu.be/AbCc2yfz2uw)

## Summary

RB Simulation is a process-decomposed, deterministic robotics architecture in Rust built around strict decoupling of domain logic from transport, rendering, and telemetry. An isolated Sim core owns all state and physics, exposing data outward through a node-facade to swappable middleware backends — Iceoryx2 for zero-copy local IPC, Zenoh for networked pub/sub, and Crossflow for sense-plan-act orchestration.

## Key Takeaways

- A single isolated Sim core owns simulation state and physics, and all consumers act strictly as subscribers, preventing state corruption and guaranteeing determinism.
- A node-backend facade isolates business logic from middleware APIs, letting the same node code switch between in-process, Iceoryx2, and Zenoh transports without any change to domain logic.
- Fixed-size POD messages establish a canonical topology where robot identity is carried in the state's `.id` field rather than the topic name, enabling dynamic discovery and richer visualization.
- Bevy is used purely as a passive renderer, decoupled from the physics engine, allowing multiple visualizers to observe the same simulation state simultaneously.
- Trace IDs are kept as raw UUIDv7 bytes inside robot state to preserve zero-copy POD safety, with decoding deferred to the OpenTelemetry export boundary to minimize simulation overhead.

## Topics Covered

`deterministic robotics simulation` · `process decomposed architecture` · `zero-copy local ipc` · `swappable middleware backends` · `sense plan act loop` · `pod message topology` · `rust robotics rust` · `decoupled visualization telemetry`

## Tags

[rust](../tags/rust.md) · [iceoryx2](../tags/iceoryx2.md) · [zenoh](../tags/zenoh.md) · [crossflow](../tags/crossflow.md) · [bevy](../tags/bevy.md)

## Related Videos

- [The Anatomy of a Modern Robot](https://youtu.be/7ygjuzLkdTE) — Development · 41 views · Jun 24, 2026 · [Details](7ygjuzLkdTE.md) (shared: `robotics` · `architecture` · `zero-copy`)
- [The Rust Robotics Paradigm](https://youtu.be/gPnrk5TNKWg) — Development · 26 views · Jun 27, 2026 · [Details](gPnrk5TNKWg.md) (shared: `robotics` · `zero-copy` · `ipc`)
- [Architecting a Modern Robocode Engine](https://youtu.be/d3JxtD__-L0) — Development · 74 views · May 29, 2026 · [Details](d3JxtD__-L0.md) (shared: `deterministic` · `architecture` · `loop`)
- [Tokio: The Asynchronous Runtime for Rust](https://youtu.be/0Sed1oggMKY) — Development · 89 views · Feb 8, 2026 · [Details](0Sed1oggMKY.md) (shared: `architecture` · `rust`)
- [Architecting with Tonic](https://youtu.be/90hw9qwXbbw) — Development · 153 views · May 2, 2026 · [Details](90hw9qwXbbw.md) (shared: `architecture` · `rust`)

---
*Auto-generated on Jun 30, 2026. Back to [development](../development.md) · [index](../index.md).*
