---
type: video
videoId: TpyKC8_30xs
category: development
views: 5
date: 2026-05-23T18:01:49Z
summarized: 2026-05-24T02:13:03.520Z
---

# The Burn Book App Architecture

> [development](../development.md) · 5 views · May 23, 2026
> [Watch on YouTube](https://youtu.be/TpyKC8_30xs)

## Summary

The Burn Book is a multi-surface deep learning curriculum architecture for the Burn Rust ML framework, delivering a 147-page interactive course across three surfaces: a Ratatui-based TUI, an Axum + mdBook web interface, and a Tauri 2 desktop shell with embedded terminal. The architecture centers on a single content source of truth dynamically routed to each purpose-built execution environment.

## Key Takeaways

- Three delivery surfaces share a single content source of truth: a terminal TUI (Ratatui), a web interface (Axum + mdBook), and a desktop shell (Tauri 2 with embedded Axum server and xterm.js PTY bridge).
- The desktop application embeds a self-contained Axum server on a background Tokio runtime instead of using local file protocols, ensuring correct same-origin behavior and service worker compatibility at the cost of ~200KB binary size.
- The PTY bridge design keeps the Rust backend zero-parsing — it funnels raw PTY bytes directly to xterm.js via base64-encoded messages, preventing data loss during complex terminal escape sequence transmission.
- A planned migration targets replacing the xterm.js right pane with Ghostty's native C rendering library for GPU-accelerated terminal display, currently blocked by a Zig toolchain version incompatibility.
- The architecture bundles everything into a single executable with zero external server processes required, managed through a centralized task runner for build consistency across all three surfaces.

## Topics Covered

`multi-surface architecture` · `burn deep learning framework` · `ratatui terminal ui` · `axum embedded server` · `tauri 2 desktop shell` · `xterm.js pty bridge` · `ghostty native rendering` · `zig toolchain`

## Related Videos

- [The Burn Book](https://youtu.be/B7MMdnv3y1M) — Development · 31 views · May 21, 2026 · [Details](B7MMdnv3y1M.md) (shared: `architecture` · `burn deep learning framework` · `burn`)
- [Velox: Bring Tauri to Swift](https://youtu.be/Ul0ixBpd5iM) — Development · 48 views · Jan 27, 2026 · [Details](Ul0ixBpd5iM.md) (shared: `architecture` · `tauri` · `desktop`)
- [SlideVoice Studio Desktop Shell Architecture](https://youtu.be/ytA6gw6Tgaw) — Development · 31 views · May 17, 2026 · [Details](ytA6gw6Tgaw.md) (shared: `architecture` · `tauri 2 desktop shell` · `tauri`)
- [The Architecture of tracel-ai/models](https://youtu.be/kSQtbPEtDkY) — Development · 21 views · May 20, 2026 · [Details](kSQtbPEtDkY.md) (shared: `architecture` · `burn` · `deep`)
- [zig-twitter: Anatomy of a Hybrid Terminal Client](https://youtu.be/a2kADxV0kBM) — Development · 35 views · Mar 14, 2026 · [Details](a2kADxV0kBM.md) (shared: `architecture` · `terminal` · `rendering`)

---
*Auto-generated on May 24, 2026. Back to [development](../development.md) · [index](../index.md).*

