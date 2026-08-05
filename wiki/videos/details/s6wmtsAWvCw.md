---
type: video
videoId: s6wmtsAWvCw
category: development
tags: [rust, ratatui, azure-devops, ci-cd, cli]
views: 2
date: 2026-06-08T11:00:22Z
summarized: 2026-06-08T23:05:00.000Z

## Related Videos

- [hexcap: Elevating Terminal Packet Capture](https://youtu.be/FM6zp63maS8) — Development · 62 views · Apr 20, 2026 · [Details](FM6zp63maS8.md) (shared: `rust` · `ratatui` · `tui`)
- [yp: The Terminal User Interface Renaissance](https://youtu.be/vSjgNxi7W-4) — Development · 70 views · Mar 6, 2026 · [Details](vSjgNxi7W-4.md) (shared: `rust` · `cli` · `tui`)
- [codeprobe](https://youtu.be/xVdW3yUCbuU) — Development · 33 views · Mar 4, 2026 · [Details](xVdW3yUCbuU.md) (shared: `rust` · `generation` · `cli`)
- [temporal-chain: Architecture & Design](https://youtu.be/cuA7G01T7_U) — Development · 24 views · Jun 6, 2026 · [Details](cuA7G01T7_U.md) (shared: `rust` · `workspace` · `cli`)
- [Synthesizing Gleam Syntax with Rust Performance](https://youtu.be/DTb0syknVSQ) — Development · 27 views · Jul 15, 2026 · [Details](DTb0syknVSQ.md) (shared: `rust` · `procedural` · `generation`)

---

# rt-ado-ci-cd Operations and Architecture

> [development](../development.md) · 2 views · Jun 8, 2026
> [Watch on YouTube](https://youtu.be/s6wmtsAWvCw)

## Summary

This DevOps engineering guide presents rt-ado-ci-cd, a Rust and ratatui port of an internal Go-based auto-cd tool that automates Azure DevOps CI/CD onboarding. It builds a procedural, resumable workflow that generates Helm charts, publishes source and Helm changes, and creates YAML-backed pipelines. The architecture separates thin CLI and TUI viewports from a central non-mutating workspace assessment engine, with steps classified into block/done/wait/now states for resumability.

## Key Takeaways

- The tool is a Rust + ratatui port targeting exact behavior parity with the original Go auto-cd tool before broadening beyond Java/TomEE environments.
- It deliberately shells out to external CLIs (Git, Helm, Azure CLI, Task) rather than embedding SDK clients, keeping authentication aligned with the operator's local machine.
- Both the CLI and TUI are "ignorant viewports" that funnel through a shared workspace.plan interface into a central non-mutating assessment engine, guaranteeing consistent behavior.
- Every workflow step maps to one of four states — block, done, wait, now — recomputed on each assessment scan to drive procedural resumability after interruptions.
- The four-panel TUI dashboard (status, workspace, procedure, process log) plus an instruction line gives real-time visibility, with theme cycling, mouse-drag copy, and resizable split panels.

## Topics Covered

`rust ratatui port` · `azure devops ci-cd onboarding` · `procedural resumable workflow` · `workspace assessment engine` · `helm chart generation` · `cli vs tui modality` · `external cli tool belt` · `four-state step model`

## Tags

[rust](../tags/rust.md) · [ratatui](../tags/ratatui.md) · [azure-devops](../tags/azure-devops.md) · [ci-cd](../tags/ci-cd.md) · [cli](../tags/cli.md)
