---
type: video
videoId: 7eoxSgjwYlM
category: kubernetes
tags: []
views: 23
date: 2026-02-19T13:24:37Z
summarized: 2026-04-16T22:00:00.000Z
---

# Bridging Helm and CUE for Deterministic Value Composition

> [kubernetes](../kubernetes.md) · 23 views · Feb 19, 2026
> [Watch on YouTube](https://youtu.be/7eoxSgjwYlM)

## Summary

This presentation addresses the "two places problem" in Kubernetes configuration management, where platform teams and application teams maintain separate config sources leading to drift and silent incompatibility. The solution bridges Helm's deployment capabilities with CUE's data validation and type-checking to achieve deterministic, verifiable value composition across all environments.

## Key Takeaways

- The "two places problem" causes fragmented ownership where CI/CD YAML, cluster defaults, and application values.yaml files drift apart across repositories.
- CUE provides compile-time type validation for Helm values, catching mismatches before deployment rather than at deploy time.
- A library-based approach replaces duplicated defaults with a single source of truth for the configuration contract between platform and app teams.
- Deterministic value composition ensures that merging platform policies with application intent always produces the same predictable output.

## Topics Covered

`helm` · `cue lang` · `configuration management` · `deterministic composition` · `platform engineering` · `values.yaml`

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
