---
type: video
videoId: LGKBWq8g1u4
category: security
views: 2
date: 2026-08-16T23:00:17Z
summarized: 2026-08-17T00:57:40Z
---

# Unified Passwordless Identity

> [security](../security.md) · 2 views · Aug 16, 2026
> [Watch on YouTube](https://youtu.be/LGKBWq8g1u4)

## Summary

This talk presents a unified identity architecture that converges human passwordless authentication (WebAuthn/passkeys) and machine/service identities (mutual TLS with client certificates) into a single identity plane anchored by an OIDC/OAuth2 identity provider. It details the dual-track challenge, the WebAuthn credential model and authentication ceremony, and the mTLS + client-credentials token flow with proof-of-possession JWT claims, then closes with a comprehensive threat model and a phased enterprise rollout roadmap covering PKI foundations, human passwordless enrollment, AI agent passwordless, and observability.

## Key Takeaways

- The dual-track challenge splits identity into humans (WebAuthn, passkeys, biometrics trusted to platform authenticators, TPMs, and secure enclaves) versus AI/machine agents (mTLS client certificates, signed tokens, and workload identity rooted in PKI and hardware security modules).
- Passwordless rests on asymmetric cryptography via WebAuthn and passkeys: the private key never leaves the authenticator, the identity provider stores only the public key, and there is no password field — eliminating phishing and credential stuffing.
- The WebAuthn ceremony is a four-step flow — get challenge, browser origin enforcement via navigator.credentials.get, cryptographic signature with user verification, and IDP verification of the signature plus origin binding before issuing OIDC tokens.
- Machine identity uses the mTLS + OAuth2 client-credentials token flow where the issued access token carries a cnf/x5t proof-of-possession claim binding the token to the certificate thumbprint, preventing replay attacks on AI agent tokens.
- A four-phase roadmap stages the rollout: foundations (IDP plus internal CA/PKI and key management), mandated human passwordless, AI workload passwordless via client certificates and mTLS token endpoints, then centralized SIEM observability with risk policies and anomaly detection.

## Topics Covered

`passwordless authentication` · `webauthentication passkeys` · `identity provider oidc` · `mutual tls machine identity` · `proof of possession jwt` · `zero trust architecture` · `workload identity` · `ai agent authentication`

## Related Videos

- [Secure Web App with Azure AD/OAuth2 Proxy](https://youtu.be/rgY4KTMFOMs) — Kubernetes · 82 views · Feb 5, 2026 · [Details](rgY4KTMFOMs.md) (shared: `authentication` · `identity` · `zero trust architecture`)
- [Advanced Microservices Blueprint on Azure Kubernetes Service](https://youtu.be/BiYKKVsJROk) — Kubernetes · 24 views · Apr 1, 2026 · [Details](BiYKKVsJROk.md) (shared: `identity` · `mutual` · `tls`)
- [The Strategic Roadmap for Data Classification](https://youtu.be/uhXcsWYhdkA) — Security · 23 views · Mar 2, 2026 · [Details](uhXcsWYhdkA.md) (shared: `zero trust architecture` · `zero` · `trust`)
- [Zero Trust in Kubernetes](https://youtu.be/4b-H6ZaoNUE) — Kubernetes · 47 views · Jan 17, 2026 · [Details](4b-H6ZaoNUE.md) (shared: `identity` · `zero` · `trust`)
- [Microsoft Agent Governance Toolkit](https://youtu.be/MFiVlaMYmwM) — Security · 250 views · May 22, 2026 · [Details](MFiVlaMYmwM.md) (shared: `identity` · `zero` · `trust`)

---
*Auto-generated on Aug 16, 2026. Back to [security](../security.md) · [index](../index.md).*