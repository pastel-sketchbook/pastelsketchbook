---
type: video
videoId: 2kvYb2pVe5o
category: development
tags: []
views: 32
date: 2025-12-27T21:55:52Z
summarized: 2026-04-16T22:00:00.000Z
---

# From Blueprint to Battlefield

> [development](../development.md) · 32 views · Dec 27, 2025
> [Watch on YouTube](https://youtu.be/2kvYb2pVe5o)

## Summary

This video explores the journey of deploying secure federated identity systems from design to production, using NIST SP 800-63C standards and formal analysis to stress-test OpenID Connect (OIDC) and OAuth 2.0 implementations. It highlights the complex multi-party attack surface inherent in OIDC's flexibility and optional features, which informal security evaluations frequently overlook.

## Key Takeaways

- NIST SP 800-63C provides the authoritative model for identity federation, built around three core actors: the subscriber, the identity provider, and the relying party.
- OIDC's inherent flexibility and many optional features create a large attack surface vulnerable to subtle but devastating attacks often missed by informal evaluations.
- Federated identity delegates user authentication to trusted identity providers (Google, Microsoft, PayPal) using cryptographically signed tokens built on OAuth 2.0.
- Rigorous formal analysis is necessary beyond informal security review to ensure federated identity frameworks withstand real-world deployment complexities.

## Topics Covered

`openid connect` · `oauth 2.0` · `federated identity` · `nist sp 800-63c` · `formal security analysis` · `single sign-on`

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
