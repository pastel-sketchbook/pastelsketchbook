---
type: video
videoId: L4YBdUVCFd4
category: development
tags: []
views: 23
date: 2026-05-30T22:00:08Z
summarized: 2026-06-02T12:30:00.000Z
---

# Migrating to SolidJS 2.0

> [development](../development.md) · 23 views · May 30, 2026
> [Watch on YouTube](https://youtu.be/L4YBdUVCFd4)

## Summary

A technical blueprint for migrating a SolidJS 1.x application to the `2.0.0-beta.14` release in a single coordinated change. It walks through the three paradigm shifts — modular `@solidjs/signals` and `@solidjs/web` packages, default microtask batching with an explicit `flush` for tests, and native DOM alignment that drops Solid-specific JSX namespaces — alongside the lifecycle, store, resource, and control-flow renames (`onSettle`, `snapshot`, `loading`, `errored`, `reveal`, `refresh`).

## Key Takeaways

- Solid 2.0 separates reactivity (`@solidjs/signals`) from rendering (`@solidjs/web`) and stops owning JSX types, requiring an updated JSX import source.
- All writes are batched into microtasks by default, so tests must call `flush` to make DOM updates visible before assertions; explicit `batch` is removed.
- Effects split into a compute phase that returns a value and an apply phase that performs side effects and returns its own cleanup, retiring `onCleanup` patterns.
- Lifecycle and primitives are renamed: `onMount` → `onSettle`, `Suspense` → `Loading`, `ErrorBoundary` → `Errored`, `SuspenseList` → `Reveal`, `Index` collapses into `<For keyed={false}>`.
- Stores adopt draft-first callbacks by default (no more `produce`), `unwrap` becomes `snapshot`, JSX drops `attr:`, `bool:`, `on:` namespaces, and pinning the exact beta with a flush-aware test harness keeps CI stable during the beta phase.

## Topics Covered

`solidjs 2.0 migration` · `solid signals package` · `microtask batching reactivity` · `solid effect compute apply` · `solid lifecycle onsettle` · `solid stores draft callbacks` · `solid resource loading errored` · `jsx namespace removal`

## Related Videos

- [The Road to SolidJS 2.0](https://youtu.be/00kCzR10M1w) — Development · 281 views · Mar 3, 2026 · [Details](00kCzR10M1w.md) (shared: `signals` · `batching` · `reactivity`)
- [The Echo Web Framework](https://youtu.be/QOYXBkMcnYk) — Development · 43 views · May 3, 2026 · [Details](QOYXBkMcnYk.md) (shared: `migration` · `lifecycle`)
- [The Universal Engine for LLM Inference](https://youtu.be/OKXt-PJUuzE) — Development · 51 views · Jun 21, 2026 · [Details](OKXt-PJUuzE.md) (shared: `batching` · `compute`)
- [Architecting Modern JavaScript Modules](https://youtu.be/Fqokr0P2_ag) — Development · 21 views · May 25, 2026 · [Details](Fqokr0P2_ag.md) (shared: `migration` · `loading`)
- [Modern State Architecture: The Repository Pattern](https://youtu.be/3ybGkjogcFQ) — Development · 36 views · Feb 20, 2026 · [Details](3ybGkjogcFQ.md) (shared: `signals`)

---
*Auto-generated on Jun 2, 2026. Back to [development](../development.md) · [index](../index.md).*
