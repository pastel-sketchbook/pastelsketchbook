---
type: video
videoId: O8yq5uB2hXY
category: development
tags: [rust, topcoat, hybrid, signals]
views: 38
date: 2026-10-02T23:00:31Z
summarized: 2026-10-03T23:20:00.000Z
---

# Pushing the Boundary of Server Applications with Rust

> [development](../development.md) · 38 views · Oct 2, 2026
> [Watch on YouTube](https://youtu.be/O8yq5uB2hXY)

## Summary

This session pushes server-application boundaries with Rust through the Topcoat 0.9 plus Toasty plus Telsti stack unifying a high-performance core with streaming UI delivery. It dissolves the Rails-versus-Rust productivity tradeoff with framework conventions that cut AI token costs, bridges server rendering and client responsiveness through TopCoat Hybrid signals and shards, streams suspense states with live.emit macros and websocket server push, and replaces boilerplate ORM patterns with Toasty procedural macros spanning atomic updates, Postgres JSONB documents, and enum-driven polymorphic relations.

## Key Takeaways

- Land in the top-right quadrant by pairing Rails-style standardized conventions with a 20 megabyte Rust footprint so AI code generation needs less context while runtime stays fast and safe.
- Default to server rendering with TopCoat Hybrid where zero-latency signals handle instant client state and shards isolate server re-execution to morph only dependent DOM nodes.
- Stream progressively with live.emit skeleton flashing plus background resolution and websocket channel subscriptions that push chat-grade updates without client state machinery.
- Eliminate ORM boilerplate with Toasty macros compiling direct mutations into atomic SQL while JSONB document fields stay traversable through strongly typed Rust expressions.
- Model polymorphism natively with Rust enums plus shared-id mapping onto single columns so unified relational schemas keep compile-time safety without fragile workarounds.

## Topics Covered

`topcoat hybrid rendering` · `signals shards reactivity` · `toasty database client` · `websocket server push` · `streaming suspense ui` · `rust orm patterns` · `ai framework conventions` · `postgres jsonb mapping`

## Tags

[rust](../tags/rust.md) · [topcoat](../tags/topcoat.md) · [hybrid](../tags/hybrid.md) · [signals](../tags/signals.md)

## Related Videos

- [The Prisma Ecosystem Architecture](https://youtu.be/LnJbrb0EUaE) — Development · 17 views · May 8, 2026 · [Details](LnJbrb0EUaE.md) (shared: `database` · `client` · `rust`)
- [The Architect's ORM Blueprint](https://youtu.be/E30riOZ-YVo) — Development · 39 views · May 5, 2026 · [Details](E30riOZ-YVo.md) (shared: `database` · `orm` · `patterns`)
- [The Microservices Communication Playbook](https://youtu.be/L9ypC5863yA) — Development · 130 views · Apr 24, 2026 · [Details](L9ypC5863yA.md) (shared: `streaming` · `rust` · `patterns`)
- [Architecting the Next Evolution of the Local Database](https://youtu.be/EWwk29GzHgg) — Development · 134 views · Apr 27, 2026 · [Details](EWwk29GzHgg.md) (shared: `database` · `server` · `rust`)
- [The Burn Book App Architecture](https://youtu.be/TpyKC8_30xs) — Development · 20 views · May 23, 2026 · [Details](TpyKC8_30xs.md) (shared: `rendering` · `server` · `framework`)

---
*Auto-generated on Oct 3, 2026. Back to [development](../development.md) · [index](../index.md).*
