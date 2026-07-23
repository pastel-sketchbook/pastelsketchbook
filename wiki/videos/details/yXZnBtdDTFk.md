---
type: video
videoId: yXZnBtdDTFk
category: development
tags: [ai, tdd, bdd, strangler fig]
views: 10
date: 2026-05-25T11:34:21Z
summarized: 2026-05-25T14:00:00.000Z
---

# Architecting AI in Software Engineering

> [development](../development.md) · 10 views · May 25, 2026
> [Watch on YouTube](https://youtu.be/yXZnBtdDTFk)

## Summary

This talk contrasts greenfield and brownfield strategies for integrating AI coding agents into software engineering, framing both as forms of context engineering. It introduces an AI-driven TDD loop where the test suite is the deterministic compiler for AI output, and pairs it with reverse-BDD migration and the strangler fig pattern for safely modernizing legacy estates.

## Key Takeaways

- Greenfield work uses AI for rapid scaffolding and clean schemas, while brownfield work uses AI for reverse engineering, dependency mapping, and incremental refactoring of undocumented systems.
- In AI TDD, the human defines an immutable contract and the AI generates tests first, then implementation; failing test output is fed back as the next correction prompt.
- Reverse BDD extracts Gherkin scenarios from legacy source, has domain experts verify them, then runs the same Cucumber suite against both old and new modules to guarantee behavioral parity.
- The strangler fig pattern wraps legacy endpoints in API gateway facades and canaries 1% of live traffic to AI-built microservices, comparing responses byte-for-byte before wider rollout.
- Greenfield projects must enforce strict MVP governance and early machine-readable guardrails because today's clean slate inevitably becomes tomorrow's brownfield codebase.

## Topics Covered

`context engineering` · `ai tdd loop` · `reverse bdd migration` · `strangler fig pattern` · `greenfield guardrails` · `brownfield retrofit` · `regression safety net` · `behavior-driven canary validation`

## Tags

[ai](../tags/ai.md) · [tdd](../tags/tdd.md) · [bdd](../tags/bdd.md) · [strangler fig](../tags/strangler%20fig.md)

## Related Videos

- [The Strangler Fig Pattern](https://youtu.be/4aAyFYemYD8) — Development · 58 views · Apr 28, 2026 · [Details](4aAyFYemYD8.md) (shared: `migration` · `strangler fig pattern` · `strangler`)
- [Modern Dart](https://youtu.be/JBh6rzeS-Qc) — Development · 81 views · Jan 20, 2026 · [Details](JBh6rzeS-Qc.md) (shared: `pattern` · `safety`)
- [rr-mailtrap: The Developer's SMTP Sandbox](https://youtu.be/SuuZW_fuEFc) — Development · 26 views · May 8, 2026 · [Details](SuuZW_fuEFc.md) (shared: `safety` · `net` · `validation`)
- [The Pragmatic Go Developer](https://youtu.be/oxNF_GNuWpE) — Development · 45 views · Mar 10, 2026 · [Details](oxNF_GNuWpE.md) (shared: `context` · `net`)
- [Reins: The Framework for Al-Assisted Development](https://youtu.be/zrP3muXzQX4) — Development · 80 views · Mar 23, 2026 · [Details](zrP3muXzQX4.md) (shared: `context` · `guardrails`)

---
*Auto-generated on May 25, 2026. Back to [development](../development.md) · [index](../index.md).*
