---
type: video
videoId: cJl2cchaHL8
category: development
tags: []
views: 58
date: 2026-01-25T05:05:15Z
summarized: 2026-04-16T22:00:00.000Z
---

# pastel-hn

> [development](../development.md) · 58 views · Jan 25, 2026
> [Watch on YouTube](https://youtu.be/cJl2cchaHL8)

## Summary

This video is an architectural case study of Pastel HN, a native desktop Hacker News client built with Tauri 2.x featuring a cyberpunk pastel design system and keyboard-centric workflow. The project went through an evolutionary architecture journey, starting with an overengineered Zig-to-WebAssembly pipeline for JSON parsing (documented as ADR-00001) that proved unnecessarily complex at 827 lines and 61KB binary. The team pivoted to a simpler TypeScript-native approach after a complexity audit revealed the WASM overhead wasn't justified.

## Key Takeaways

- The initial Zig-to-WebAssembly experiment for JSON parsing and URL building was documented as ADR-00001 "the overengineering trap," requiring 827 lines of maintenance burden across 180 lines of main.zig, 237 lines for JSON handling, and 95 lines for URL logic.
- Tauri 2.x provides native cross-platform support for macOS, Windows, and Linux while maintaining sub-100ms response times for all interactions.
- A complexity audit was the key decision tool that revealed the true cost of the WASM approach versus simpler TypeScript-native alternatives.
- The project demonstrates evolutionary architecture principles where architectural decisions are recorded and revisited based on empirical evidence.

## Topics Covered

`tauri 2.x` · `zig webassembly` · `architectural decision records` · `evolutionary architecture` · `complexity audit` · `desktop application development`

## Related Videos

- [Swift Firefly](https://youtu.be/P58Zt8A_1Mc) — Development · 112 views · Jan 24, 2026 · [Details](P58Zt8A_1Mc.md) (shared: `zig` · `webassembly` · `architecture`)
- [Velox: Bring Tauri to Swift](https://youtu.be/Ul0ixBpd5iM) — Development · 47 views · Jan 27, 2026 · [Details](Ul0ixBpd5iM.md) (shared: `tauri` · `architecture` · `desktop`)
- [Cloth Simulation ](https://youtu.be/3Fpey_L_XRU) — Development · 13 views · Jan 25, 2026 · [Details](3Fpey_L_XRU.md) (shared: `zig` · `webassembly` · `development`)
- [Book-Finder Architecture](https://youtu.be/tyR8SdHpOeY) — Development · 31 views · Apr 12, 2026 · [Details](tyR8SdHpOeY.md) (shared: `zig` · `webassembly` · `architecture`)
- [microgpt-zig: Atomic Al Training](https://youtu.be/AcpVuvtSXwI) — Development · 54 views · Feb 28, 2026 · [Details](AcpVuvtSXwI.md) (shared: `zig` · `architecture`)

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
