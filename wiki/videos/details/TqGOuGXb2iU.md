---
type: video
videoId: TqGOuGXb2iU
category: development
tags: [rust, burn, topcoat, katago]
views: 70
date: 2026-09-19T23:00:06Z
summarized: 2026-09-24T02:45:00.000Z
---

# Building bt-go: A Closed-Loop Architecture

> [development](../development.md) · 70 views · Sep 19, 2026
> [Watch on YouTube](https://youtu.be/TqGOuGXb2iU)

## Summary

This session presents bt-go, a closed-loop training architecture for building 5Q Go AI on reproducible data and continuous self-play around an immutable games.db store. It covers the four-stage self-play/analyze/train/serve loop, KataGo teacher bootstrapping versus weak checkpoint self-play, the pass-collapse fail-safe, the generation-two GoNet residual tower that removes a ReLU bottleneck, the SGF data funnel with dihedral augmentation and per-turn win-rate targets, linear learning-rate decay with Adam weight decay, honest evaluation via holdout accuracy and the 5Q handicap-sweep yardstick, a strict checkpoint lifecycle with retraining instead of weight converters, and a trust-the-rules KataGo boundary where the local engine alone decides legality.

## Key Takeaways

- Anchor the entire loop on an immutable engine-validated games.db so every checkpoint is reproducibly rebuilt from stored data and measurably stronger than the last.
- Bootstrap weak networks with KataGo teacher self-play for honest dan-level data instead of letting a fresh network learn from its own erratic moves.
- Guard the loop with a pass-collapse probe on standard openings that triggers teacher remediation before corrupted policy poisons training data.
- Remove the interposed ReLU before the policy head so a single saturated channel can no longer collapse the network into an invisible argmax-equals-pass predictor.
- Evaluate honesty with holdout policy top-one accuracy, value MAE, and a handicap sweep to 5Q parity rather than trusting falling training loss, and never write bespoke weight converters across schema changes.

## Topics Covered

`closed-loop self-play` · `katago teacher bootstrapping` · `pass collapse guard` · `residual tower architecture` · `dihedral data augmentation` · `handicap sweep evaluation` · `checkpoint lifecycle` · `gtp engine boundary`

## Tags

[rust](../tags/rust.md) · [burn](../tags/burn.md) · [topcoat](../tags/topcoat.md) · [katago](../tags/katago.md)

## Related Videos

- [Integrating LanceDB & Defining Data Engine Roles](https://youtu.be/i2YEYgVx0AA) — Development · 12 views · May 15, 2026 · [Details](i2YEYgVx0AA.md) (shared: `architecture` · `data` · `engine`)
- [Architecting a Modern Robocode Engine](https://youtu.be/d3JxtD__-L0) — Development · 77 views · May 29, 2026 · [Details](d3JxtD__-L0.md) (shared: `architecture` · `engine` · `boundary`)
- [The Rules and The Rebellion](https://youtu.be/dDtVuJXVYJk) — Development · 35 views · Apr 6, 2026 · [Details](dDtVuJXVYJk.md) (shared: `architecture` · `data`)
- [Bulletproof Frontend Architecture](https://youtu.be/5Vloo08zQ7o) — Development · 35 views · Feb 16, 2026 · [Details](5Vloo08zQ7o.md) (shared: `architecture` · `data`)
- [Data Centric Flutter Apps](https://youtu.be/4_mBGmXA244) — Development · 32 views · Jan 9, 2026 · [Details](4_mBGmXA244.md) (shared: `architecture` · `data`)

---
*Auto-generated on Sep 24, 2026. Back to [development](../development.md) · [index](../index.md).*
