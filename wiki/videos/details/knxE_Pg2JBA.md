---
type: video
videoId: knxE_Pg2JBA
category: kubernetes
tags: [idp, k8s, agent]
views: 1
date: 2026-08-27T23:00:20Z
summarized: 2026-08-28T03:00:00.000Z
---

# Orchard: An Open Foundation for Agentic Modeling Research

> [kubernetes](../kubernetes.md) · 1 views · Aug 27, 2026
> [Watch on YouTube](https://youtu.be/knxE_Pg2JBA)

## Summary

Orchard is an open foundation for agentic modeling research centered on a Kubernetes-native sandbox (orchard-env) with Calico deny-egress network isolation, pre-installed harnesses (Codex/Cloud/Pi) via init-container injection, a REST API and Python sync/async SDK with context-manager auto-cleanup plus an in-pod agent that bypasses the Kubernetes API server for ultra-low-latency direct execution, and a vendored slime RL fork purpose-built for efficient multi-turn trajectory rollouts. Its decoupled recipes/trainer/env stack makes research portable by reusing distinct data, train, and eval components instead of rebuilding per study, eliminates the train-deploy mismatch by training directly on live websites and harnesses, and is validated through latency/cost diagnostics and Gwen-family recipes that show strong SWE-Bench and GUI generalization.

## Key Takeaways

- Shared substrate + agentic recipes = portable research: decouples data, training recipes, and evaluation protocols that were historically rebuilt from scratch per study; distinct data/train/eval components become reusable modules, so exploring SWE, browser navigation, or computer-use recipes no longer requires re-engineering the underlying environment.
- Three-layer decoupled stack for multi-turn agents: top recipes layer with open SFT and RL recipes for SWE/GUI/Claw, middle trainer layer with a vendored slime fork for efficient trajectory rollouts and iterative refinement, and base orchard-env Kubernetes-native sandbox with Calico deny-egress + API-key auth, any base image with agent injected via init container, pre-installed Codex/Cloud/Pi on PATH, a REST API for sandbox lifecycle/exec/file IO, Python SDK with sync and async context managers plus auto-cleanup/retries, and an in-pod agent over pod IP that bypasses the API server — a thin service with zero assumptions about harness/trainer/task.
- Diagnostics show drop-in scalability at a fraction of cost/latency: 0.28s command latency vs E2B 0.747s (2.7× slower) and Modal 2.046s (7.3× slower), comparable to SkyPilot code sandbox; 1,000 sandboxes launched end-to-end in 26s at ~154 cmds/s with 100% success (no comparable offer from references); cost for 128 sandboxes × 240h is $673 on spot and $3,362 on-demand vs $7,078–$10,305 for managed services.
- Eliminates train-deploy mismatch: instead of training then re-implementing a simplified deployment (which creates gaps), Orchard trains directly in the deployment environment — live websites and live harnesses (e.g., ZeroClaw/Codex) via OpenForge/OpenWebRL pattern — so changing a harness or deployment config is a command switch, not an image or architecture rebuild, streamlining iteration and ensuring learned behavior transfers to production.
- Recipes, generalization, dataset substrate and credit assignment: Orchard SWE on Gwen 3.5 35B A3B with 107k distilled rollouts, Orchard GUI on Gwen 3VL 4B thinking with 0.4K SFT + 2.2K RL on live tasks achieving 68.4% web average (74.1/67.0/64.0), Orchard Claw on Gwen 3 30B A3B thinking with 0.2K synthetic tasks at 73.9% (59.6% pass@3) and +9.3 pass@3 when swapped onto a stronger harness; transfer emphasizes generalization over peak scores — SWE multilingual 51.0 vs open SWE 32B collapse to 28.7 — enabled by harness-agnostic training, approaching systems 10–30× larger; dataset substrate provides 107,185 SWE multi-turn rollouts at 47.5 avg turns and 3,070 GUI judge-verified multimodal per-step rollouts hosted on Hugging Face as Microsoft/Orchard; roadmap shifts from linear restart (one trajectory = one outcome, reward spread over ~47.5 turns) to stateful tree-structured Monte Carlo search using environment snapshots that share prefix execution and branch K continuations for efficient credit assignment.

## Topics Covered

`orchard agentic research platform` · `kubernetes native sandbox` · `calico network isolation` · `slime rl training fork` · `swe bench generalization` · `harness agnostic training` · `tree-structured monte carlo snapshots` · `python sdk sandbox lifecycle`

## Related Videos

- [Tailscale: The Modular Network Operating System](https://youtu.be/PVwzHpsrVcc) — Kubernetes · 12 views · Aug 10, 2026 · [Details](PVwzHpsrVcc.md) (shared: `kubernetes` · `network` · `isolation`)
- [The Modern Platform Framework](https://youtu.be/rk_3xU9OF-k) — Kubernetes · 29 views · Feb 19, 2026 · [Details](rk_3xU9OF-k.md) (shared: `platform` · `kubernetes`)
- [Agentic Platform Engineering with GitHub Copilot](https://youtu.be/lexZnOlyml0) — Kubernetes · 72 views · Mar 26, 2026 · [Details](lexZnOlyml0.md) (shared: `agentic` · `platform`)
- [Zero Trust in Kubernetes](https://youtu.be/4b-H6ZaoNUE) — Kubernetes · 47 views · Jan 17, 2026 · [Details](4b-H6ZaoNUE.md) (shared: `kubernetes` · `network`)
- [The Golden Path](https://youtu.be/ORjARjbukhY) — Kubernetes · 25 views · Feb 21, 2026 · [Details](ORjARjbukhY.md) (shared: `platform` · `kubernetes`)

---
*Auto-generated on Aug 28, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
