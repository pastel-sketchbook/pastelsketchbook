---
type: video
videoId: ckSKHTb-wqw
category: development
tags: [idp, cache, latency]
views: 27
date: 2026-11-05T00:00:01Z
summarized: 2026-11-06T13:55:00.000Z
---

# Architecting for Speed

> [development](../development.md) · 27 views · Nov 5, 2026
> [Watch on YouTube](https://youtu.be/ckSKHTb-wqw)

## Summary

This session is a playbook for eliminating API latency before and through layering caches. It dissects the chatty front-end anti-pattern, then prescribes the waterfall-first sequence — instrument, parallelize, orchestrate (batch endpoints / BFF), only then cache — before detailing the Backend-for-Frontend pattern's orchestration math, the anti-pattern of exposing Redis to browsers, data placement by ownership and lifetime, TanStack Query as the client-side orchestrator, and the multi-tier request journey with stampede-protected shared caching at every boundary.

## Key Takeaways

- Hunt the chatty front-end anti-pattern first: a single view orchestrating dozens of calls across user/order/address/loyalty services multiplies round trips over high-latency public networks, shifts joining/filtering/formatting onto client CPU, and triggers cascading N+1 queries — a tightly coupled architecture degrading UX and front-end maintainability.
- Dismantle the waterfall before caching: instrument the request lifecycle with distributed tracing to find true sequential paths, parallelize independent downstream calls, consolidate chatter behind batch endpoints or a BFF, and only then introduce server-side caches on already-optimized hot paths — caching a broken waterfall is an architectural band-aid.
- Orchestrate with a BFF and validate decoupling: a single front-end request fans out into parallel internal service calls with client-specific authentication, aggregation, and anti-corruption shaping that prunes payloads to the UI's exact needs while gracefully handling partial downstream failures — the 5-service ~700ms sequential waterfall collapses to ~150ms bounded by the slowest operation, rendered server-adjacent to data stores.
- Place cache and data by ownership and lifetime: ephemeral UI state belongs to the client (TanStack Query or React state), private per-user data stays client-side or in short-lived sessions for tenant isolation and compliance, shared expensive-to-compute results belong in Redis, and static or semi-static assets belong at the CDN/edge — never query Redis across the public internet from a browser, where hop penalties erase the latency win while exposing a cache with no per-user authorization and stampede risk.
- Stack complementary layers at defined boundaries: TanStack Query deduplicates in-flight requests, serves stale-while-revalidate, applies optimistic updates with automatic invalidation, and garbage-collects inactive queries for per-user responsiveness; Redis shields downstream databases for read-heavy, expensive, multi-instance access patterns — with deterministic cache keys, short TTLs or event-driven invalidation, and stampede protection via probabilistic early expiration or mutex locks; use TanStack to fix client UX, Redis to fix shared backend load, and treat caching strictly as a performance amplifier on an already sound architecture.

## Topics Covered

`chatty frontend anti-pattern` · `waterfall dismantling sequence` · `backend-for-frontend orchestration` · `n+1 query cascades` · `redis exposure anti-pattern` · `data ownership and lifetime placement` · `tanstack query dedup and swr` · `cache stampede protection`

## Tags

[idp](../tags/idp.md) · [cache](../tags/cache.md) · [latency](../tags/latency.md)

## Related Videos

- [Modern State Architecture: The Repository Pattern](https://youtu.be/3ybGkjogcFQ) — Development · 43 views · Feb 20, 2026 · [Details](3ybGkjogcFQ.md) (shared: `frontend` · `query` · `tanstack`)
- [The End of the Functional Programming Tax](https://youtu.be/240fOdSvnpk) — Development · 78 views · Jun 14, 2026 · [Details](240fOdSvnpk.md) (shared: `data` · `ownership` · `cache`)
- [Bulletproof Frontend Architecture](https://youtu.be/5Vloo08zQ7o) — Development · 35 views · Feb 16, 2026 · [Details](5Vloo08zQ7o.md) (shared: `frontend` · `data`)
- [Architectural Principles of Fearless Concurrency](https://youtu.be/F59lTcC6xJ0) — Development · 52 views · Mar 28, 2026 · [Details](F59lTcC6xJ0.md) (shared: `data` · `ownership`)
- [Architecting Scalable Rust Backends](https://youtu.be/SpNfrWmI8iE) — Development · 85 views · Feb 22, 2026 · [Details](SpNfrWmI8iE.md) (shared: `anti-pattern` · `orchestration`)

---
*Auto-generated on Nov 6, 2026. Back to [development](../development.md) · [index](../index.md).*
