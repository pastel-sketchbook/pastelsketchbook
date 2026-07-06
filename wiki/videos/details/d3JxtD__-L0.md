---
type: video
videoId: d3JxtD__-L0
category: development
tags: [rust, robocode, plugin, wasm]
views: 8
date: 2026-05-29T21:33:13Z
summarized: 2026-05-30T12:15:00.000Z
---

# Architecting a Modern Robocode Engine

> [development](../development.md) · 8 views · May 29, 2026
> [Watch on YouTube](https://youtu.be/d3JxtD__-L0)

## Summary

This session reimagines IBM's classic Java Robocode as a modern, data-driven engine built on Rust and the Bevy ECS, with a workspace that supports both native `cdylib` bots and sandboxed WebAssembly bots through a unified `Bot` trait. The architecture emphasizes deterministic simulation, controlled bot APIs (sensors, inbox, actuators), and a strict event router that turns global Bevy events into per-bot O(1) inboxes for predictable, reproducible matches.

## Key Takeaways

- Two parallel plugin paths — `bots/` native `cdylib` for raw performance and `bots_wasm/` sandboxed WebAssembly modules for isolation — share a single `Bot` trait and context API, decoupling the game loop from the execution environment.
- Bots interact with the world only through a per-tick snapshot of sensors (self + arena state), an event inbox (e.g. `EScannedBot`, `EHitByBullet`), and actuator commands (`move`, `turn`, `fire`), with no raw ECS access permitted.
- A centralized event router collapses O(N) global Bevy event streams into deterministic O(1) per-bot inboxes, enabling each bot to react only to events relevant to it.
- The deterministic nine-step game loop (apply motion → movement → bullets → scanning → death detection → event routing → bot tick → apply fire → clear inboxes) guarantees identical frame-by-frame outcomes across runs.
- WASM bots cross the memory boundary as flat `#[repr(C)]` pointers and `f32`/integer fields with kind identifiers, never as rich Rust traits — making the project a strong pedagogical vehicle for ownership, ECS thinking, and FFI/dynamic-loading practice.

## Topics Covered

`bevy ecs engine` · `robocode rewrite` · `rust cdylib plugins` · `wasm sandboxed bots` · `deterministic game loop` · `event router architecture` · `bot trait api` · `radar geometry determinism` · `ffi memory boundary`

## Tags

[rust](../tags/rust.md) · [robocode](../tags/robocode.md) · [plugin](../tags/plugin.md) · [wasm](../tags/wasm.md)

## Related Videos

- [Beat - Anatomy of a Real-Time Visualizer](https://youtu.be/lin_ycbQGtE) — Development · 27 views · Mar 20, 2026 · [Details](lin_ycbQGtE.md) (shared: `bevy` · `engine` · `rust`)
- [The Rust Robotics Paradigm](https://youtu.be/gPnrk5TNKWg) — Development · 39 views · Jun 27, 2026 · [Details](gPnrk5TNKWg.md) (shared: `bevy` · `ecs` · `rust`)
- [RB Simulation Architecture](https://youtu.be/AbCc2yfz2uw) — Development · 6 views · Jun 30, 2026 · [Details](AbCc2yfz2uw.md) (shared: `rust` · `deterministic` · `loop`)
- [Architecting Scalable Rust Backends](https://youtu.be/SpNfrWmI8iE) — Development · 77 views · Feb 22, 2026 · [Details](SpNfrWmI8iE.md) (shared: `rust` · `architecture` · `trait`)
- [Bevy-Demo](https://youtu.be/_zJ3_d1CODg) — Development · 166 views · Mar 18, 2026 · [Details](_zJ3_d1CODg.md) (shared: `bevy` · `engine` · `rust`)

---
*Auto-generated on May 30, 2026. Back to [development](../development.md) · [index](../index.md).*
