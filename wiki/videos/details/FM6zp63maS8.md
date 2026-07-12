---
type: video
videoId: FM6zp63maS8
category: development
tags: [pcap, rust, hexcap, agent]
views: 50
date: 2026-04-20T22:17:31Z
summarized: 2026-04-22T22:00:00.000Z
---

# hexcap: Elevating Terminal Packet Capture

> [development](../development.md) · 50 views · Apr 20, 2026
> [Watch on YouTube](https://youtu.be/FM6zp63maS8)

## Summary

This video presents hexcap, a Rust-based TUI packet capture tool designed to bridge the speed of tcpdump with the analytical depth of Wireshark. It details the dual-thread architecture where a dedicated capture thread feeds packets through Arc<Mutex> shared state to a Ratatui-powered UI render loop. The talk explains the deliberate decision to avoid Tokio due to blocking libpcap FFI, and covers graceful interface switching and protocol decoding within the terminal.

## Key Takeaways

- hexcap occupies the gap between tcpdump's speed and Wireshark's analysis depth, delivering both in a terminal-native interface.
- The dual-thread architecture separates packet capture from UI rendering, using Arc<Mutex> shared state to decouple the blocking libpcap FFI from the responsive Ratatui display.
- Tokio was intentionally excluded because libpcap's blocking FFI calls would starve the async runtime, making OS threads the correct concurrency model.
- Graceful interface switching and layered protocol decoding give operators Wireshark-level insight without leaving the terminal.

## Topics Covered

`hexcap` · `packet capture` · `Rust` · `TUI` · `libpcap FFI` · `Ratatui` · `Arc<Mutex>` · `protocol decoding`

## Tags

[pcap](../tags/pcap.md) · [rust](../tags/rust.md) · [hexcap](../tags/hexcap.md) · [agent](../tags/agent.md)

## Related Videos

- [Packet Capture Fundamentals](https://youtu.be/vtzEOYX_8k8) — Development · 47 views · Apr 20, 2026 · [Details](vtzEOYX_8k8.md) (shared: `capture` · `libpcap`)
- [rt-ado-ci-cd Operations and Architecture](https://youtu.be/s6wmtsAWvCw) — Development · 7 views · Jun 8, 2026 · [Details](s6wmtsAWvCw.md) (shared: `rust` · `tui` · `ratatui`)
- [yp: The Terminal User Interface Renaissance](https://youtu.be/vSjgNxi7W-4) — Development · 70 views · Mar 6, 2026 · [Details](vSjgNxi7W-4.md) (shared: `rust` · `tui`)
- [Reed: The Modern Terminal File Viewer](https://youtu.be/oUTf9j6fWJo) — Development · 149 views · Mar 30, 2026 · [Details](oUTf9j6fWJo.md) (shared: `rust` · `protocol`)
- [Pastel Market: Engineering a Unified Terminal Workspace](https://youtu.be/feWjiYzQQ-k) — Development · 42 views · Apr 19, 2026 · [Details](feWjiYzQQ-k.md) (shared: `rust` · `tui`)

---
*Auto-generated on Apr 22, 2026. Back to [development](../development.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Architect's Sketchbook](zmd://wiki/books/architects-sketchbook.md) — Chapter 10** (confidence: 8%)_
