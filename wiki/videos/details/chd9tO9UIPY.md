---
type: video
videoId: chd9tO9UIPY
category: development
tags: [curiosity, state, drl, mcts]
views: 36
date: 2026-10-13T23:00:01Z
summarized: 2026-10-14T23:50:00.000Z
---

# The Blueprint of Play

> [development](../development.md) · 36 views · Oct 13, 2026
> [Watch on YouTube](https://youtu.be/chd9tO9UIPY)

## Summary

This session traces game AI from tic-tac-toe minimax through Monte Carlo tree search to AlphaZero neural intuition across state management, decision traversal, and evaluation. It layers alpha-beta pruning over exact search, UCT-driven asymmetric sampling over exhaustive depth, and PUCT-guided policy plus value heads over random rollouts, closing with the self-play flywheel loss formulation and three eras from brute force through probabilistic sampling to learned intuition.

## Key Takeaways

- Interview with tic-tac-toe for high-signal low-scope evaluation of state modeling, minimax generalization, and edge-case discipline that exposes AI-generated submissions within a minute.
- Prune exact search with alpha-beta bounds that sever redundant siblings on alpha-greater-or-equal-beta checks to nearly double achievable depth within fixed compute budgets.
- Sample asymmetrically with MCTS selection plus expansion plus rollout plus backpropagation cycles that pierce tactical horizons while weak branches die early with anytime stopping guarantees.
- Guide exploration neurally with PUCT policy priors plus Dirichlet root noise plus temperature schedules so compute concentrates on high-prior branches instead of uniform UCT wandering.
- Close the self-play flywheel by training shared residual backbones on MCTS policy cross-entropy plus outcome mean-squared error so each iteration manufactures stronger teachers without human knowledge.

## Topics Covered

`minimax alpha-beta pruning` · `monte carlo tree search` · `uct exploration tradeoff` · `alphazero policy value` · `puct neural guidance` · `self-play reinforcement` · `game state modeling` · `search paradigm evolution`

## Tags

[curiosity](../tags/curiosity.md) · [state](../tags/state.md) · [drl](../tags/drl.md) · [mcts](../tags/mcts.md)

## Related Videos

- [The Architecture of KataGo](https://youtu.be/sSIDBOrX_Ig) — Development · 129 views · Sep 10, 2026 · [Details](sSIDBOrX_Ig.md) (shared: `monte` · `carlo` · `search`)
- [Architecting the Next Evolution of the Local Database](https://youtu.be/EWwk29GzHgg) — Development · 134 views · Apr 27, 2026 · [Details](EWwk29GzHgg.md) (shared: `search` · `evolution`)
- [The Architecture of a Virtual Voice](https://youtu.be/aQpGQClZSvc) — Development · 19 views · May 27, 2026 · [Details](aQpGQClZSvc.md) (shared: `neural` · `modeling`)
- [Reasoning Under Uncertainty](https://youtu.be/z2SA6P7WNoc) — Development · 161 views · Apr 3, 2026 · [Details](z2SA6P7WNoc.md) (shared: `monte` · `carlo`)
- [Architecting Modern JavaScript Modules](https://youtu.be/Fqokr0P2_ag) — Development · 25 views · May 25, 2026 · [Details](Fqokr0P2_ag.md) (shared: `tree` · `evolution`)

---
*Auto-generated on Oct 14, 2026. Back to [development](../development.md) · [index](../index.md).*
