---
type: video
videoId: CA1nlknmR3g
category: security
tags: []
views: 33
date: 2026-03-25T08:25:20Z
summarized: 2026-04-16T22:00:00.000Z
---

# Containing the Untrusted Agent

> [security](../security.md) · 33 views · Mar 25, 2026
> [Watch on YouTube](https://youtu.be/CA1nlknmR3g)

## Summary

This video presents a defense-in-depth architecture for mitigating server-side request forgery (SSRF) attacks originating from large language model agents. Unlike traditional SSRF where attackers manually craft malicious URLs, LLM SSRF exploits the model's autonomous tool-calling capabilities to generate unauthorized network requests from natural language prompts. The blueprint uses concentric security tiers so that even if one layer fails, the core system remains protected from unauthorized internal access.

## Key Takeaways

- LLM SSRF represents a fundamentally new attack vector where natural language prompts are autonomously translated into malicious network requests without explicit URL manipulation.
- A layered defense-in-depth architecture with multiple redundant security tiers is essential for containing untrusted AI agents that can interact with external tools and APIs.
- Traditional SSRF defenses are insufficient because LLM agents can autonomously craft requests to internal metadata APIs and restricted resources.
- The concentric ring model ensures that a single point of failure does not compromise the entire system's security posture.

## Topics Covered

`llm ssrf` · `defense in depth` · `server-side request forgery` · `ai agent security` · `network access control` · `layered security architecture`

## Related Videos

- [Securely Exposing AKS Applications](https://youtu.be/A7eoKD5m6Ek) — Kubernetes · 9 views · Jan 8, 2026 · [Details](A7eoKD5m6Ek.md) (shared: `defense in depth` · `defense` · `depth`)
- [Shannon: Autonomous Penetration Testing](https://youtu.be/JfGgWiiCTA0) — Security · 44 views · Feb 14, 2026 · [Details](JfGgWiiCTA0.md) (shared: `agent` · `security`)
- [The Strategic Roadmap for Data Classification](https://youtu.be/uhXcsWYhdkA) — Security · 16 views · Mar 2, 2026 · [Details](uhXcsWYhdkA.md) (shared: `security` · `architecture`)
- [The NIST Cybersecurity Framework 2.0](https://youtu.be/1VjSLqfPf9s) — Security · 18 views · Mar 8, 2026 · [Details](1VjSLqfPf9s.md) (shared: `security`)
- [The Orchestrator's Blueprint](https://youtu.be/Oa3jaLNSZvM) — Security · 36 views · Feb 28, 2026 · [Details](Oa3jaLNSZvM.md) (shared: `security`)

---
*Auto-generated on Apr 16, 2026. Back to [security](../security.md) · [index](../index.md).*
