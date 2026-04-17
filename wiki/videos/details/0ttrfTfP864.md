---
type: video
videoId: 0ttrfTfP864
category: development
tags: []
views: 21
date: 2026-01-16T16:34:51Z
summarized: 2026-04-16T22:00:00.000Z
---

# ra-token-authority

> [development](../development.md) · 21 views · Jan 16, 2026
> [Watch on YouTube](https://youtu.be/0ttrfTfP864)

## Summary

This video is a technical deep dive into the ra-token-authority service, a centralized token authority for zero trust service-to-service authentication in Kubernetes and Istio environments. Built with Axum, Tokio, and the rusty-paseto library, it issues PASETO v4.public tokens with automated ED25519 key rotation and exposes a JWKS-like /keys endpoint for public key discovery.

## Key Takeaways

- ra-token-authority issues cryptographically signed PASETO v4.public tokens for service-to-service trust in Kubernetes/Istio zero trust environments.
- Automated key management handles ED25519 key rotation, retention, and garbage collection without manual intervention.
- The service exposes a JWKS-like endpoint at /keys for seamless public key discovery by client services.
- The technology stack (Axum, Tokio, rusty-paseto) is guided by test-driven development as the primary development cadence.

## Topics Covered

`paseto tokens` · `zero trust authentication` · `axum` · `tokio` · `ed25519 key rotation` · `kubernetes security` · `istio`

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
