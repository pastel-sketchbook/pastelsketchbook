---
type: video
videoId: 0QmlJNjUtGY
category: kubernetes
tags: [rabbitmq, v4.4, rolling update, khepri]
views: 22
date: 2026-10-31T23:00:39Z
summarized: 2026-11-02T23:59:00.000Z
---

# Migrating to RabbitMQ 4.4

> [kubernetes](../kubernetes.md) · 22 views · Oct 31, 2026
> [Watch on YouTube](https://youtu.be/0QmlJNjUtGY)

## Summary

This session blueprints a zero-downtime RabbitMQ 4.4 migration on Kubernetes — three queue nodes, centralized Khepri metadata, and load-balanced pods — from lifecycle timing through the quorum-queue era, native delayed retries, and availability-zone-spreading, to the five-step operator rollback and post-upgrade validation. Risk tiers steer the pre-flight, the pre-stop hook guarantees quorum safety during rolling pod updates, and the unified Raft consensus model replaces Mnesia-era fragmentation with a single predictable design.

## Key Takeaways

- Plan against the support window: RabbitMQ 4.2 community support ended July 31, 2026 (no free security patches without commercial plans); 4.4.0 released October 20, 2026 with community support through July 31, 2027 and commercial support to October 31, 2028 — direct rolling upgrades from 4.2.x to 4.4.x are fully supported and recommended.
- Embrace the 4.x consensus era: quorum queues and streams displace mirrored queues, classic queue v1, Mnesia, and pause-minority partition handling; modern RabbitMQ unifies on Raft — Khepri drives metadata (schemas, bindings, users, policies), quorum queues replicate payloads, and streams retain replayable event logs, making failure behavior uniform across the system.
- Eliminate split-brain with Khepri: unlike Mnesia's configurable strategies, Khepri fixes partition handling so the minority side stops accepting writes and auto-catches up after restoring connectivity — keep a strict majority (two of three nodes) for metadata operations; similarly, replace dead-letter routing spaghetti with 4.3+ native delayed retries (linear backoff inside quorum queues, pure requeues excluded from poison limits) plus 4.4's three mechanisms: producer-set delivery-time headers, consumer-side delayed retry policies, and consumer-held deferral tokens.
- Tier migration risk before touching binaries: mirrored queues, HA policies, classic queue v1, custom partition settings, and Mnesia-dependent plugins are high-risk (the mirrored→quorum transition is the primary friction); monitor-management, older AMQP 1.0 clients are medium; standard AMQP 0-9-1 workloads and quorum-queue consumers are low-risk — pre-flight on healthy 4.2.x (active alarms and replica sync cleared), enable stable feature flags, and activate `khepri_db` under light load to move metadata off Mnesia early; pin the production image to 4.4.1 or 4.4.2 patches.
- Execute the five-step operator rollout: pause reconciliation via cluster annotation → update the image specification to 4.4.x → resume reconciliation → sequential pod updates gated by quorum checks (the pre-stop hook runs `rabbitmq-upgrade await_online_quorum_plus_one` before a pod stops) → enable all feature flags, queue-rebalance leaders evenly across the remaining nodes, and validate version, health, and flags through `cluster status`; tag nodes with availability-zone failure domains so quorum queue replicas spread across zones natively.

## Topics Covered

`zero-downtime rolling upgrade` · `quorum queues and streams` · `khepri metadata store` · `native delayed retries` · `deferred message mechanisms` · `migration risk tiers` · `pre-stop quorum hook` · `raft consensus unification`

## Tags

[rabbitmq](../tags/rabbitmq.md) · [v4.4](../tags/v4.4.md) · [rolling update](../tags/rolling%20update.md) · [khepri](../tags/khepri.md)

## Related Videos

- [From Consensus Physics to Messaging Engineering](https://youtu.be/V9tvg6Yg3m4) — Kubernetes · 47 views · May 7, 2026 · [Details](V9tvg6Yg3m4.md) (shared: `quorum` · `queues` · `raft`)
- [The Blueprint of Distributed Consensus](https://youtu.be/elpnbTmiuCs) — Kubernetes · 52 views · Sep 11, 2026 · [Details](elpnbTmiuCs.md) (shared: `quorum` · `queues` · `raft`)
- [minikv: Distributed Systems Meets Data Science](https://youtu.be/a8heWpae5p0) — Kubernetes · 20 views · Apr 11, 2026 · [Details](a8heWpae5p0.md) (shared: `store` · `raft` · `consensus`)
- [Upgrading MKE with NFS Stateful Workloads](https://youtu.be/WeVWqluXtlA) — Kubernetes · 24 views · Aug 30, 2026 · [Details](WeVWqluXtlA.md) (shared: `upgrade` · `quorum` · `raft`)
- [Bridging the Mainframe to the Cloud](https://youtu.be/7iWL5-0C66s) — Kubernetes · 27 views · Apr 4, 2026 · [Details](7iWL5-0C66s.md) (shared: `message` · `migration`)

---
*Auto-generated on Nov 2, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
