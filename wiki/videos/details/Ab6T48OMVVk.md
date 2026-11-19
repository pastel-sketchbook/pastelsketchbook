---
type: video
videoId: Ab6T48OMVVk
category: development
tags: [rust, curiosity, copilot]
views: 19
date: 2026-11-18T00:00:16Z
summarized: 2026-11-19T08:20:00.000Z
---

# Frontier AI Engineering Playbook

> [development](../development.md) · 19 views · Nov 18, 2026
> [Watch on YouTube](https://youtu.be/Ab6T48OMVVk)

## Summary

This session recounts how nine engineers built Copilot CoWork from empty repo to worldwide GA in ten months, peaking at 1,211 merged pull requests in a day. It extracts the six practices that emerged under agent scale — spec before code, narrow bounded agents, checks that prove they checked, rules stored in the repo, code shaped for parallel work, bounded loops with targets — then details bot-reviewer triage, the check-that-couldn't-fail cautionary tale, the four-tier architecture, Python-to-Rust migration via JSON fixtures, and the shift of human value to intent, boundaries, and verification.

## Key Takeaways

- Let the timeline set expectations: first commit January, Frontier GA March 30, worldwide GA June 16, Python→Rust migration through September-October, and a peak of 1,211 PRs merged in a single day on October 21 — agents wrote the vast majority of the code while nine humans defined work and judged results.
- Write the spec before the code: ambiguous intent is the real bottleneck, not the tool — a markdown spec drafted by AI, refined by humans, then implemented in three pillars (intent, verification, safety) turns vague prompts into correct results and saves far more time than it costs.
- Run narrow agents inside hard boundaries and make checks prove they checked: competing bot reviewers respond in under 4.5 minutes backed by 10,000+ generations of learning, feeding specialized call-graph, metrics, and test passes before humans judge security/correctness/data-critical changes — every check must report how many files it analyzed, and every new check needs a negative test that fails on purpose (the linter piped into `tail` that always exited green is the cautionary tale).
- Put team rules in the repo: with no persistent agent memory, 30+ instruction/rule files created since August are read at startup, and every mistake ends with a corresponding rule update — institutional knowledge becomes agent context.
- Shape the codebase for parallel work: one-file-per-registry-entry, auto-regenerated post-merge, uncommitted ephemeral counts/dates eliminated merge conflicts entirely at 100+ PRs/day; a strict four-tier layer cake (contracts → kit → implementation → binary wiring, implementations never depending on implementations) cut max dependency depth from 10 to 3 while crates grew 86 → 176.
- Bound automated loops: targets like CI runs 5% faster (17,700s → 1,700s across 300 automated PRs) paired with limits (stop after 20 rounds or 3 identical CI failures), and a four-step production-signal loop — detect, agent builds PR, revert check, merge and verify the signal dropped.
- Migrate with fixtures and elevate the human role: 430+ JSON fixtures recorded from live Python replayed as exact-match Rust tests (Python P50 7.9s → Rust 2.7s, 8,000 files / 4.9M lines removed in a day) after Python hit event-loop stalls, 5s timeouts, and 539 weekly OOM kills; humans now focus on four decisions — what to build, where boundaries go, which tests prove success, and whether a passing check is a false positive — starting with one trusted check made to fail on purpose.

## Topics Covered

`spec-first agent workflow` · `narrow bounded agents` · `verifiable checks and negative tests` · `repo-stored team rules` · `parallel-ready codebase structure` · `bounded automation loops` · `json fixture migration` · `human judgment at agent scale`

## Tags

[rust](../tags/rust.md) · [curiosity](../tags/curiosity.md) · [copilot](../tags/copilot.md)

## Related Videos

- [AI Agents  Idea to Tool](https://youtu.be/tqDisu2tmG0) — Development · 6 views · Jan 10, 2026 · [Details](tqDisu2tmG0.md) (shared: `agent` · `agents` · `automation`)
- [How to Kill the Code Review](https://youtu.be/0HEqwk9UMOc) — Development · 145 views · Mar 18, 2026 · [Details](0HEqwk9UMOc.md) (shared: `workflow` · `automation`)
- [Engineering the Overnight Researcher in Zig](https://youtu.be/7yqkfHo8Mwk) — Development · 78 views · Mar 9, 2026 · [Details](7yqkfHo8Mwk.md) (shared: `agents` · `automation`)
- [Agent Skills for Flutter](https://youtu.be/TEGFwsAcxK8) — Development · 1.4K views · Apr 10, 2026 · [Details](TEGFwsAcxK8.md) (shared: `agent` · `automation`)
- [Professional Al Agent Usage via the CLI](https://youtu.be/Xhq99-YHXCY) — Development · 25 views · Jan 2, 2026 · [Details](Xhq99-YHXCY.md) (shared: `agent` · `human`)

---
*Auto-generated on Nov 19, 2026. Back to [development](../development.md) · [index](../index.md).*
