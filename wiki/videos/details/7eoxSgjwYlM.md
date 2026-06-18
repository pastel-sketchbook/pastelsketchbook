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

## Related Videos

- [Architecting Kubernetes with CUE](https://youtu.be/to1PClyd0YA) — Kubernetes · 15 views · Mar 16, 2026 · [Details](to1PClyd0YA.md) (shared: `cue` · `configuration management` · `configuration`)
- [CUE: Navigating the Core Features](https://youtu.be/LUOX5xkSyi0) — Kubernetes · 29 views · Mar 16, 2026 · [Details](LUOX5xkSyi0.md) (shared: `cue` · `configuration management` · `configuration`)
- [Beyond Static Configuration](https://youtu.be/okVlu1qseI4) — Kubernetes · 25 views · Feb 15, 2026 · [Details](okVlu1qseI4.md) (shared: `cue` · `configuration management` · `configuration`)
- [The Golden Path](https://youtu.be/ORjARjbukhY) — Kubernetes · 25 views · Feb 21, 2026 · [Details](ORjARjbukhY.md) (shared: `platform engineering` · `platform` · `engineering`)
- [Agentic Platform Engineering with GitHub Copilot](https://youtu.be/lexZnOlyml0) — Kubernetes · 69 views · Mar 26, 2026 · [Details](lexZnOlyml0.md) (shared: `platform` · `engineering`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Architect's Sketchbook](zmd://wiki/books/architects-sketchbook.md) — Chapter 4** (confidence: 18%)_
