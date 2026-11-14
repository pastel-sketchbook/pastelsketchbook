---
type: video
videoId: QaqZcVKUcBQ
category: kubernetes
tags: [substrate, gvisor, openrl]
views: 58
date: 2026-11-12T00:00:31Z
summarized: 2026-11-14T11:45:00.000Z
---

# Powering Open Infrastructure for Autonomous Agents

> [kubernetes](../kubernetes.md) · 58 views · Nov 12, 2026
> [Watch on YouTube](https://youtu.be/QaqZcVKUcBQ)

## Summary

This session announces Google Cloud's donation of Agent Substrate, gVisor, and OpenRL to the CNCF, framing open infrastructure for autonomous agents. It contrasts human-scale systems of record with agent-scale systems of action, maps the four-dimension transformation of agentic infrastructure (stateful loops, bursty compute, micro-isolation, 10× density via snapshotting), walks the three pillars — Agent Substrate's actors/gateways/warm-pool architecture, gVisor's user-space kernel isolation with flexible memory, OpenRL's four Python primitives with GPU time slicing — and closes with the joint-stack design, CNCF governance pathways, and GKE general availability.

## Key Takeaways

- Recognize the agent-scale shift: enterprise computing moves from human-scale systems of record (stateless requests against centralized servers) to systems of action (continuous agentic workflows, feedback loops, automated execution) — agents run briefly then pause for model turns, APIs, or human input, so keeping dedicated containers alive through idle waits wastes massive memory and compute.
- Understand why 2010s Kubernetes doesn't fit agents: workloads shift from stateless linear processes to stateful continuous loops, usage from always-on to bursty with long pauses, security from shared host kernels to strict micro-isolation of untrusted code, and orchestration density must scale 10-fold using rapid snapshotting instead of container packing.
- Deploy the three pillars: Agent Substrate separates stateful agents from compute (hotel room, not house — 10× density, sub-500ms suspend/restore, GA on GKE at milestone 1.0); gVisor interposes an application-kernel in user space so untrusted AI-generated code never touches the host kernel, with memory that scales dynamically and native GPU/TPU support; OpenRL runs post-training as a self-hosted Kubernetes loop over four Python primitives (sample, forward, backward, save-state) using GPU time slicing so samplers and trainers share accelerators — reclaiming idle cycles the way Substrate reclaims idle CPU.
- Architect the agent substrate internals: actors hold each agent's memory, files, and identity; gateways enforce inbound/outbound access control and inject secrets; a warm pool of workers provides reusable execution sandboxes drawn from warm Kubernetes capacity.
- Design the stack jointly: Agent Substrate manages workload lifecycle and density across TPU/GPU pools, gVisor wraps processes in the isolation boundary, and OpenRL orchestrates the RL loops on top — feeding one shared, scalable accelerator infrastructure.
- Join the vendor-neutral effort: all three projects are entering CNCF sandbox governance (issues 521 gVisor, 523 Substrate, 518 OpenRL), letting cloud providers, hardware vendors, and independent builders co-invest and shape agentic workloads equally — explore at the project sites and meet the team at KubeCon.

## Topics Covered

`agent-scale systems of action` · `idle-aware agent lifecycles` · `agent substrate actors gateways warm pool` · `gvisor user-space kernel isolation` · `openrl python primitives` · `gpu time slicing` · `cncf sandbox donation` · `gke general availability`

## Tags

[substrate](../tags/substrate.md) · [gvisor](../tags/gvisor.md) · [openrl](../tags/openrl.md)

## Related Videos

- [The Kubernetes Agent Operating System](https://youtu.be/wZUGqLOEEuA) — Kubernetes · 85 views · Sep 8, 2026 · [Details](wZUGqLOEEuA.md) (shared: `agent` · `substrate` · `gvisor`)
- [Engineering The Agentic Stack](https://youtu.be/Po5zwwf3vW4) — Kubernetes · 330 views · Oct 4, 2026 · [Details](Po5zwwf3vW4.md) (shared: `agent` · `substrate` · `isolation`)
- [Orchard: An Open Foundation for Agentic Modeling Research](https://youtu.be/knxE_Pg2JBA) — Kubernetes · 16 views · Aug 27, 2026 · [Details](knxE_Pg2JBA.md) (shared: `isolation` · `python` · `sandbox`)
- [Amp Orbs: The Architectural Blueprint](https://youtu.be/wvErp3B-75E) — Kubernetes · 44 views · Nov 7, 2026 · [Details](wvErp3B-75E.md) (shared: `agent` · `substrate` · `gvisor`)
- [From Stateful to Secure](https://youtu.be/0U-SUJCmKAU) — Kubernetes · 48 views · Jan 16, 2026 · [Details](0U-SUJCmKAU.md) (shared: `availability`)

---
*Auto-generated on Nov 14, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
