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

## Related Videos

- [The Architect's Guide to Modern Token Security](https://youtu.be/pzVOjl6mOD4) — Development · 33 views · Dec 29, 2025 · [Details](pzVOjl6mOD4.md) (shared: `paseto tokens` · `paseto` · `tokens`)
- [Modern Microservice Trust](https://youtu.be/SeYrpzDTn6A) — Development · 19 views · Jan 13, 2026 · [Details](SeYrpzDTn6A.md) (shared: `paseto tokens` · `paseto` · `tokens`)
- [The Client's Guide to 'ra-token-authority'](https://youtu.be/0NLj8g2hQNk) — Development · 12 views · Jan 16, 2026 · [Details](0NLj8g2hQNk.md) (shared: `zero` · `trust` · `authentication`)
- [Zero Trust in Kubernetes](https://youtu.be/4b-H6ZaoNUE) — Kubernetes · 47 views · Jan 17, 2026 · [Details](4b-H6ZaoNUE.md) (shared: `zero` · `trust` · `kubernetes`)
- [Securing Service-to-Service Communication in Kubernetes](https://youtu.be/A4-foXsdQiA) — Kubernetes · 23 views · Jan 14, 2026 · [Details](A4-foXsdQiA.md) (shared: `zero` · `trust` · `kubernetes security`)

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Architect's Sketchbook](zmd://wiki/books/architects-sketchbook.md) — Chapter 4** (confidence: 18%)_
