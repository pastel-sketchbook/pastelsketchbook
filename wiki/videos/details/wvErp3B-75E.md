---
type: video
videoId: wvErp3B-75E
category: kubernetes
tags: [idp, amp, substrate]
views: 30
date: 2026-11-08T00:00:21Z
summarized: 2026-11-10T06:05:00.000Z
---

# Amp Orbs: The Architectural Blueprint

> [kubernetes](../kubernetes.md) · 30 views · Nov 8, 2026
> [Watch on YouTube](https://youtu.be/wvErp3B-75E)

## Summary

This session documents the architecture of Amp Orbs — dedicated remote isolated execution environments for autonomous agents. It explains why local execution bottlenecks agents, the four pillars of remote interaction (shared terminal, direct file access, omni-channel sync, local mirroring), the billing-driven active/paused state machine, the five compute tiers, app-hosted vs self-hosted deployment with its outbound-only security model and provider lifecycle contract, the persistence capability matrix, the Substrate/gVisor Helm architecture across GKE/EKS/AKS, and the three deployment paths for speed, control, and custom integration.

## Key Takeaways

- Move agent execution off the laptop: an orb is a dedicated remote machine that keeps code, plugins, dev tools, and conversation history fully intact between sessions, enabling unbounded execution — installing dependencies, running tests, spawning browsers — even when the local machine is offline or asleep.
- Interact through four pillars: drop into a shared tmux session beside the agent, browse or upload files remotely (up to 512 MB to the repo root), follow progress and send prompts natively from iOS/macOS via omni-channel sync, and continuously mirror remote changes to your local checkout with `amp sync thread`.
- Treat state as a billing-coupled state machine: active work bills by the minute; pausing requires two simultaneous conditions (5 minutes with no pending work plus 20 continuous minutes of zero interaction), after which compute cost drops to $0 with full state preserved for instant wake.
- Size from five tiers: A1.tiny ($0.08/hr) for research and scripts, A1.small and project-default A1.medium for local services and moderate builds, A1.large for mono-repos and CPU-heavy tests, and A1.xxlargeplus ($1.32/hr, 16+ CPUs) for massive parallel test runs — all with 60 GB disk.
- Choose hosted vs self-hosted on mandate, not preference: app-hosted gives zero-ops execution with maximum persistence and instant boot; self-hosting is required for data residency, custom hardware, or VPC-bound internal services — its provider process opens only outbound HTTPS/WSS (443) to fetch jobs, sync Git, and establish tunnels, so zero inbound connections and no data egress, with jobs consumed via a spawn/pause/delete lifecycle contract (snapshots accelerate future spawns).
- Read the persistence matrix before committing: Amp hosted preserves memory + disk + snapshots; Kubernetes-via-Helm and Docker preserve disk + snapshots but not memory; exe.dev/e2b preserve memory + disk without snapshots; Apple containers save disk only.
- Deploy the vault pattern in the enterprise: a unified Helm chart for GKE/EKS/AKS runs two containers per pod (spawner + provider), provisions orbs as gVisor sandboxes orchestrated by the open-source Substrate runtime, and flushes paused orb disks to S3/GCS/Azure Blob so threads resume on any node; provision per cloud runbooks (GKE: COS + Workload Identity + data-plane V2; EKS: AL2023 node group/Karpenter + VPC CNI policies + IRSA; AKS: Ubuntu/Azure Linux 3.0 + workload identity + network policy), hold two spare workers to absorb 20-orb burst spawns per user, and bill only connected thread minutes (0.54¢/CPU-hour + 1.62¢/GB-hour) while governing via provider scoping, default enforcement, and instant kill switches; pick managed default, enterprise sandbox (Helm), or custom dispatch.sh per integration need.

## Topics Covered

`remote isolated agent execution` · `shared terminal and tmux` · `omni-channel sync and local mirroring` · `billing-driven active-paused state machine` · `compute tier sizing` · `outbound-only security model` · `provider spawn-pause-delete lifecycle` · `substrate gvisor helm deployment`

## Tags

[idp](../tags/idp.md) · [amp](../tags/amp.md) · [substrate](../tags/substrate.md)

## Related Videos

- [Engineering The Agentic Stack](https://youtu.be/Po5zwwf3vW4) — Kubernetes · 330 views · Oct 4, 2026 · [Details](Po5zwwf3vW4.md) (shared: `agent` · `execution` · `state`)
- [The Kubernetes Agent Operating System](https://youtu.be/wZUGqLOEEuA) — Kubernetes · 85 views · Sep 8, 2026 · [Details](wZUGqLOEEuA.md) (shared: `agent` · `substrate` · `gvisor`)
- [Orchestrating Red Hat Satellite](https://youtu.be/doS_Ii1uIRA) — Kubernetes · 41 views · Aug 31, 2026 · [Details](doS_Ii1uIRA.md) (shared: `remote` · `execution` · `lifecycle`)
- [The 100+ Service Problem](https://youtu.be/_sxPf3tHq3s) — Kubernetes · 27 views · Jan 16, 2026 · [Details](_sxPf3tHq3s.md) (shared: `helm` · `deployment`)
- [The Codebase Lifecycle](https://youtu.be/ctKLD4d146g) — Kubernetes · 16 views · Jan 13, 2026 · [Details](ctKLD4d146g.md) (shared: `lifecycle` · `deployment`)

---
*Auto-generated on Nov 10, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
