---
type: video
videoId: bkNYrlwcVxo
category: security
tags: [curiosity, ai, security, aig]
views: 17
date: 2026-11-02T00:00:07Z
summarized: 2026-11-02T23:59:00.000Z
---

# Architecting the AI Security Stack

> [security](../security.md) · 17 views · Nov 2, 2026
> [Watch on YouTube](https://youtu.be/bkNYrlwcVxo)

## Summary

This session architects a unified, layered AI security stack using Tencent's AIG platform and industry benchmarks as the evaluation frame. It establishes the four-layer attack surface — infrastructure, connective protocols (MCP servers, agent skills), agent behavior, and the model itself — then details AIG's scan modules, skill-trust-bench audits, OWASP-aligned agent reviews, and multi-turn jailbreak simulations. It splits the market into OSS self-assessment versus enterprise governance, prescribes a hybrid posture, and closes with a five-phase defense-in-depth pipeline built on Garak, PyRIT, promptfoo, NeMo Guardrails, and Obot.

## Key Takeaways

- Defend all four layers, not just the model: frameworks, databases, and runtime web components (layer 1), MCP servers/APIs/agent skills (layer 2), agent planning and workflow logic (layer 3), and model weights plus alignment boundaries (layer 4) form the attack surface — even a perfectly aligned model is compromised when an adversary exploits connectors or infrastructure beneath it.
- Anchor the stack in AIG's breadth: a Go core drives the web UI, CLI, and rule engine; AI infrastructure scan fingerprints services and matches CVEs across 2,000+ rules on 146 AI web components (Ollama, VLLM, Langflow, MLflow); MCP/skill scan runs multi-stage static + dynamic audits over 14 risk categories to stop instruction hijacking and remote payload execution; agent scan maps OWASP-top-10-for-agents flows to detect prompt injection, privilege escalation, and exfiltration — released under Apache 2.0 with turnkey Docker (including air-gapped) deployments.
- Probe behavior with red-team depth: audit orchestration platforms like Dify and Coze for structured execution flaws, then simulate iterative multi-shot, GOAT, and actor-style attack chains so single-prompt adversarial assumptions never hide multi-turn defeat.
- Split the market by constraint: Tencent AIG-type full-stack self-assessment wins sovereignty, air-gapped control, transparency, and zero licensing; HiddenLayer, MineGuard, and Zscaler win runtime guardrails, automated recurring testing, and compliance mapping to the EU AI Act and ISO — mature enterprises hybridize: AIG for deep air-gapped vulnerability work in development, a commercial platform for continuous production monitoring.
- Run the five-phase open-source lifecycle: AIG fingerprinting and CVE discovery → AIG + Agent Seal auditing of connectors, skills, and workflow logic → Garak + PyRIT broad scans and multi-turn jailbreak probing → promptfoo YAML regressions in CI whenever prompts or models change → NeMo Guardrails plus Obot enforcing real-time filtering and agent access control in production — balancing control (open source) with operationalized governance (enterprise).

## Topics Covered

`four-layer attack surface` · `aig scan platform` · `mcp and skill audit` · `owasp agent top-10` · `multi-turn jailbreak simulation` · `oss vs enterprise governance` · `hybrid security posture` · `five-phase defense pipeline`

## Tags

[curiosity](../tags/curiosity.md) · [ai](../tags/ai.md) · [security](../tags/security.md) · [aig](../tags/aig.md)

## Related Videos

- [Microsoft Agent Governance Toolkit](https://youtu.be/MFiVlaMYmwM) — Security · 354 views · May 22, 2026 · [Details](MFiVlaMYmwM.md) (shared: `mcp` · `audit` · `owasp`)
- [The NIST Cybersecurity Framework 2.0](https://youtu.be/1VjSLqfPf9s) — Security · 26 views · Mar 8, 2026 · [Details](1VjSLqfPf9s.md) (shared: `enterprise` · `security` · `posture`)
- [ZAP: Getting Started with Software Security Testing](https://youtu.be/infh5ZZwvLU) — Security · 25 views · Apr 30, 2026 · [Details](infh5ZZwvLU.md) (shared: `owasp` · `security` · `defense`)
- [Containing the Untrusted Agent](https://youtu.be/CA1nlknmR3g) — Security · 34 views · Mar 25, 2026 · [Details](CA1nlknmR3g.md) (shared: `agent` · `security` · `defense`)
- [Securing the Rust Supply Chain](https://youtu.be/AX1n6m8iZhQ) — Security · 81 views · Sep 18, 2026 · [Details](AX1n6m8iZhQ.md) (shared: `audit` · `security` · `pipeline`)

---
*Auto-generated on Nov 2, 2026. Back to [security](../security.md) · [index](../index.md).*
