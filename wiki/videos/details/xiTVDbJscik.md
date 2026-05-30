---
type: video
videoId: xiTVDbJscik
category: development
views: 14
date: 2026-05-23T14:24:46Z
summarized: 2026-05-24T02:13:04.026Z
---

# AX: The Distributed Agent Runtime

> [development](../development.md) · 14 views · May 23, 2026
> [Watch on YouTube](https://youtu.be/xiTVDbJscik)

## Summary

AX is Google's open-source distributed agent runtime built on an actor-based architecture orchestrated over Kubernetes, providing a resilient backbone for autonomous agentic workflows. It shifts from monolithic agent design to decoupled, isolated actors managed by a central controller with resumable streams, durable event logs, and a gRPC-based agent service interface.

## Key Takeaways

- The architecture shifts from monolithic AI agent codebases to a decoupled actor model with dynamically spawned, isolated actors (planner, RAG, SQL execution) managed by a resilient central runtime optimized for Kubernetes.
- The AX controller coordinates all communication via three internal components: the executor for driving execution logic, the event log for maintaining historical records, and the registry for managing state and entity definitions.
- Resumable streams use sequence numbers in a durable event log — clients reconnect with their last received sequence number and receive only missed events, avoiding full session restarts.
- The system supports four agent integration pathways: native gRPC (Go/Python), ADK (Python), A2A bridge for existing agents, and experimental Colab for Jupyter-based prototyping.
- Currently undergoing refactoring toward a stable release (83.8% Go, 13.5% Python), with planned milestones including bring-your-own-harness protocol, sub-agent suspension/resumption, and anti-gravity as the default harness.

## Topics Covered

`distributed agent runtime` · `actor-based architecture` · `resumable streaming` · `durable event log` · `grpc agent service` · `kubernetes orchestration` · `agent substrate` · `fork and resume semantics`

## Related Videos

- [Architecting with Tonic](https://youtu.be/90hw9qwXbbw) — Development · 151 views · May 2, 2026 · [Details](90hw9qwXbbw.md) (shared: `runtime` · `architecture` · `grpc`)
- [Architecture Review: tn-file-upload](https://youtu.be/UOOkDh4RUbE) — Development · 28 views · May 4, 2026 · [Details](UOOkDh4RUbE.md) (shared: `runtime` · `streaming` · `grpc`)
- [The Compensating Transaction Pattern](https://youtu.be/xlwu0YwE3_Q) — Development · 18 views · Apr 30, 2026 · [Details](xlwu0YwE3_Q.md) (shared: `distributed` · `architecture` · `orchestration`)
- [The Rust Architect's Sketchbook](https://youtu.be/7zFqW-ZcEbo) — Development · 93 views · Jan 8, 2026 · [Details](7zFqW-ZcEbo.md) (shared: `runtime` · `grpc` · `service`)
- [The GitHub Copilot SDK Blueprint](https://youtu.be/Jf1VkCXsmwU) — Development · 33 views · May 28, 2026 · [Details](Jf1VkCXsmwU.md) (shared: `agent` · `runtime` · `orchestration`)

---
*Auto-generated on May 24, 2026. Back to [development](../development.md) · [index](../index.md).*

