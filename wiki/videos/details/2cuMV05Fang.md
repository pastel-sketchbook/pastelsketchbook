---
type: video
videoId: 2cuMV05Fang
category: development
views: 23
date: 2026-07-20T23:00:14Z
summarized: 2026-07-23T10:10:00.000Z
---

# The Performance Paradigm

> [development](../development.md) · 23 views · Jul 20, 2026
> [Watch on YouTube](https://youtu.be/2cuMV05Fang)

## Summary

A performance comparison of Zsh (paired with the Antidote plugin manager) versus the Fish shell, framing the choice as a trade-off between out-of-the-box responsiveness and POSIX scripting compatibility. It argues that an optimized Zsh + Antidote setup matches or beats Fish's startup speed while retaining full POSIX compatibility, and highlights the "multiplexer tax" where every new tmux pane re-sources the shell configuration and compounds startup latency.

## Key Takeaways

- Fish ships syntax highlighting and autosuggestions as native C++ binaries for instant responsiveness, but uses a non-standard scripting syntax.
- Zsh prioritizes broad POSIX compliance so standard utility scripts and environment configs work without wrappers, at the cost of slower naive startup.
- An optimized Zsh + Antidote configuration achieves 0.02–0.05s startup — faster than Fish's 0.1–0.2s and far faster than Oh My Zsh's 0.5–1.0s.
- The multiplexer tax compounds startup latency because every new tmux pane re-sources the full shell configuration from scratch.
- For tmux- and SSH-GPG-heavy workflows, Zsh with a native compiled plugin manager is the compromise-free choice: Fish-class speed with 100% POSIX compatibility.

## Topics Covered

`zsh fish performance` · `antidote plugin manager` · `shell startup latency` · `posix shell compatibility` · `tmux multiplexer tax` · `shell static compilation`

## Related Videos

- [Beyond the Default ](https://youtu.be/tmerUd7eiy4) — Development · 11 views · Jan 11, 2026 · [Details](tmerUd7eiy4.md) (shared: `zsh` · `performance` · `shell`)
- [Emulating the Server Push](https://youtu.be/wZC8NL32yfg) — Development · 17 views · Apr 19, 2026 · [Details](wZC8NL32yfg.md) (shared: `latency` · `compatibility`)
- [Why uv, ruff, and ty are mandatory](https://youtu.be/i8wjbDfxZTY) — Development · 145 views · Jun 2, 2026 · [Details](i8wjbDfxZTY.md) (shared: `manager` · `static`)
- [Hangul + WASM](https://youtu.be/9yov-ZVv-Bo) — Development · 43 views · Jan 19, 2026 · [Details](9yov-ZVv-Bo.md) (shared: `performance`)
- [zig-lottie: Compiling Motion](https://youtu.be/QC-vaMcjq3M) — Development · 83 views · Apr 11, 2026 · [Details](QC-vaMcjq3M.md) (shared: `compilation`)

---
*Auto-generated on Jul 23, 2026. Back to [development](../development.md) · [index](../index.md).*
