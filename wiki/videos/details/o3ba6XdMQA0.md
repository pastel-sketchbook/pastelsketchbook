---
type: video
videoId: o3ba6XdMQA0
category: development
tags: [rust, slidevoice, tonic, axum, tokio, tower]
views: 8
date: 2026-06-23T23:00:25Z
summarized: 2026-06-25T17:30:00.000Z
---

# Architecture Blueprint: tn-svs

> [development](../development.md) · 8 views · Jun 23, 2026
> [Watch on YouTube](https://youtu.be/o3ba6XdMQA0)

## Summary

This architecture blueprint walks through tn-svs, a Rust pipeline that converts PDF documents into narrated MP4 videos via Poppler rasterization, Gemini script and text-to-speech generation, and FFmpeg encoding. It runs as a single binary with dual transport—gRPC on port 50051 for programmatic clients and an Axum REST endpoint on port 3001 with server-sent events for a React SPA—backed by a shared core with abstracted storage and an Arc-managed job registry.

## Key Takeaways

- A single-binary dual-transport design exposes gRPC (chunked streaming) and REST (server-sent events) over one shared core, eliminating IPC overhead.
- In-process rendering gives fine-grained per-slide progress, shared semaphore concurrency, instant cache reuse of notes and audio, and typed Rust errors instead of fragile subprocess parsing.
- UUID v7 acts as a universal correlation key for file, job, and request IDs, providing monotonic ordering, log traceability, and coordination-free generation.
- A granular production loop invalidates only changed slides on replace, renumbers indices on removal, and resumes failed jobs from cached stages, with source-job-ID merging for quota resilience.
- "Cautious waves" defeat API rate limits by ramping concurrency gradually, rotating API keys on 429s, and failing fast to preserve cache for later resume.

## Topics Covered

`pdf to video pipeline` · `single binary dual transport` · `grpc streaming patterns` · `axum rest sse` · `in-process rendering cache` · `uuid v7 correlation` · `api quota resilience` · `tokio async runtime`

## Tags

[rust](../tags/rust.md) · [slidevoice](../tags/slidevoice.md) · [tonic](../tags/tonic.md) · [axum](../tags/axum.md) · [tokio](../tags/tokio.md) · [tower](../tags/tower.md)

## Related Videos

- [The Rust Architect's Sketchbook](https://youtu.be/7zFqW-ZcEbo) — Development · 93 views · Jan 8, 2026 · [Details](7zFqW-ZcEbo.md) (shared: `grpc` · `axum` · `tokio async runtime`)
- [The Professional Rust Toolbox](https://youtu.be/js95nIDeA-c) — Development · 8 views · Jan 8, 2026 · [Details](js95nIDeA-c.md) (shared: `axum` · `tokio async runtime` · `tokio`)
- [Architecture Review: tn-file-upload](https://youtu.be/UOOkDh4RUbE) — Development · 29 views · May 4, 2026 · [Details](UOOkDh4RUbE.md) (shared: `grpc` · `streaming` · `axum`)
- [The Microservices Communication Playbook](https://youtu.be/L9ypC5863yA) — Development · 130 views · Apr 24, 2026 · [Details](L9ypC5863yA.md) (shared: `grpc streaming patterns` · `grpc` · `streaming`)
- [Architecting with Tonic](https://youtu.be/90hw9qwXbbw) — Development · 159 views · May 2, 2026 · [Details](90hw9qwXbbw.md) (shared: `grpc` · `tokio` · `async`)

---
*Auto-generated on Jun 25, 2026. Back to [development](../development.md) · [index](../index.md).*
