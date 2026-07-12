---
type: video
videoId: jOw6d5zH658
category: development
tags: [agent, skill, tool, waza]
views: 7
date: 2026-05-09T14:32:47Z
summarized: 2026-05-09T22:30:00.000Z
---

# Engineering AI Agent Mastery with Waza

> [development](../development.md) · 7 views · May 9, 2026
> [Watch on YouTube](https://youtu.be/jOw6d5zH658)

## Summary

Waza is a structured methodology and CLI for engineering AI agent skills under a measure-refine-master loop, replacing ad-hoc prompt scripting with a rigorous evaluation discipline. It uses declarative YAML eval specifications, fixture isolation, pluggable graders, and LLM-as-judge rubrics to validate non-deterministic agent behavior reproducibly. Continuous improvement is sealed by Azure Blob Storage for historical baselines, an interactive web dashboard, CI/CD gating with deterministic mock executors, and proactive token-budget enforcement.

## Key Takeaways

- Non-deterministic agent outputs make traditional unit tests insufficient; Waza standardizes evaluation around a measure-refine-master pipeline scaffolded by `waza init` and `waza new eval`.
- Benchmarks are defined declaratively in `eval.yaml` with static or CSV-driven inputs, lifecycle hooks, and pluggable graders, then executed concurrently with caching via `waza run`.
- Cross-model A/B comparisons via `waza compare` track per-task score deltas, pass-rate differences, and aggregate token usage to drive evidence-based iteration.
- Readiness reports gate submissions across compliance scoring, token budget verification, eval suite presence, spec compliance, and advisory checks before code can merge.
- CI/CD integration uses a deterministic mock executor to eliminate live API key dependencies and flaky LLM calls, with strict exit-code routing (0/1/2) controlling merge gates.
- `waza tokens profile` and `waza tokens compare` enforce absolute and percentage token-growth thresholds against the main branch to protect agent context windows.
- Azure Blob Storage organizes JSON results by skill name and run ID, while `waza serve` powers an interactive dashboard with score distributions, pass/fail charts, and trend indicators.

## Topics Covered

`ai agent evaluation` · `declarative yaml eval specs` · `cross model ab comparison` · `llm as judge graders` · `cicd mock executor` · `token budget enforcement` · `azure blob historical baseline` · `agent skill scaffolding` · `interactive web dashboard`

## Tags

[agent](../tags/agent.md) · [skill](../tags/skill.md) · [tool](../tags/tool.md) · [waza](../tags/waza.md)

## Related Videos

- [The Complete Guide to Building Skills for Claude](https://youtu.be/JeqaHMmSh1s) — Development · 709 views · Feb 27, 2026 · [Details](JeqaHMmSh1s.md) (shared: `yaml` · `model` · `token`)
- [The AI Copilot Era Equation](https://youtu.be/xwEN7oZFvdw) — Development · 53 views · Jun 10, 2026 · [Details](xwEN7oZFvdw.md) (shared: `model` · `comparison` · `token`)
- [The Open Market of Al Coding](https://youtu.be/T-NdEF6btbg) — Development · 96 views · Apr 5, 2026 · [Details](T-NdEF6btbg.md) (shared: `agent` · `model` · `token`)
- [Mastering Serde in Rust ](https://youtu.be/RDa6WtZmW8E) — Development · 50 views · Jan 28, 2026 · [Details](RDa6WtZmW8E.md) (shared: `yaml` · `model`)
- [The Professional Rust Toolbox](https://youtu.be/js95nIDeA-c) — Development · 8 views · Jan 8, 2026 · [Details](js95nIDeA-c.md) (shared: `model` · `web`)

---
*Auto-generated on May 9, 2026. Back to [development](../development.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Architect's Sketchbook](zmd://wiki/books/architects-sketchbook.md) — Chapter 3** (confidence: 33%)_
