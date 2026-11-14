---
type: video
videoId: NC5_Yru5k7Q
category: security
tags: [ai, fido2, passwordless]
views: 4
date: 2026-11-06T00:00:36Z
summarized: 2026-11-06T13:45:00.000Z
---

# Obsolete by Design

> [security](../security.md) · 4 views · Nov 6, 2026
> [Watch on YouTube](https://youtu.be/NC5_Yru5k7Q)

## Summary

This session declares legacy shared-secret authentication obsolete in the AI age and rebuilds identity on cryptographic proof. It traces how AI rewrites attack economics — scaled spear phishing, synthesized stuffing, memory-extracting infostealers, and machine-paced token leakage — then establishes the asymmetric architecture of FIDO2/WebAuthn passkeys: hardware-bound key pairs, secure enclaves with local biometric or PIN checks, origin domain binding, and per-service uniqueness, closing with the operational realities of recovery, ecosystem sync, and legacy deprecation.

## Key Takeaways

- Recognize the shared-secret architectural flaw: passwords, API keys, and session tokens must be transmitted and stored on both sides, so any compromise of channel or server yields structurally stealable secrets no password complexity can protect.
- Reprice authentication against AI attack economics: generative spear phishing bypasses human skepticism at scale, ML synthesizes high-realism password variants from breach patterns, AI-assisted infostealers extract credentials from memory and autofill caches, and autonomous delegation leaks improperly scoped long-lived human tokens — defending a static shared secret becomes unsustainable.
- Replace secrets with proof: the private key never leaves the device; the server issues a challenge, local verification unlocks the secure enclave, the device signs it and returns only the signature, and the server validates against the stored public key — no stealable credentials exist and intercepted traffic is mathematically useless.
- Trust passkeys structurally, not via user vigilance: possession (hardware key) plus inherence (biometric scan or local PIN) unlocks the enclave with no biometric data transmitted; origin domain binding makes AI-generated spoofed sites refuse credential release, and unique per-service key pairs eliminate credential reuse — stuffing, spraying, and phishing become technically impossible rather than merely difficult.
- Grade the method ladder by phishing resistance: FIDO2 passkeys and hardware keys are the gold standard (hardware keys for high-privilege administrators; passkeys for frictionless scale); magic links and email/SMS OTPs fail as shared-secret tokens; push notifications need strict number matching to counter prompt fatigue; and production rollouts must design account recovery rigorously (backup codes, secondary passkeys, dedicated keys), ride Apple/Google/Microsoft cross-platform sync, and retire SMS/magic-link fallbacks — FIDO2-only for high-value accounts, now a zero-trust baseline mandated by national cybersecurity bodies.

## Topics Covered

`shared secret obsolescence` · `ai attack economics` · `asymmetric challenge-response` · `fido2 and webauthn` · `secure enclave and local verification` · `origin domain binding` · `method security ladder` · `passkey deployment realities`

## Tags

[ai](../tags/ai.md) · [fido2](../tags/fido2.md) · [passwordless](../tags/passwordless.md)

## Related Videos

- [The Passwordless Future](https://youtu.be/w03Swz2xkOY) — Security · 49 views · Nov 10, 2026 · [Details](w03Swz2xkOY.md) (shared: `economics` · `asymmetric` · `webauthn`)
- [The Hardware-Bound Security Blueprint](https://youtu.be/neqE9X2kSuY) — Security · 19 views · Jul 2, 2026 · [Details](neqE9X2kSuY.md) (shared: `secure` · `enclave` · `security`)
- [Custom Graphs in Microsoft Sentinel (Preview)](https://youtu.be/u8XCBK6lGw0) — Security · 67 views · Apr 11, 2026 · [Details](u8XCBK6lGw0.md) (shared: `attack` · `security`)
- [Anatomy of a Supply Chain Attack](https://youtu.be/taBP0Fr3uSQ) — Security · 38 views · Mar 26, 2026 · [Details](taBP0Fr3uSQ.md) (shared: `attack` · `security`)
- [Architecting the AI Security Stack](https://youtu.be/bkNYrlwcVxo) — Security · 33 views · Nov 1, 2026 · [Details](bkNYrlwcVxo.md) (shared: `attack` · `security`)

---
*Auto-generated on Nov 6, 2026. Back to [security](../security.md) · [index](../index.md).*
