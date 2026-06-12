---
type: video
videoId: UOOkDh4RUbE
category: development
views: 18
date: 2026-05-04T23:49:00Z
summarized: 2026-05-06T22:19:59Z
---

# Architecture Review: tn-file-upload

> [development](../development.md) · 18 views · May 4, 2026
> [Watch on YouTube](https://youtu.be/UOOkDh4RUbE)

## Summary

tn-file-upload is a production-grade streaming-first gRPC file service written in Rust 1.95+ on the Tokio runtime, using tonic for gRPC and Axum as a secondary REST shim for browser SPAs. The design emphasizes bounded memory by replacing buffered REST multipart uploads with HTTP/2 multiplexed protobuf chunks, real-time SHA-256 validation, and a pluggable Arc-wrapped storage trait. It ships Kubernetes-ready with tonic health probes and graceful HTTP/2 GOAWAY shutdown.

## Key Takeaways

- gRPC streaming over HTTP/2 multiplexing keeps server memory bounded and constant whether transferring a 1 KB file or a 100 GB payload.
- Traditional REST multipart forces the server to buffer entire request bodies in memory, scaling consumption directly with payload size.
- The service is structured into three core layers — interceptors, file upload service, and storage — plus an Axum REST shim and an isolated tonic health service.
- The interceptor layer centralizes cross-cutting concerns including UUID injection for request tracking, distributed tracing, and authentication validation.
- An `Arc<dyn Storage>` trait abstracts persistence behind the service logic, defaulting to local filesystem while remaining swappable for future backends.

## Topics Covered

`grpc streaming uploads` · `bounded memory transfers` · `tonic and tokio runtime` · `axum rest shim` · `pluggable storage trait` · `sha-256 chunk validation` · `kubernetes health probes` · `http2 graceful shutdown`

## Related Videos

- [Architecting with Tonic](https://youtu.be/90hw9qwXbbw) — Development · 152 views · May 2, 2026 · [Details](90hw9qwXbbw.md) (shared: `grpc` · `tonic` · `tokio`)
- [The Rust Architect's Sketchbook](https://youtu.be/7zFqW-ZcEbo) — Development · 93 views · Jan 8, 2026 · [Details](7zFqW-ZcEbo.md) (shared: `grpc` · `tonic` · `tokio`)
- [The Microservices Communication Playbook](https://youtu.be/L9ypC5863yA) — Development · 124 views · Apr 24, 2026 · [Details](L9ypC5863yA.md) (shared: `grpc` · `streaming` · `tonic`)
- [AX: The Distributed Agent Runtime](https://youtu.be/xiTVDbJscik) — Development · 60 views · May 23, 2026 · [Details](xiTVDbJscik.md) (shared: `grpc` · `streaming` · `runtime`)
- [ra-token-authority](https://youtu.be/0ttrfTfP864) — Development · 23 views · Jan 16, 2026 · [Details](0ttrfTfP864.md) (shared: `tokio` · `axum` · `kubernetes`)

---
*Auto-generated on May 6, 2026. Back to [development](../development.md) · [index](../index.md).*
