---
type: video
videoId: feWjiYzQQ-k
category: development
tags: [rust, yahoo, finviz, ureq, qc, whispers]
views: 37
date: 2026-04-19T17:24:16Z
summarized: 2026-04-22T22:00:00.000Z
---

# Pastel Market: Engineering a Unified Terminal Workspace

> [development](../development.md) · 37 views · Apr 19, 2026
> [Watch on YouTube](https://youtu.be/feWjiYzQQ-k)

## Summary

This video introduces Pastel Market, a high-performance Rust TUI that consolidates two earlier tools — Pastel Picker (earnings intelligence and FinViz screening) and Reigns Market (real-time Yahoo Finance monitoring) — into a single unified binary. The merger eliminated approximately 400 lines of duplicated FinViz scraping code and unified 16 UI themes through a shared market-core crate, while adopting ureq over reqwest for a lighter binary footprint and targeting Rust 2024 edition with MSRV 1.95.0.

## Key Takeaways

- Strategic consolidation of Pastel Picker and Reigns Market into a single binary via a shared market-core crate eliminates architectural redundancy and centralizes terminal lifecycle management.
- Dynamic seeding replaces static default symbols by pulling the top 20 active stocks from Yahoo Finance screeners on launch, with fallback through gainers, losers, and most-active lists.
- Reactive UI wiring maps every navigation and input event to an explicit backend reaction, ensuring zero stale states across the watchlist, screening, and signaling views.
- The project chose ureq over reqwest for lighter binary size and built-in cookie jar support, with modular workspace crates enabling independent testing via cargo test.

## Topics Covered

`rust tui` · `market-core crate` · `pastel picker` · `reigns market` · `yahoo finance screeners` · `dynamic seeding` · `sector visibility` · `reactive ui` · `ureq` · `rust 2024 edition`

## Related Videos

- [yp: The Terminal User Interface Renaissance](https://youtu.be/vSjgNxi7W-4) — Development · 70 views · Mar 6, 2026 · [Details](vSjgNxi7W-4.md) (shared: `rust tui` · `rust` · `tui`)
- [hexcap: Elevating Terminal Packet Capture](https://youtu.be/FM6zp63maS8) — Development · 63 views · Apr 20, 2026 · [Details](FM6zp63maS8.md) (shared: `rust` · `tui`)
- [Rust 1.95.0](https://youtu.be/izLrX-02IQk) — Development · 252 views · Apr 18, 2026 · [Details](izLrX-02IQk.md) (shared: `rust` · `crate`)
- [Blueprinting Machine Learning in Rust](https://youtu.be/KR188eZ9gRE) — Development · 30 views · May 20, 2026 · [Details](KR188eZ9gRE.md) (shared: `rust` · `crate`)
- [From 0 to N-Dimensions](https://youtu.be/6M76N3jhh1Q) — Development · 41 views · May 19, 2026 · [Details](6M76N3jhh1Q.md) (shared: `rust` · `crate`)

---
*Auto-generated on Apr 22, 2026. Back to [development](../development.md) · [index](../index.md).*