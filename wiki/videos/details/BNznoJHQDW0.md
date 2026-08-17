---
type: video
videoId: BNznoJHQDW0
category: finance
tags: [curiosity]
views: 4
date: 2026-07-07T23:00:33Z
summarized: 2026-07-09T19:01:18.635Z
---

# Structural Pruning in State-Space Abstractions

> [finance](../finance.md) · 4 views · Jul 7, 2026
> [Watch on YouTube](https://youtu.be/BNznoJHQDW0)

## Summary

This talk maps Baduk (Go) board heuristics onto algorithmic trading, modeling market structure as a dynamic weight graph whose nodes are historical price levels and whose edges are resting liquidity. It details a two-pass structural-pruning pipeline — a bitwise "glance" filter that discards roughly 95% of states, followed by A* or Jump Point Search on the refined subgraph — alongside a four-stage liquidity-trap playbook (macro filter, sweep, turn, profit path) and a regime-switching HMM gated by cointegration graphs to surface decoupled nodes and engineered liquidity pockets.

## Key Takeaways

- Baduk's ~250 legal moves per turn make brute-force search infeasible, so the system mimics a master's "glance" by pruning dead shapes via topological heuristics and macro abstractions rather than exhaustively walking the game-tree DAG.
- Market structure is encoded as a dynamic weight graph (nodes = price levels, edges = resting liquidity) powering a "glance filter" that detects dense retail stop-loss clusters as engineered liquidity pockets or "killing zones."
- A four-stage long playbook — macro filter, sweep (stop run on high volume), turn (absorption with institutional buying-Delta displacement back above support), profit path (trapped shorts cover) — systematizes the liquidity-grab reversal.
- The two-pass engine prunes ~95% of states with bitwise heuristic filters, then runs A*/Jump Point Search on the subgraph; portfolio construction layers a macro graph filter (whole-sector pruning) and correlation-graph neighbor down-weighting (>0.7 edges) for structural diversification.
- Regime-switching HMMs paired with cointegration graphs gate reverse-trap execution to high-volatility liquidity-seeking regimes and expose decoupled nodes whose hidden structural strength survives sector-wide declines.

## Topics Covered

`structural pruning state space` · `baduk go heuristics` · `dynamic weight graph liquidity` · `moyo formation bearish trap` · `regime switching hmm` · `cointegration graph anomalies` · `a star jump point search` · `portfolio graph diversification`

## Tags

[curiosity](../tags/curiosity.md)

## Related Videos

- [Systematic Momentum Execution](https://youtu.be/md9nXDH1u7Q) — Finance · 5 views · Jul 22, 2026 · [Details](md9nXDH1u7Q.md) (shared: `liquidity` · `trap`)
- [Architecting the New Capital Regime](https://youtu.be/rjhabJ8Bx5U) — Finance · 17 views · May 21, 2026 · [Details](rjhabJ8Bx5U.md) (shared: `regime` · `portfolio`)
- [The 2026 Barbell Strategy](https://youtu.be/bn-Nvmxgur8) — Finance · 33 views · Feb 17, 2026 · [Details](bn-Nvmxgur8.md) (shared: `portfolio`)
- [An Ambitious Ascent](https://youtu.be/MDNRiJN7aEg) — Finance · 11 views · Dec 29, 2025 · [Details](MDNRiJN7aEg.md) (shared: `portfolio`)
- [The Architecture of Fulfillment](https://youtu.be/hnMR8rdGCnU) — Finance · 47 views · Mar 26, 2026 · [Details](hnMR8rdGCnU.md) (shared: `trap`)

---
*Auto-generated on Jul 9, 2026. Back to [finance](../finance.md) · [index](../index.md).*
