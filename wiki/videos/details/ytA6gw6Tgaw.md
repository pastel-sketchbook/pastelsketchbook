---
type: video
videoId: ytA6gw6Tgaw
category: development
tags: [tauri, rust, bun, svs]
views: 2
date: 2026-05-17T18:33:33Z
summarized: 2026-05-17T21:50:00.000Z
---

# SlideVoice Studio Desktop Shell Architecture

> [development](../development.md) · 2 views · May 17, 2026
> [Watch on YouTube](https://youtu.be/ytA6gw6Tgaw)

## Summary

SlideVoice Studio wraps an existing Vite + React single-page application in a thin Tauri 2 shell to deliver a native, local-first desktop experience without rewriting the web codebase. The shell enforces a strict content security policy with zero IPC commands, while the in-app workflow uses the Google Gemini API and browser media APIs to turn slide decks into narrated videos entirely on-device.

## Key Takeaways

- A Tauri 2 wrapper with zero IPC commands and a strict CSP gives the SPA a hardened native shell without exposing additional attack surface.
- The five-stage workflow (import, narrate, voice, preview, export) keeps all media, scripts, and audio on the local device for full data privacy.
- PDFs are rendered with PDF.js, narration scripts come from speaker notes or Gemini drafts, and audio is generated via Gemini text-to-speech voices like Zephyr, Puck, and Fenrir.
- The core stack consolidates around Bun 1.3 as runtime/package manager/test runner, Biome for formatting, and Vite 8 + React 19 + TypeScript + Tailwind CSS 4 for the UI.
- A well-defined window contract (default 1280x820, minimum 960x640) and IndexedDB persistence make the desktop launch feel native rather than a wrapped browser tab.

## Topics Covered

`tauri 2 desktop shell` · `local first architecture` · `vite react spa` · `gemini api narration` · `pdf.js slide import` · `media recorder export` · `bun toolchain` · `content security policy`

## Tags

[tauri](../tags/tauri.md) · [rust](../tags/rust.md) · [bun](../tags/bun.md) · [svs](../tags/svs.md)

## Related Videos

- [A Desktop-First Export Strategy for SlideVoice Studio](https://youtu.be/78hLFt3_Gh4) — Development · 32 views · May 29, 2026 · [Details](78hLFt3_Gh4.md) (shared: `desktop` · `architecture` · `gemini`)
- [The Burn Book App Architecture](https://youtu.be/TpyKC8_30xs) — Development · 19 views · May 23, 2026 · [Details](TpyKC8_30xs.md) (shared: `tauri 2 desktop shell` · `tauri` · `desktop`)
- [SlideVoice Studio Swift](https://youtu.be/r1rhrISQXeA) — Development · 40 views · Jun 4, 2026 · [Details](r1rhrISQXeA.md) (shared: `gemini api narration` · `gemini` · `api`)
- [pastel-hn](https://youtu.be/cJl2cchaHL8) — Development · 59 views · Jan 24, 2026 · [Details](cJl2cchaHL8.md) (shared: `tauri` · `desktop` · `architecture`)
- [Velox: Bring Tauri to Swift](https://youtu.be/Ul0ixBpd5iM) — Development · 48 views · Jan 27, 2026 · [Details](Ul0ixBpd5iM.md) (shared: `tauri` · `desktop` · `architecture`)

---
*Auto-generated on May 17, 2026. Back to [development](../development.md) · [index](../index.md).*
