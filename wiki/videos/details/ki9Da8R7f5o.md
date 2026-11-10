---
type: video
videoId: ki9Da8R7f5o
category: kubernetes
tags: [otel, ebpf, obi]
views: 25
date: 2026-11-07T00:00:30Z
summarized: 2026-11-10T06:05:00.000Z
---

# OpenTelemetry eBPF Instrumentation v1.0

> [kubernetes](../kubernetes.md) · 25 views · Nov 7, 2026
> [Watch on YouTube](https://youtu.be/ki9Da8R7f5o)

## Summary

This session announces OpenTelemetry eBPF Instrumentation (OBI) v1.0 and its production contract for true zero-code telemetry. It contrasts kernel-level observation with SDK friction, walks the three stability pillars (config, telemetry, supported environments), the RED-method metric core with low-cardinality route templates, the three visibility rings plus runtime telemetry, then covers DaemonSet-vs-sidecar deployment, privilege and capabilities, pull/push exporter pairs, and the cost-optimized cluster-wide topology feeding an OTLP collector.

## Key Takeaways

- Exploit the kernel as a universal observation deck: OBI watches running processes from the eBPF layer with zero code changes, no container clutter, protocol-level visibility across HTTP, gRPC, SQL, Redis, Kafka, and gNMI, and total language/framework agnosticism — replacing intrusive SDK installs, code edits, and app restarts.
- Trust v1.0's three-pillar production contract: config stability (backward-compatible config v2, documented CLI flags and env vars), telemetry standardization (stable OTLP plus built-in Prometheus representations), and certified supported environments (Linux kernel 5.8+ or RHEL 4.18 backports, BTF on AMD64 and ARM64).
- Anchor dashboards on RED metrics with low cardinality by design: rate, errors, and duration form the default core for service level objectives, using route templates like `/users/{id}` instead of unique URLs — drop HTTP request/response body-size histograms when strict cost control demands it, keeping in mind `network` alone is invalid without `application.sizes`.
- Layer visibility outward: application RED metrics in the center, TCP/socket metrics (RTTs, retransmits, connection failures) at the transport boundary, network flows (byte counters between endpoints) at the outermost ring — while runtime telemetry captures Go, JVM, .NET 8+, Node.js, and CPython internals (memory allocation, GC pauses, goroutine counts, event-loop delays) with no SDK changes.
- Deploy per-granularity: DaemonSet (one OBI pod per node via Helm) for fleet-wide baseline coverage with namespace targeting filters, a single-replica K8s cache to shield the API server, and OTLP headers mounted from Kubernetes secrets; sidecar mode needs `shareProcessNamespace: true`, OT-targeted executables, and debugfs/tracefs mounts — then pick privileges: simplest `privileged: true` or granular `CAP_BPF`, `PERFMON`, `NET_RAW`, `SYS_PTRACE` plus `CHECKPOINT_RESTORE`/`DAC_READ_SEARCH` (SYS_ADMIN may still be needed for goroutine context propagation).
- Run pull and push simultaneously: expose Prometheus scraping via `OTEL_EBPF_PROMETHEUS_PORT` and `prometheus.io/scrape=true` while pushing the same telemetry to an OpenTelemetry Collector via `OTEL_EXPORTER_OTLP_ENDPOINT` — the spec's cost-optimized reference builds on the cluster-wide DaemonSet plus API cache, payload trimming to RED+runtime, and authenticated OTLP push.

## Topics Covered

`zero-code telemetry via ebpf` · `obi v1.0 production contract` · `red metrics and low cardinality` · `visibility rings and runtime telemetry` · `daemonset vs sidecar deployment` · `kubernetes privileges and capabilities` · `pull and push exporters` · `cost-optimized otel topology`

## Tags

[otel](../tags/otel.md) · [ebpf](../tags/ebpf.md) · [obi](../tags/obi.md)

## Related Videos

- [The 100+ Service Problem](https://youtu.be/_sxPf3tHq3s) — Kubernetes · 27 views · Jan 16, 2026 · [Details](_sxPf3tHq3s.md) (shared: `deployment` · `kubernetes`)
- [Strategic Implementation of Blue-Green Deployment](https://youtu.be/Hd767VA7Z-0) — Kubernetes · 14 views · Mar 10, 2026 · [Details](Hd767VA7Z-0.md) (shared: `deployment` · `kubernetes`)
- [Deploying CSR Applications on Vercel Versus AKS](https://youtu.be/snRi_JET1bg) — Kubernetes · 9 views · Jan 6, 2026 · [Details](snRi_JET1bg.md) (shared: `deployment` · `kubernetes`)
- [The Internal Developer Platform Blueprint](https://youtu.be/iJnsRUJonzw) — Kubernetes · 79 views · Jul 25, 2026 · [Details](iJnsRUJonzw.md) (shared: `metrics` · `kubernetes` · `topology`)
- [Architecting Multi-Rail Fabrics for On-Premise AI Inference](https://youtu.be/sQz9WyN2s04) — Kubernetes · 159 views · Sep 4, 2026 · [Details](sQz9WyN2s04.md) (shared: `kubernetes` · `topology`)

---
*Auto-generated on Nov 10, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
