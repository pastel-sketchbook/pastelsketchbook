---
type: video
videoId: eT4cwClcQqk
category: development
tags: [refactoring, strangler fig, facade]
views: 17
date: 2026-10-30T23:00:26Z
summarized: 2026-11-02T23:59:00.000Z
---

# The Pragmatic FastAPI Refactoring Playbook

> [development](../development.md) · 17 views · Oct 30, 2026
> [Watch on YouTube](https://youtu.be/eT4cwClcQqk)

## Summary

This session is a playbook for scaling million-line FastAPI monoliths safely: frozen behavior, internal modularization, and a gradual strangle. It explains the Big Bang Fallacy, walks the three-phase modernization roadmap from characterization tests through a domain-driven modular monolith to the Strangler Fig pattern, details the FastAPI testing toolchain that pins external behavior, builds the layered routing facade with staged feature-flag rollouts, and closes with the data-consistency ladder, observability steering, the fee-scale trade-offs, and the non-negotiable legacy-deletion checklist.

## Key Takeaways

- Reject the Big Bang Fallacy: an upfront rewrite introduces 100% risk and zero business value until completion; the pragmatic path freezes behavior, modularizes internally, and strangler-figs traffic off the legacy code incrementally with continuous delivery, immediate rollback, and zero downtime.
- Freeze behavior first with characterization tests: drive external API shape through fixtures — pytest + pytest-cov as runner/coverage, sync TestClient, HTTPX + ASGI transport for async — asserting status codes, structural keys, and types-only loose assertions on volatile data; snapshot sanitized payloads as baselines on first run, then compare every subsequent response for regressions.
- Prioritize coverage by cost of change, not the 100% vanity metric: phase 1 (1-2 months) covers 20-30% of core flows, phase 2 (3-6 months) reaches 40-55% on main business logic, phase 3 stabilizes 60-75% long-term — filtered through a funnel of financial impact, commit churn, bug rates, and core dependencies.
- Strangle through layered control: keep client URLs unchanged behind a routing facade, route a unified decorator to legacy or modern routers; gate rollouts with header overrides (X-Use-New: true) for QA, internal whitelist betas, and percentage-based traffic shifts; run the five-step extraction loop (isolate a high-value feature → clean service → route from 1% → monitor telemetry → delete legacy).
- Resolve data consistency in stages and finish for real: share the database table first, graduate to dual-write, then CDC/event streaming for true microservices; steer adoption with error rates, P95/P99 latency, and business metrics; declare completion only when traffic is fully routed, metrics are stable, flags are removed, and legacy code is deleted — mantra: lock behavior, clean layers, strangle traffic.

## Topics Covered

`characterization tests` · `snapshot testing` · `modular monolith bounded contexts` · `router service repository layers` · `strangler fig routing facade` · `feature flag rollout` · `data consistency ladder` · `legacy deletion checklist`

## Tags

[refactoring](../tags/refactoring.md) · [strangler fig](../tags/strangler%20fig.md) · [facade](../tags/facade.md)

## Related Videos

- [The Strangler Fig Pattern](https://youtu.be/4aAyFYemYD8) — Development · 168 views · Apr 28, 2026 · [Details](4aAyFYemYD8.md) (shared: `monolith` · `strangler` · `fig`)
- [The Repository Pattern](https://youtu.be/cWozmWrqnxs) — Development · 875 views · Feb 13, 2026 · [Details](cWozmWrqnxs.md) (shared: `testing` · `repository` · `data`)
- [Building the Unified Rust Backend](https://youtu.be/qAHyv6G3a7M) — Development · 769 views · May 9, 2026 · [Details](qAHyv6G3a7M.md) (shared: `service` · `feature` · `flag`)
- [OpenFeature: The Standard for Feature Flagging](https://youtu.be/X65YHZUnFq0) — Development · 55 views · Apr 16, 2026 · [Details](X65YHZUnFq0.md) (shared: `testing` · `feature`)
- [Bulletproof Frontend Architecture](https://youtu.be/5Vloo08zQ7o) — Development · 35 views · Feb 16, 2026 · [Details](5Vloo08zQ7o.md) (shared: `repository` · `data`)

---
*Auto-generated on Nov 2, 2026. Back to [development](../development.md) · [index](../index.md).*
