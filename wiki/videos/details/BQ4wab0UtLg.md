---
type: video
videoId: BQ4wab0UtLg
category: development
tags: [curiosity, leiden, bfs]
views: 2
date: 2026-04-26T15:40:42Z
summarized: 2026-04-26T16:14:57.961Z
---

# From Louvain to Leiden

> [development](../development.md) · 2 views · Apr 26, 2026
> [Watch on YouTube](https://youtu.be/BQ4wab0UtLg)

## Summary

This video traces the architectural evolution of community detection algorithms in network science, from Louvain (2008) to Leiden (2019) to GSP-Leiden. It explains how Leiden's refinement phase fixes Louvain's tendency to produce internally disconnected communities, contrasts traditional modularity with the constant Potts model (CPM) to overcome the resolution limit, and introduces GSP-Leiden — a parallelized OpenMP implementation that achieves 190–341x speedups on billion-edge graphs while guaranteeing connectivity via per-pass BFS partitioning.

## Key Takeaways

- Louvain's two-phase pipeline (local moving + aggregation) frequently fragments communities into disconnected pieces because moving a bridge node can sever the cluster it leaves behind, invalidating downstream analysis that assumes cohesive units.
- Leiden's three-phase cycle adds a refinement stage with bounded stochastic exploration governed by a theta parameter, allowing the algorithm to escape local optima and guarantee gamma connectivity, uniform gamma density, and subset optimality.
- The constant Potts model (CPM) replaces the resolution-limited RB modularity model with a network-size-independent gamma parameter, treating links as ferromagnetic rewards and non-links as anti-ferromagnetic penalties for fine-grained partition control.
- GSP-Leiden ("split-pass Leiden") proactively intervenes during every pass with a BFS-based partitioning step that isolates disconnected subgraphs before aggregation, eliminating the residual disconnection failure rate seen in standard Leiden.
- On 3.8 billion edge web graphs running on dual 16-core Intel Xeon Gold processors, GSP-Leiden processes 195–328 million edges/second, runs 190–341x faster than reference Leiden, 46–83x faster than igraph, and scales 1.6x per thread doubling — making it the standard for single-cell RNA-seq clustering via scanpy and Seurat.

## Topics Covered

`community detection` · `louvain algorithm` · `leiden algorithm` · `modularity optimization` · `constant potts model` · `resolution limit` · `bfs partitioning` · `parallel graph algorithms` · `single-cell rna-seq`

## Tags

[curiosity](../tags/curiosity.md) · [leiden](../tags/leiden.md) · [bfs](../tags/bfs.md)

## Related Videos

- [The Pragmatics of Order](https://youtu.be/guwVjGsg3h4) — Development · 13 views · Mar 8, 2026 · [Details](guwVjGsg3h4.md) (shared: `algorithm` · `optimization` · `algorithms`)
- [The Agentic Future](https://youtu.be/z_W9dX6fliM) — Development · 67 views · Apr 24, 2026 · [Details](z_W9dX6fliM.md) (shared: `community` · `detection` · `graph`)
- [Engineering the Overnight Researcher in Zig](https://youtu.be/7yqkfHo8Mwk) — Development · 75 views · Mar 9, 2026 · [Details](7yqkfHo8Mwk.md) (shared: `optimization` · `model`)
- [Zig Algorithms: The Art of Zero-Cost Abstraction](https://youtu.be/A96r5gqwUrI) — Development · 27 views · Feb 6, 2026 · [Details](A96r5gqwUrI.md) (shared: `optimization` · `algorithms`)
- [Hardening a Prototype](https://youtu.be/DCGTYftRGWE) — Development · 24 views · Jan 25, 2026 · [Details](DCGTYftRGWE.md) (shared: `detection` · `optimization`)

---
*Auto-generated on Apr 26, 2026. Back to [development](../development.md) · [index](../index.md).*
