---
type: video
videoId: taBP0Fr3uSQ
category: security
tags: []
views: 32
date: 2026-03-26T11:52:33Z
summarized: 2026-04-16T22:00:00.000Z
---

# Anatomy of a Supply Chain Attack

> [security](../security.md) · 32 views · Mar 26, 2026
> [Watch on YouTube](https://youtu.be/taBP0Fr3uSQ)

## Summary

This video dissects the LiteLLM supply chain compromise (PyPI packages 1.82.7 and 1.82.8), attributed to threat actor TeamTNT's ninth campaign phase. It traces the full attack chain from stolen PyPI tokens harvested via a poisoned Trivy CI/CD scanner, through GitHub Actions tag rewriting for Trivy versions 0.69.4/0.69.5, to command-and-control domain registration (checkmarks.zone) and the eventual 3-hour exposure window on March 24, 2026 before PyPI quarantine.

## Key Takeaways

- The attack began with a malicious pull request against Trivy CI that exfiltrated Aquabot credentials, which were then used to compromise downstream packages.
- GitHub Actions tags for Trivy v0.69.4 and v0.69.5 were maliciously rewritten to redirect users to attacker-controlled payloads.
- The LiteLLM compromise affected PyPI packages averaging over 3.4 million daily downloads, with a 3-hour exposure window before quarantine.
- The attack signatures matched TeamTNT's previous campaigns against Trivy and Kics, demonstrating how a single CI/CD scanner exploit can cascade into a major supply chain compromise.

## Topics Covered

`supply chain attack` · `pypi compromise` · `ci/cd security` · `trivy vulnerability` · `github actions tag rewriting` · `litellm` · `credential exfiltration`

## Related Videos

- [Shannon: Autonomous Penetration Testing](https://youtu.be/JfGgWiiCTA0) — Security · 51 views · Feb 14, 2026 · [Details](JfGgWiiCTA0.md) (shared: `security` · `vulnerability`)
- [ZAP: Getting Started with Software Security Testing](https://youtu.be/infh5ZZwvLU) — Security · 24 views · Apr 30, 2026 · [Details](infh5ZZwvLU.md) (shared: `security` · `vulnerability`)
- [Black-Hat LLMs: The End of the 20-Year Security Balance](https://youtu.be/Zeg8zSOvoyE) — Security · 78 views · Mar 31, 2026 · [Details](Zeg8zSOvoyE.md) (shared: `security` · `vulnerability`)
- [Custom Graphs in Microsoft Sentinel (Preview)](https://youtu.be/u8XCBK6lGw0) — Security · 61 views · Apr 11, 2026 · [Details](u8XCBK6lGw0.md) (shared: `attack` · `security`)
- [The NIST Cybersecurity Framework 2.0](https://youtu.be/1VjSLqfPf9s) — Security · 21 views · Mar 8, 2026 · [Details](1VjSLqfPf9s.md) (shared: `security`)

---
*Auto-generated on Apr 16, 2026. Back to [security](../security.md) · [index](../index.md).*
