---
type: video
videoId: SuuZW_fuEFc
category: development
tags: [rust, smtp, trap, rfc, magika]
views: 12
date: 2026-05-08T17:38:27Z
summarized: 2026-05-09T22:30:00.000Z
---

# rr-mailtrap: The Developer's SMTP Sandbox

> [development](../development.md) · 12 views · May 8, 2026
> [Watch on YouTube](https://youtu.be/SuuZW_fuEFc)

## Summary

rr-mailtrap is a single-binary Rust SMTP sandbox that traps outbound test mail on localhost, exposing a Ratatui-powered TUI, an HTTP API with Prometheus metrics, and webhook integrations. It deliberately breaks production SMTP rules — accepting all messages, skipping credential validation, anchoring to 127.0.0.1 — to make local email testing safe and frictionless. Built-in chaos mode injects latency and SMTP failures, while an embedded Google Magika ONNX model provides AI-driven content-type detection at roughly 5 ms per file with ~99% accuracy.

## Key Takeaways

- A single binary with zero external dependencies bundles the SMTP server, TLS handling, HTTP API, and Ratatui TUI for portable, no-sidecar local testing.
- The "accept everything, inspect later" pillar pairs with strict SMTP protocol fidelity (EHLO capabilities, response codes) so production mail clients behave identically against the trap.
- Chaos mode parameters like `--reject-rate` and `--slow-data-ms` simulate transient SMTP failures and latency without needing a separate proxy or fault-injection tool.
- Embedded Google Magika ONNX (~3 MB) detects 200+ file types at ~5 ms per file, exposing MIME mismatches where clients label PDFs as `application/octet-stream`.
- The synchronous ingest pipeline runs Magika via `tokio::task::spawn_blocking` so deep-learning content detection never blocks the async SMTP listener.
- Magika ONNX in-process beats `file(1)` and the Magika CLI by eliminating per-attachment process spawn overhead while remaining fully cross-platform.
- The Ratatui TUI offers vim-style navigation (`j`/`k`, `/`), inspection shortcuts (`H` headers, `B` body, `M` MIME tree, `R` raw, `T` SMTP transcript), and actions (`S` export EML, `A` save attachments).
- Loopback anchoring to 127.0.0.1 plus optional opt-in relay host guarantees test data never reaches real users while preserving full protocol-level realism.

## Topics Covered

`smtp sandbox trap` · `ratatui terminal ui` · `chaos mode fault injection` · `magika onnx content detection` · `mime mismatch validation` · `single binary zero dependencies` · `loopback safety net` · `prometheus metrics webhooks` · `mbox import export`

## Tags

[rust](../tags/rust.md) · [smtp](../tags/smtp.md) · [trap](../tags/trap.md) · [rfc](../tags/rfc.md) · [magika](../tags/magika.md)

## Related Videos

- [The Evolution of File Detection](https://youtu.be/85pyYZFJ6_s) — Development · 48 views · May 7, 2026 · [Details](85pyYZFJ6_s.md) (shared: `magika` · `content` · `detection`)
- [Architecting Al in Software Engineering](https://youtu.be/yXZnBtdDTFk) — Development · 80 views · May 25, 2026 · [Details](yXZnBtdDTFk.md) (shared: `validation` · `safety` · `net`)
- [Burn: The Rust Deep Learning Framework](https://youtu.be/joYJ6rPN3UI) — Development · 581 views · Feb 13, 2026 · [Details](joYJ6rPN3UI.md) (shared: `onnx` · `zero` · `safety`)
- [The Burn Book App Architecture](https://youtu.be/TpyKC8_30xs) — Development · 19 views · May 23, 2026 · [Details](TpyKC8_30xs.md) (shared: `ratatui terminal ui` · `ratatui` · `terminal`)
- [SlideVoice Studio Desktop Shell Architecture](https://youtu.be/ytA6gw6Tgaw) — Development · 31 views · May 17, 2026 · [Details](ytA6gw6Tgaw.md) (shared: `content` · `import` · `export`)

---
*Auto-generated on May 9, 2026. Back to [development](../development.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Architect's Sketchbook](zmd://wiki/books/architects-sketchbook.md) — Chapter 5** (confidence: 43%)_
