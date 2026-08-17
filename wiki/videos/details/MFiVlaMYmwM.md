---
type: video
videoId: MFiVlaMYmwM
category: security
views: 16
date: 2026-05-23T04:44:12Z
summarized: 2026-05-24T02:13:04.422Z
---

# Microsoft Agent Governance Toolkit

> [security](../security.md) · 16 views · May 22, 2026
> [Watch on YouTube](https://youtu.be/MFiVlaMYmwM)

## Summary

The Microsoft Agent Governance Toolkit is a public preview framework for enforcing security and control in autonomous AI agent deployments through runtime policy enforcement, zero-trust identity, and execution sandboxing. It achieves 0.00% policy violation rates by using deterministic application-layer intercepts rather than fragile prompt-based safety, with sub-millisecond policy evaluation at 35,000 operations per second.

## Key Takeaways

- Prompt-based safety resulted in a 26.67% policy violation rate during red team testing, while application-layer enforcement via the AGT governance engine achieved 0.00% by intercepting and validating every tool call, resource access, and inter-agent message before execution.
- The policy engine is deterministic and fail-by-default at 0.012ms P50 latency per single rule, supporting YAML, OPA/Rego, and Cedar policy languages through a Python middleware layer.
- Zero-trust identity incorporates quantum-safe credentials (ED25519, ML-DSA65), SPIFFE/SVID compatibility, behavioral trust scoring with decay, and delegation ceilings that prevent child agents from exceeding parent trust levels.
- The OWASP Agentic Top 10 is systematically addressed: goal hijacking blocked by policy engine, excessive capabilities via least privilege, identity abuse via zero-trust framework, memory poisoning via episodic integrity checks, and rogue agents via instant kill switch.
- Cryptographic audit trails use Merkle tree structures for tamper-proof logging, with reconstructible decision bills of materials and native CloudEvents export for SIEM integration.

## Topics Covered

`agent governance` · `zero trust identity` · `runtime policy enforcement` · `execution sandboxing` · `behavioral trust scoring` · `merkle audit trails` · `owasp agentic top 10` · `mcp security gateway`

## Related Videos

- [Unified Passwordless Identity](https://youtu.be/LGKBWq8g1u4) — Security · 2 views · Aug 16, 2026 · [Details](LGKBWq8g1u4.md) (shared: `agent` · `zero` · `trust`)
- [Zero Trust in Kubernetes](https://youtu.be/4b-H6ZaoNUE) — Kubernetes · 47 views · Jan 17, 2026 · [Details](4b-H6ZaoNUE.md) (shared: `zero` · `trust` · `identity`)
- [The Strategic Roadmap for Data Classification](https://youtu.be/uhXcsWYhdkA) — Security · 23 views · Mar 2, 2026 · [Details](uhXcsWYhdkA.md) (shared: `zero` · `trust` · `security`)
- [Shannon: Autonomous Penetration Testing](https://youtu.be/JfGgWiiCTA0) — Security · 59 views · Feb 14, 2026 · [Details](JfGgWiiCTA0.md) (shared: `agent` · `security`)
- [ZAP: Getting Started with Software Security Testing](https://youtu.be/infh5ZZwvLU) — Security · 25 views · Apr 30, 2026 · [Details](infh5ZZwvLU.md) (shared: `owasp` · `security`)

---
*Auto-generated on May 24, 2026. Back to [security](../security.md) · [index](../index.md).*

