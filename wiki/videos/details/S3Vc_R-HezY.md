---
type: video
videoId: S3Vc_R-HezY
category: development
tags: [skill, svs-cli, rust]
views: 11
date: 2026-05-25T02:46:56Z
summarized: 2026-05-25T14:00:00.000Z
---

# svs-cli: 10 Critical Things

> [development](../development.md) · 11 views · May 24, 2026
> [Watch on YouTube](https://youtu.be/S3Vc_R-HezY)

## Summary

This codebase passover deck walks through ten invariants of svs-cli, a headless Rust pipeline that turns slides into narrated MP4s by orchestrating Doppler, Gemini, cached sidecars, and FFmpeg segments. It documents the staged pipeline contract, cache layout as an API, and the subtle behaviors around slide mutation, Gemini retries, audio duration derivation, and xfade transitions that must survive future edits.

## Key Takeaways

- The slides → notes → audio → segments → assembly stage order is the product contract; changing it breaks cache reuse, resume, and Flutter/Swift parity.
- The cache layout is a public API: notes and audio sidecars are intentionally preserved across runs so reruns can skip expensive Gemini calls; only heavy segments are pruned by default.
- Slide replacement performs partial cache invalidation (notes and audio for the affected slide) and slide removals must be sorted, de-duplicated, and applied in reverse to prevent index drift.
- Audio duration is derived from raw 24 kHz mono 16-bit PCM byte counts rather than FFmpeg probing, so the PCM constants must be preserved whenever the TTS model or audio format changes.
- FFmpeg xfade pads video with tpad/clone but concatenates audio, accumulating offsets per segment; concurrency is bounded by semaphores defaulting to half of available cores clamped to 1–4.

## Topics Covered

`staged pipeline contract` · `cache layout as api` · `slide mutation invalidation` · `gemini 429 retry semantics` · `pcm duration derivation` · `ffmpeg xfade pipeline` · `semaphore-bounded concurrency` · `compile-time embedded prompts`

## Tags

[skill](../tags/skill.md) · [svs-cli](../tags/svs-cli.md) · [rust](../tags/rust.md)

## Related Videos

- [A Desktop-First Export Strategy for SlideVoice Studio](https://youtu.be/78hLFt3_Gh4) — Development · 32 views · May 29, 2026 · [Details](78hLFt3_Gh4.md) (shared: `pipeline` · `api` · `gemini`)
- [SlideVoice Studio Swift](https://youtu.be/r1rhrISQXeA) — Development · 39 views · Jun 4, 2026 · [Details](r1rhrISQXeA.md) (shared: `api` · `gemini` · `ffmpeg`)
- [SlideVoice Studio Desktop Shell Architecture](https://youtu.be/ytA6gw6Tgaw) — Development · 31 views · May 17, 2026 · [Details](ytA6gw6Tgaw.md) (shared: `api` · `slide` · `gemini`)
- [A Compiler, Not a Renderer](https://youtu.be/E8f87EV4k3A) — Development · 157 views · Apr 17, 2026 · [Details](E8f87EV4k3A.md) (shared: `pipeline` · `layout`)
- [Memory Layout in Zig](https://youtu.be/h31-NtagNoU) — Development · 61 views · Jan 29, 2026 · [Details](h31-NtagNoU.md) (shared: `cache` · `layout`)

---
*Auto-generated on May 25, 2026. Back to [development](../development.md) · [index](../index.md).*
