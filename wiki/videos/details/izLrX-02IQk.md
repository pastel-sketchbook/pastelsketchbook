---
type: video
videoId: izLrX-02IQk
category: development
tags: [rust, v1.95.0, "cfg_select!", "if-let guard"]
views: 192
date: 2026-04-18T20:42:55Z
summarized: 2026-04-22T22:00:00.000Z
---

# Rust 1.95.0

> [development](../development.md) · 192 views · Apr 18, 2026
> [Watch on YouTube](https://youtu.be/izLrX-02IQk)

## Summary

This video provides a technical briefing on the Rust 1.95.0 release, covering three primary update areas: expressive control flow with if-let guards in match expressions, build configuration via the new native cfg_select! macro, and standard library expansion with 35+ stabilized APIs and extended const context support. It also walks through rustup channel management for stable, beta, and nightly toolchains.

## Key Takeaways

- The cfg_select! macro is now part of the standard library, providing native compile-time matching on configuration predicates with sequential evaluation and fallback — eliminating the need for the external cfg-if crate.
- If-let guards integrate pattern matching directly into match arms, enabling more flexible and readable conditional logic that builds on the earlier stabilization of let chains.
- Over 35 core APIs were stabilized in this release alongside significant expansion of functionality available in const contexts, broadening what can be computed at compile time.
- Rustup channel management (stable, beta, nightly) gives developers full control over balancing production stability with access to experimental features.

## Topics Covered

`rust 1.95.0` · `cfg_select! macro` · `cfg-if crate` · `if-let guards` · `match expressions` · `stabilized apis` · `const contexts` · `rustup channels`

## Related Videos

- [Pastel Market: Engineering a Unified Terminal Workspace](https://youtu.be/feWjiYzQQ-k) — Development · 41 views · Apr 19, 2026 · [Details](feWjiYzQQ-k.md) (shared: `rust` · `crate`)
- [Tokio: The Asynchronous Runtime for Rust](https://youtu.be/0Sed1oggMKY) — Development · 88 views · Feb 8, 2026 · [Details](0Sed1oggMKY.md) (shared: `rust`)
- [Architecting with Tonic](https://youtu.be/90hw9qwXbbw) — Development · 147 views · May 2, 2026 · [Details](90hw9qwXbbw.md) (shared: `rust`)
- [Mastering Memory in Rust](https://youtu.be/43UjmZtW2JU) — Development · 50 views · Jan 27, 2026 · [Details](43UjmZtW2JU.md) (shared: `rust`)
- [hexcap: Elevating Terminal Packet Capture](https://youtu.be/FM6zp63maS8) — Development · 61 views · Apr 20, 2026 · [Details](FM6zp63maS8.md) (shared: `rust`)

---
*Auto-generated on Apr 22, 2026. Back to [development](../development.md) · [index](../index.md).*