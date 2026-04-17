---
type: video
videoId: xfOATs8ncLM
category: development
tags: [go, opentelemetry, profiling, observability]
views: 17
date: 2026-03-12T22:39:00Z
summarized: 2026-04-16T22:00:00.000Z
---

# Isolating Observability in Go

> [development](../development.md) · 17 views · Mar 12, 2026
> [Watch on YouTube](https://youtu.be/xfOATs8ncLM)

## Summary

This video presents a playbook for measuring and optimizing OpenTelemetry overhead in Go applications using pprof profiling. It demonstrates how default benchmarks against network exporters (Jaeger, Prometheus) produce skewed results due to network latency, and advocates an air-gapped approach that exports telemetry to local memory to isolate the true cost of span generation and context switching. The architecture uses an Echo server with an OTEL tracer and a switchable exporter pipeline.

## Key Takeaways

- Benchmarking OpenTelemetry with network exporters skews results with network latency rather than measuring true instrumentation overhead.
- Exporting telemetry to local memory (air-gapped exporter) isolates the pure cost of span generation and context switching.
- The architecture uses an Echo server with an OTEL tracer and a switch mechanism to divert traffic between network and in-memory exporters.
- Go's pprof profiling tool is used to achieve high-fidelity measurement of telemetry overhead in a controlled laboratory environment.

## Topics Covered

`opentelemetry overhead` · `go profiling` · `pprof` · `span generation cost` · `air-gapped benchmarking` · `echo server otel`

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
