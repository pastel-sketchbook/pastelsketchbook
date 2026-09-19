---
type: video
videoId: QJORdrOMpQo
category: development
tags: [commutative, encryption, psi, rust, go]
views: 19
date: 2026-09-16T23:00:35Z
summarized: 2026-09-19T21:15:00.000Z
---

# The Mathematics of Invisible Intersections

> [development](../development.md) · 19 views · Sep 16, 2026
> [Watch on YouTube](https://youtu.be/QJORdrOMpQo)

## Summary

This session explains how commutative encryption powers private set intersection for privacy-preserving data collaboration across healthcare, finance, and adtech. It contrasts order-dependent block ciphers like AES with order-independent commutative schemes built on modular exponentiation and elliptic-curve scalar multiplication, walks through the five-step double-encryption PSI flow, and shows how Google's Private Join and Compute combines ECC commutativity with homomorphic aggregation, hardened by salting, hashing, blinding, and OPRFs under a semi-honest threat model.

## Key Takeaways

- Commutative encryption guarantees EA(EB(x)) equals EB(EA(x)), enabling two parties to compare double-encrypted datasets and find intersections without sharing keys or revealing non-overlapping records.
- Standard block ciphers like AES cannot commute because operations such as MixColumns deliberately destroy algebraic symmetry, making them suited to TLS tunnels while commutative schemes suit asynchronous multi-party computation.
- Elliptic-curve scalar multiplication is the production standard for commutative PSI, displacing academic commutative ElGamal variants and deprecated RSA exponent-combination constructions.
- The five-step PSI flow of encrypt, re-encrypt, exchange, re-encrypt, and compare ciphertexts directly reveals only matching elements while keeping raw identifiers fully de-identified.
- Dictionary attacks are the primary threat to deterministic commutative ciphers, mitigated with salts, randomization, hashing, blinding, and OPRFs, while semi-honest guarantees still require audits or trusted execution environments to approach zero trust.

## Topics Covered

`commutative encryption` · `private set intersection` · `elliptic curve psi` · `double encryption flow` · `homomorphic aggregation` · `oprf hardening` · `semi-honest threat model` · `private join compute`

## Tags

[commutative](../tags/commutative.md) · [encryption](../tags/encryption.md) · [psi](../tags/psi.md) · [rust](../tags/rust.md) · [go](../tags/go.md)

## Related Videos

- [The AI Copilot Era Equation](https://youtu.be/xwEN7oZFvdw) — Development · 53 views · Jun 10, 2026 · [Details](xwEN7oZFvdw.md) (shared: `model` · `compute`)
- [The Universal Engine for LLM Inference](https://youtu.be/OKXt-PJUuzE) — Development · 98 views · Jun 21, 2026 · [Details](OKXt-PJUuzE.md) (shared: `model` · `compute`)
- [TigerStyle: The Architecture of Elegance](https://youtu.be/eJlXFaZNP6g) — Development · 61 views · May 5, 2026 · [Details](eJlXFaZNP6g.md) (shared: `curve` · `flow`)
- [NotebookLM's Intelligence Flow](https://youtu.be/IF5sNQH-01c) — Development · 47 views · Dec 28, 2025 · [Details](IF5sNQH-01c.md) (shared: `flow`)
- [The Programmer's Guide to Essential RFCs](https://youtu.be/LackTxguXFg) — Development · 111 views · Apr 10, 2026 · [Details](LackTxguXFg.md) (shared: `model`)

---
*Auto-generated on Sep 19, 2026. Back to [development](../development.md) · [index](../index.md).*
