---
type: video
videoId: Au6GKyflvGk
category: development
tags: [htmx, v4, fetch, streaming]
views: 908
date: 2026-08-29T23:00:32Z
summarized: 2026-09-03T03:00:00.000Z
---

# htmx 4.0.0

> [development](../development.md) · 908 views · Aug 29, 2026
> [Watch on YouTube](https://youtu.be/Au6GKyflvGk)

## Summary

htmx 4.0.0 is a ground-up rewrite scheduled for August 28, 2026 that preserves the familiar HTML attribute model while modernizing internals to native web standards — routing all Ajax through the fetch API with Readable Streams for native streaming — and remains exceptionally lightweight at ~11KB minified/brotli-compressed with zero external dependencies. The release introduces explicit attribute inheritance via the `:inherited` suffix, a standardized `htmx:phase:action` event hierarchy, `hx-status` for error-code routing and a 60s default timeout, alongside built-in morph swaps powered by the improved idiomorph algorithm and the new `hx-partial` element as a semantic alternative to OOB swaps. HTML fragments now render incrementally as they arrive (with dedicated extensions for SSE via `hx-sse`, WebSockets via `hx-ws`, and multipart responses), history navigation refetches from the server instead of localStorage snapshots, and the swap sequence executes strictly T0 (main) then T1 (OOB/partial) for predictable multi-target updates.

## Key Takeaways

- Native fetch + Readable Streams replaces legacy XMLHttpRequest bulk-package model: data flows incrementally into DOM targets with lower overhead, supports native streaming and is transparent for typical usage; pipeline is trigger → fetch → stream specialization (T0 main vs T1 `hx-partial`) → idiomorph DOM update, with SSE, WebSocket and multipart via extensions.
- Explicit attribute inheritance with `:inherited` replaces v2's implicit cascading: add the suffix (e.g. `hx-get:inherited`) to make attributes inheritable; v4 locks inheritance by default for predictability, with a global flag to temporarily restore v2 behavior for large-codebase migrations — rollout is gradual with v2.x remaining the NPM `latest` tag until early 2027.
- Structured event naming hierarchy `htmx:phase:action[:subaction]` (namespace → lifecycle phase → action → optional subaction) consolidates fragmented XHR/validation events into predictable patterns such as `htmx:configRequest`; error handling routes cleanly to `htmx:error` or `htmx:responseError`.
- Error and history overhaul: 4xx/5xx responses now swap by default into the target (only 204/304 skip), customizable via `hx-status` per-code routing or `htmx.config.noSwap`; back/forward navigation refetches from the server for accurate state (restore local cache via `hx-history-cache` extension); default timeout capped at 60s; attributes renamed `hx-disable` → `hx-ignore` and `hx-bars` → `hx-vals` with `js:` prefix.
- Morphing, partial swaps and upgrade tooling: `inner morph` / `outer morph` built-in via improved idiomorph preserves focus, active inputs and DOM state through state-preserving transitions; `hx-partial` provides a clearer semantic alternative to OOB for multi-element single-response updates with strict sequential T0 then T1 execution; migrate via `npx htmx.org@4.0.0 upgrade check` CLI, use the new `htmx.js` bundle (core + popular extensions), and new extensions `hx-live`, `hx-history-cache`, `hx-alpine-compat` plus streaming suites at `4.htmx.org`.

## Topics Covered

`htmx 4.0 fetch streams` · `explicit attribute inheritance` · `event naming hierarchy` · `hx-status error routing` · `idiomorph morph swaps` · `hx-partial multi-target` · `native streaming and upgrade checker`

## Tags

[htmx](../tags/htmx.md) · [v4](../tags/v4.md) · [fetch](../tags/fetch.md) · [streaming](../tags/streaming.md)

## Related Videos

- [A Comprehensive Guide to Zig Fundamentals and Features](https://youtu.be/xV2EAL3NAVM) — Development · 499 views · Feb 2, 2026 · [Details](xV2EAL3NAVM.md) (shared: `explicit` · `error`)
- [AX: The Distributed Agent Runtime](https://youtu.be/xiTVDbJscik) — Development · 73 views · May 23, 2026 · [Details](xiTVDbJscik.md) (shared: `event` · `streaming`)
- [Bumble: A Universal Userspace Bluetooth Stack](https://youtu.be/7LynLmseNRk) — Development · 40 views · May 27, 2026 · [Details](7LynLmseNRk.md) (shared: `routing` · `native`)
- [Flattening the Hierarchy](https://youtu.be/RvgI3oEThcA) — Development · 19 views · Jul 13, 2026 · [Details](RvgI3oEThcA.md) (shared: `inheritance` · `hierarchy`)
- [Local Change Data Capture at Scale](https://youtu.be/FIelcuTti-I) — Development · 23 views · May 26, 2026 · [Details](FIelcuTti-I.md) (shared: `streams` · `event`)

---
*Auto-generated on Sep 03, 2026. Back to [development](../development.md) · [index](../index.md).*
