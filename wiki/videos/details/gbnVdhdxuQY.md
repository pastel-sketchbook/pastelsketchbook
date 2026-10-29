---
type: video
videoId: gbnVdhdxuQY
category: development
tags: [workflow, azure functions, event]
views: 1
date: 2026-10-28T23:00:01Z
summarized: 2026-10-29T00:35:00.000Z
---

# Dynamic Workflows in Azure Functions Hosted Skills

> [development](../development.md) · 1 views · Oct 28, 2026
> [Watch on YouTube](https://youtu.be/gbnVdhdxuQY)

## Summary

This session introduces dynamic workflows in Azure Functions hosted skills — durable, AI-led execution for event-driven architectures. It prices the token, latency, and reliability taxes of recursive LLM loops, then shows how separating planning from execution fixes them: the LLM reads the prompt once, synthesizes the goal into a DAG execution blueprint, and hands orchestration to a durable serverless engine that never re-enters model context. Coverage spans three-layer defense in depth, the map-reduce multi-agent pattern, durability guarantees, event-driven scenarios like incident triage and invoice processing, and a 10-service benchmark with byte-for-byte output equivalence.

## Key Takeaways

- Break the three taxes by planning once: recursive LLM loops reprocess full context every turn (quadratic token consumption), chain sequential inferences (20+ round trips for 10 tool calls), and saturate attention until validations get skipped — the blueprint as a DAG confines orchestration data to the durable engine.
- Lean on durable guarantees: crash recovery resumes from exact state on another instance, retry policies with exponential backoff run outside the LLM, scale-to-zero parks workflows waiting on async events for up to 24 hours, and the durable task scheduler audits every orchestration timeline, input, and output.
- Enforce defense in depth across the lifecycle: constraint planning whitelists tools and sub-agents at generation, pre-flight validation structurally rejects cyclic DAGs, unauthorized tool calls, and unverified dynamic templates before launch, and every runtime node reauthorizes against the active security policy so mid-run permission revocations immediately block pending tasks.
- Apply the map-reduce intelligence pattern: fan out parallel sub-agents on smaller, faster models for retrieval, parsing, and filtering, then converge distilled results into one high-reasoning skill reserved for final synthesis — maximizing throughput while slashing compute and token costs.
- Pick the execution mode by workload: dynamic workflows for large intermediate payloads, reassuringly durable long-running processes, and brittle external APIs; standard LLM loops for short single-turn tasks and open-ended exploratory reasoning — validated on a 10-service benchmark at 93.1% output-token reduction (23,000 → 655 tokens), latency collapse from 247.1s to 12.7s, and byte-for-byte identical outputs; adoption is minimal with the `@workflow` decorator and the preview `azure-functions` agents runtime Python package.

## Topics Covered

`dynamic workflows` · `plan-execute separation` · `durable functions engine` · `llm context taxes` · `dag blueprint validation` · `task-level authorization` · `map-reduce agent pattern` · `event-driven orchestration`

## Tags

[workflow](../tags/workflow.md) · [azure functions](../tags/azure%20functions.md) · [event](../tags/event.md)

## Related Videos

- [AX: The Distributed Agent Runtime](https://youtu.be/xiTVDbJscik) — Development · 97 views · May 23, 2026 · [Details](xiTVDbJscik.md) (shared: `durable` · `agent` · `orchestration`)
- [Architecting Al in Software Engineering](https://youtu.be/yXZnBtdDTFk) — Development · 80 views · May 25, 2026 · [Details](yXZnBtdDTFk.md) (shared: `context` · `validation` · `pattern`)
- [Stitch Agent Skills](https://youtu.be/fv61JXUCbeo) — Development · 299 views · Apr 5, 2026 · [Details](fv61JXUCbeo.md) (shared: `context` · `validation` · `orchestration`)
- [The Open Market of Al Coding](https://youtu.be/T-NdEF6btbg) — Development · 98 views · Apr 5, 2026 · [Details](T-NdEF6btbg.md) (shared: `context` · `agent` · `orchestration`)
- [Parallel Agents in Zed](https://youtu.be/0wth_46Vtmo) — Development · 303 views · Aug 4, 2026 · [Details](0wth_46Vtmo.md) (shared: `workflows` · `context` · `agent`)

---
*Auto-generated on Oct 29, 2026. Back to [development](../development.md) · [index](../index.md).*
