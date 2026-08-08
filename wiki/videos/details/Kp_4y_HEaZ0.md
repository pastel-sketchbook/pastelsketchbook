---
type: video
videoId: Kp_4y_HEaZ0
category: security
tags: [password-hashing, argon2, kdf, nist, credentials]
views: 11
date: 2026-06-06T23:00:12Z
summarized: 2026-06-08T23:05:00.000Z

## Related Videos

- [The Joy of Cryptography](https://youtu.be/7dsz_yUpvqM) — Security · 9 views · Jul 27, 2026 · [Details](7dsz_yUpvqM.md) (shared: `key` · `resistance`)
- [The NIST Cybersecurity Framework 2.0](https://youtu.be/1VjSLqfPf9s) — Security · 23 views · Mar 8, 2026 · [Details](1VjSLqfPf9s.md) (shared: `nist`)
- [The Strategic Roadmap for Data Classification](https://youtu.be/uhXcsWYhdkA) — Security · 22 views · Mar 2, 2026 · [Details](uhXcsWYhdkA.md) (shared: `nist`)
- [Escaping the env Ceiling](https://youtu.be/kc1gwl89iyw) — Security · 29 views · Jun 18, 2026 · [Details](kc1gwl89iyw.md) (shared: `entropy`)
- [The 25519 Cryptographic Family](https://youtu.be/MzdV5hjPdsI) — Security · 18 views · Jun 28, 2026 · [Details](MzdV5hjPdsI.md) (shared: `key`)

---

# Winning the Arms Race in Credential Security

> [security](../security.md) · 11 views · Jun 6, 2026
> [Watch on YouTube](https://youtu.be/Kp_4y_HEaZ0)

## Summary

This session traces the evolution of password hashing algorithms as an ongoing arms race between defensive software and accelerating attack hardware (GPUs, ASICs, FPGAs). It contrasts speed-optimized hashes like SHA-256 with deliberately slow, memory-hard key derivation functions, walking from bcrypt and PBKDF2 through scrypt to Argon2id. It closes with modern NIST SP 800-63 credential storage standards that shift the security burden from users onto resilient back-end architecture.

## Key Takeaways

- Password hashing requires deliberate, configurable slowness to impede offline brute-force attacks, the opposite of speed-focused hashes like SHA-256.
- Early defenses fail against modern hardware: bcrypt's 4 KB footprint is GPU-cacheable and capped at 72 bytes, while PBKDF2's zero-memory design enables massive FPGA/GPU parallelization.
- Memory hardness is the key innovation — scrypt forces 16–32 MB of RAM per hash to break the economic scaling advantage of specialized cracking hardware.
- Argon2id is the gold standard, combining data-independent passes (foiling side-channel timing attacks) with data-dependent passes (resisting GPU/ASIC cracking).
- NIST SP 800-63 mandates 128-bit salts, prioritizes passphrase length over complexity rules, drops periodic rotation, screens against breach blocklists, and bans knowledge-based security questions.

## Topics Covered

`password hashing algorithms` · `argon2id hybrid mode` · `memory-hard key derivation` · `bcrypt and pbkdf2 weaknesses` · `scrypt memory cost` · `nist sp 800-63 storage` · `salt and length entropy` · `gpu asic brute-force resistance`

## Tags

[password-hashing](../tags/password-hashing.md) · [argon2](../tags/argon2.md) · [kdf](../tags/kdf.md) · [nist](../tags/nist.md) · [credentials](../tags/credentials.md)
