---
type: video
videoId: zoT6ifQjXvQ
category: development
tags: []
views: 34
date: 2026-07-11T22:47:15Z
summarized: 2026-07-12T18:00:00.000Z
---

# Architecting Enterprise AI Agents

> [development](../development.md) · 34 views · Jul 11, 2026
> [Watch on YouTube](https://youtu.be/zoT6ifQjXvQ)

## Summary

This talk presents a technical blueprint for routing user mentions in enterprise AI agents built on Microsoft Teams and Slack, comparing the Teams AI Library (four-layer architecture: rich UI, AI integration, core interactions, deployment/config) against Slack's API-first, message-driven automation model. It covers mention stripping pipelines, user vs tag group mention resolution, and the fundamental architectural tension between enterprise governance (Teams' UI-first, graph API, Azure AD) and agent autonomy (Slack's peer-based threading, event pipeline, zero-ceremony webhooks).

## Key Takeaways

- The Teams AI Library replaces the raw Bot Framework's turn-context loop with a native application router organized into four layers: rich UI interfaces (adaptive cards, message extensions), AI integration (planners, MCP graph capabilities), core interactions (events, proactive messaging), and deployment/config (manifest, sovereign cloud, SSO).
- Raw mentions must go through a stripping pipeline — a turn-before-initialization hook parses the incoming activity, forwards clean conversational content to the LLM planner, and discards the formatted mention tag to avoid prompt pollution.
- User mentions resolve via Entra ID (29- prefix) with no special graph permissions, while tag group mentions require `TeamworkTag.Read` or `TeamworkTag.ReadWrite` permissions and a multi-step graph API sequence to discover the ta- prefixed tag ID.
- Teams' UI-first architecture treats bots as bolted-on overlays requiring Azure AD registration, admin consent, and graph permissions, whereas Slack was engineered as an API-first automation platform where bots are peer citizens with native threading and per-thread memory.
- The deployment rule for enterprise agents should be based on the agent's primary mandate: choose Slack for agent autonomy (rapid iteration, multi-agent ecosystems, low-latency message-driven reasoning) and Teams for enterprise compliance (deep M365 integration, SharePoint workflows, strict Entra ID governance).

## Topics Covered

`teams ai library` · `mention routing architecture` · `inbound mention stripping` · `tag group mention resolution` · `graph api tag discovery` · `slack api-first vs teams ui-first` · `enterprise agent habitat` · `extensibility paradox governance`

## Related Videos

- [The pkg.go.dev API](https://youtu.be/zWuFvi-0Go4) — Development · 19 views · May 23, 2026 · [Details](zWuFvi-0Go4.md) (shared: `architecture` · `resolution` · `graph`)
- [OpenCV Library Architecture and Capabilities](https://youtu.be/ZfAc2pqcS-4) — Development · 59 views · May 11, 2026 · [Details](ZfAc2pqcS-4.md) (shared: `library` · `architecture` · `graph`)
- [Book-Finder Architecture](https://youtu.be/tyR8SdHpOeY) — Development · 31 views · Apr 12, 2026 · [Details](tyR8SdHpOeY.md) (shared: `library` · `architecture` · `api`)
- [The AI Copilot Era Equation](https://youtu.be/xwEN7oZFvdw) — Development · 53 views · Jun 10, 2026 · [Details](xwEN7oZFvdw.md) (shared: `architecture` · `enterprise` · `paradox`)
- [Pathways Over Tools](https://youtu.be/84M1mVL0cjo) — Development · 19 views · Mar 9, 2026 · [Details](84M1mVL0cjo.md) (shared: `architecture` · `enterprise`)

---
*Auto-generated on Jul 12, 2026. Back to [development](../development.md) · [index](../index.md).*
