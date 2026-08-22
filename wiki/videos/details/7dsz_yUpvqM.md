---
type: video
videoId: 7dsz_yUpvqM
category: security
views: 5
date: 2026-07-27T23:00:13Z
summarized: 2026-07-28T23:05:00.000Z
---

# The Joy of Cryptography

> [security](../security.md) · 5 views · Jul 27, 2026
> [Watch on YouTube](https://youtu.be/7dsz_yUpvqM)

## Summary

This talk is a tour of provable security from Mike Rosulek's open-access textbook (MIT Press), contrasting heuristic "patch-after-broken" security with systems built on explicit mathematical definitions and proofs against defined threat models, and walking the cryptographic stack from one-time-pad perfect secrecy through pseudorandom generators (PRG/PRF/PRP), CPA/CCA attack models, RSA trapdoors, hash collision resistance, and zero-knowledge proofs to forward-secret ratcheting and the post-quantum transition.

## Key Takeaways

- Provable security replaces intuition-and-patch with explicit mathematical definitions and rigorous proofs against named threat models, treating cryptography as a structural science rather than a bag of algorithms.
- The one-time pad gives perfect secrecy but demands keys as long as the message, so modern cryptography relaxes to computational security — accepting a negligible failure probability in exchange for practical, pseudorandom-generated keys.
- Pseudorandomness is the engine of modern crypto: a short random seed expanded by a PRG into a stream indistinguishable from random, with PRGs, PRFs, and PRPs as the reusable building blocks.
- Chosen-ciphertext attack (CCA) security — where the adversary gets a decryption oracle — is the gold standard for symmetric encryption, strictly stronger than chosen-plaintext (CPA) security.
- Forward secrecy via key ratcheting ensures that compromise of a current message key cannot decrypt earlier messages, and the post-quantum era requires new mathematical foundations as quantum attacks break classical RSA-based asymmetric crypto.

## Topics Covered

`provable security mindset` · `one time pad perfect secrecy` · `pseudorandom generator prg prf prp` · `chosen plaintext ciphertext attack cpa cca` · `rsa trapdoor key exchange signatures` · `hash collision resistance random oracle` · `zero knowledge proof alibaba cave` · `forward secrecy key ratcheting` · `post quantum cryptography transition`

## Related Videos

- [The 25519 Cryptographic Family](https://youtu.be/MzdV5hjPdsI) — Security · 24 views · Jun 28, 2026 · [Details](MzdV5hjPdsI.md) (shared: `time` · `key` · `exchange`)
- [Shannon: Autonomous Penetration Testing](https://youtu.be/JfGgWiiCTA0) — Security · 60 views · Feb 14, 2026 · [Details](JfGgWiiCTA0.md) (shared: `security` · `proof`)
- [The Strategic Roadmap for Data Classification](https://youtu.be/uhXcsWYhdkA) — Security · 23 views · Mar 2, 2026 · [Details](uhXcsWYhdkA.md) (shared: `security` · `zero`)
- [Custom Graphs in Microsoft Sentinel (Preview)](https://youtu.be/u8XCBK6lGw0) — Security · 63 views · Apr 11, 2026 · [Details](u8XCBK6lGw0.md) (shared: `security` · `attack`)
- [Anatomy of a Supply Chain Attack](https://youtu.be/taBP0Fr3uSQ) — Security · 38 views · Mar 26, 2026 · [Details](taBP0Fr3uSQ.md) (shared: `security` · `attack`)

---
*Auto-generated on Jul 28, 2026. Back to [security](../security.md) · [index](../index.md).*
