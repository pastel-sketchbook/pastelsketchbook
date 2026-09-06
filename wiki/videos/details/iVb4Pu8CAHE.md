---
type: video
videoId: iVb4Pu8CAHE
category: kubernetes
tags: [idp, adr]
views: 41
date: 2026-08-24T23:00:42Z
summarized: 2026-08-28T03:00:00.000Z
---

# Securing Enterprise Agentic Al at Scale

> [kubernetes](../kubernetes.md) · 41 views · Aug 24, 2026
> [Watch on YouTube](https://youtu.be/iVb4Pu8CAHE)

## Summary

Introduces ADR (agentic AI detection and response), an enterprise agentic security framework developed at Uber and slated for MLSys 2026 that closes the EDR observability gap by reconstructing the full causal chain from user prompt through MCP host → LLM → MCP servers → MCP tools to environment outcome. Its four-pillar architecture — ADR sensor (high-fidelity observability), two-tier LLM detection (online triage + deep investigation), ADR explorer (offline red-teaming), and ADR bench — is evaluated on ADR bench (302 tasks across 133 MCP servers in 14 enterprise categories with 17 attack techniques) and organized by a 17-technique agentic threat taxonomy.

## Key Takeaways

- Agentic security crisis via MCP tool chain: expanded agent capabilities and intricate MCP host → LLM tool-use request → MCP server invocation → MCP tools execution enable three primary risks — data exfiltration via tool use, unauthorized access/lateral movement via compromised MCP servers, and operational disruption via malicious tool execution causing downtime/resource exhaustion.
- ADR sensor captures full causal chain `prompt -> reasoning -> MCP invocation -> outcome` and semantic intent, versus legacy EDR black-box that observes only outcomes (file writes/network calls) and cannot distinguish benign saves from credential exfiltration — sensor streams from endpoints (SQLite/JSONL caches, Cursor/Kline/Cloud Code) via GCP Cloud Logging → Hive/Elasticsearch and secured Kafka → Elasticsearch/detection signals with 0.182s avg runtime and zero workflow disruption.
- Two-tier online detection mirrors SOC workflows: Tier 1 fast triage screens 100% events with lightweight LLM prompts, short-circuiting 40.7% of tasks as benign at $0.017/2.3s with high recall; Tier 2 deep investigation analyzes escalated suspicious signals with high precision at $0.029/29.7s, grounded in source-code provider (MCP tool implementation, -15.5% F1 without it), threat-intelligence repository (EAS-tagged tactics), and YAML policy store.
- ADR bench mirrors production class imbalance — 86.1% benign / 13.9% malicious, avg 28.5 tool calls (long tail to 100) across 302 tasks, 133 MCP servers in 14 categories (developer tools, research/data, security most prominent) and 17 techniques; agentic threat taxonomy spans 5 categories fully covered in bench — initial access (6, e.g., indirect prompt injection, insecure supply chain), permission abuse (2, e.g., excessive tool permissions), security control bypass (3, e.g., tool shadowing, malicious collusion), reasoning manipulation (4, e.g., semantic data poisoning), operational impact (2, e.g., resource exhaustion).
- Real Uber deployment at 7,200+ hosts scaled from first session Dec 15, 2024 to >100 daily sessions Apr 10, 2025 to >10,000 daily sessions Oct 28, 2025 with shift-left to proactive prevention via pre-prompt hooks in Cursor and Cloud Code, blocking 206 true-positive credential leaks pre-transmission at 97.2% precision and zero false positives (vs competitors 30-40 FPs); Agent Flare case traces rigged Jira ticket → Cursor Jira MCP fetch → indirect prompt injection → local secrets read → ADR blocks HTTP exfiltration by detecting semantic deviation.

## Topics Covered

`agentic ai security adr` · `mcp host server tools` · `edr observability gap` · `two-tier llm detection` · `adr bench enterprise benchmark` · `agentic threat taxonomy 17 techniques` · `agent flare jira injection`

## Tags

[idp](../tags/idp.md) · [adr](../tags/adr.md)

## Related Videos

- [Architecting Al at Global Scale](https://youtu.be/PofJfj6nRuw) — Kubernetes · 5 views · Jun 11, 2026 · [Details](PofJfj6nRuw.md) (shared: `agentic` · `taxonomy`)
- [Azure Linux 4.0 and the Al-Native Cloud Era](https://youtu.be/o9x4daXS4Rk) — Kubernetes · 33 views · Jul 5, 2026 · [Details](o9x4daXS4Rk.md) (shared: `agentic` · `host`)
- [Orchard: An Open Foundation for Agentic Modeling Research](https://youtu.be/knxE_Pg2JBA) — Kubernetes · 15 views · Aug 27, 2026 · [Details](knxE_Pg2JBA.md) (shared: `agentic` · `bench`)
- [Deploying Istio Service Mesh on AWS](https://youtu.be/hs7CiLpLgnY) — Kubernetes · 3 views · Jul 23, 2026 · [Details](hs7CiLpLgnY.md) (shared: `enterprise` · `agent`)
- [Microsoft Agent Governance Toolkit](https://youtu.be/MFiVlaMYmwM) — Security · 255 views · May 22, 2026 · [Details](MFiVlaMYmwM.md) (shared: `agentic` · `security` · `mcp`)

---
*Auto-generated on Aug 28, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
