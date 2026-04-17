---
type: video
videoId: oUTf9j6fWJo
category: development
tags: []
views: 139
date: 2026-03-30T22:20:06Z
summarized: 2026-04-16T22:00:00.000Z
---

# Reed: The Modern Terminal File Viewer

> [development](../development.md) · 139 views · Mar 30, 2026
> [Watch on YouTube](https://youtu.be/oUTf9j6fWJo)

## Summary

This video introduces Reed, a modern terminal file viewer that integrates IDE-level features like syntax highlighting (via syntect), inline image rendering (via Kitty graphics protocol), and Mermaid diagram rendering directly in the terminal. Reed acts as an orchestrator built on lib-ghostty for terminal rendering and termimad for markdown parsing, supporting 40+ languages and 14 color themes. The architecture follows a modular design where Reed glues together specialized best-in-class libraries rather than reimplementing functionality.

## Key Takeaways

- Reed uses syntect for syntax highlighting across 40+ languages and the Kitty graphics protocol for inline PNG, JPEG, GIF, and WebP display.
- The architecture delegates to specialized libraries: lib-ghostty for terminal engine, termimad for markdown, and FZF for navigation.
- Mermaid diagrams render inline when the mmdc CLI utility is available on the system path.
- Reed includes 14 dynamically switchable color themes and native FZF integration for file navigation.

## Topics Covered

`terminal file viewer` · `syntax highlighting` · `kitty graphics protocol` · `mermaid rendering` · `rust cli tools` · `syntect`

---
*Auto-generated on Apr 16, 2026. Back to [development](../development.md) · [index](../index.md).*
