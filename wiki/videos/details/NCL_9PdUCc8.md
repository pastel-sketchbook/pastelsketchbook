---
type: video
videoId: NCL_9PdUCc8
category: kubernetes
views: 6
date: 2026-08-19T23:00:35Z
summarized: 2026-08-22T00:29:06.000Z
---

# Deploying and Operating ClickHouse on AWS EKS

> [kubernetes](../kubernetes.md) · 6 views · Aug 19, 2026
> [Watch on YouTube](https://youtu.be/NCL_9PdUCc8)

## Summary

An architectural blueprint and runbook for running ClickHouse on AWS Elastic Kubernetes Service, covering a four-layer stack: compute/storage foundation (Graviton I4g/R7g nodes, EBS gp3), the Kubernetes database plane managed by the ClickHouse operator with ZooKeeper quorum, phased network boundaries from headless services to public ALB ingress, and a Dynatrace-fed observability plane. Production practices include hot-gp3/cold-S3 storage tiering, batched inserts of 10,000+ rows, IRSA-based S3 identity, and monitoring of parts pressure, memory tracking, replication delay, and query latency percentiles.

## Key Takeaways

- Deployment proceeds in three operator-driven stages: cert-manager webhook prerequisites, the ClickHouse operator into its own namespace, then a ClickHouseInstallation CRD declaring one shard/two replicas with gp3 storage requiring a pre-installed EBS CSI driver.
- Decoupled tiering keeps hot data on fast gp3 EBS volumes while ClickHouse-native S3 disks automatically age cold historical data into cheaper Amazon S3 without losing queryability.
- Ingestion must avoid single-row HTTP inserts; batching chunks of 10,000+ rows prevents excessive small data parts, and S3 access should use IAM roles for service accounts instead of hardcoded root keys.
- Network exposure evolves in phases — same-namespace headless services, an internal NLB annotated private to the VPC for Kafka/Airflow pipelines, then internet-facing access preferably via ALB ingress with ACM SSL termination rather than raw port-exposing public NLBs.
- Observability relies on native Prometheus /metrics scraping (port 9363) plus container logs streamed into Dynatrace, watching system.parts pressure, memory tracking, system.replicas delay, and P95/P99 query latency.

## Topics Covered

`clickhouse operator deployment` · `aws eks architecture` · `ebs gp3 s3 tiering` · `zookeeper replication quorum` · `alb ingress tls termination` · `prometheus metrics observability` · `batched insert tuning`

## Related Videos

- [Clickhouse is Winning the Observability Wars](https://youtu.be/mf86g5lXfTg) — Kubernetes · 25 views · Jul 16, 2026 · [Details](mf86g5lXfTg.md) (shared: `clickhouse` · `architecture` · `replication`)
- [RabbitMQ 4.2.8 Plugin Ecosystem](https://youtu.be/6XAbKoeK9JU) — Kubernetes · 19 views · Jul 8, 2026 · [Details](6XAbKoeK9JU.md) (shared: `operator` · `prometheus` · `metrics`)
- [The 100+ Service Problem](https://youtu.be/_sxPf3tHq3s) — Kubernetes · 27 views · Jan 16, 2026 · [Details](_sxPf3tHq3s.md) (shared: `deployment` · `architecture`)
- [The 2026 Architectural Standard](https://youtu.be/WHonjixQgBY) — Kubernetes · 54 views · Jan 31, 2026 · [Details](WHonjixQgBY.md) (shared: `clickhouse` · `architecture`)
- [Dragonfly on AKS](https://youtu.be/Q4qm1hvVR2A) — Kubernetes · 21 views · Jan 31, 2026 · [Details](Q4qm1hvVR2A.md) (shared: `deployment` · `architecture`)

---
*Auto-generated on Aug 21, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
