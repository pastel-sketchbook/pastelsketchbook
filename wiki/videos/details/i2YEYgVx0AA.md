---
type: video
videoId: i2YEYgVx0AA
category: development
tags: [rust, levy, adr, data]
views: 6
date: 2026-05-15T12:08:04Z
summarized: 2026-05-17T21:50:00.000Z
---

# Integrating LanceDB & Defining Data Engine Roles

> [development](../development.md) · 6 views · May 15, 2026
> [Watch on YouTube](https://youtu.be/i2YEYgVx0AA)

## Summary

Pastel Levy adopts a dual-store architecture in which PostgreSQL remains the sole authoritative source of truth for writes, while LanceDB serves as a derived columnar and vector acceleration layer for analytical workloads. This ADR-style decision targets five workloads — multi-dimensional similarity search, equity cohort analysis, RAG over statutes, versioned evidence snapshots, and columnar bulk staging — that PostGIS alone cannot serve efficiently.

## Key Takeaways

- PostgreSQL stays as the single source of truth: only API handlers may write to it, preserving transactional guarantees and definitive valuation math.
- LanceDB is a derived projection store rebuilt from PostgreSQL data, used for fast candidate retrieval, semantic search, and efficient columnar scans.
- A scheduled Lance rebuild job extracts and transforms PostgreSQL data, then publishes to S3-compatible storage and an embedded LanceDB instance that is multi-replica safe.
- The architecture is justified by five analytical workloads — `comp` similarity search, equity/unequal-appraisal cohorts, RAG over county forms, versioned evidence snapshots, and bulk columnar ingestion.
- Treating LanceDB as an acceleration layer rather than a primary store keeps the system of record secure while unlocking vector and columnar performance.

## Topics Covered

`lancedb integration` · `dual store architecture` · `postgres source of truth` · `vector search` · `columnar analytics` · `rag retrieval` · `versioned evidence snapshots` · `data engine roles`

## Tags

[rust](../tags/rust.md) · [levy](../tags/levy.md) · [adr](../tags/adr.md) · [data](../tags/data.md)

## Related Videos

- [The Architecture of Similarity](https://youtu.be/GERT8PoS9Qk) — Development · 27 views · Apr 29, 2026 · [Details](GERT8PoS9Qk.md) (shared: `vector search` · `vector` · `search`)
- [Building the Multimodal Al Lakehouse](https://youtu.be/n9Ebc-0E478) — Development · 23 views · May 14, 2026 · [Details](n9Ebc-0E478.md) (shared: `lancedb` · `vector` · `search`)
- [Architecting the Next Evolution of the Local Database](https://youtu.be/EWwk29GzHgg) — Development · 132 views · Apr 27, 2026 · [Details](EWwk29GzHgg.md) (shared: `vector search` · `vector` · `search`)
- [The Architectural Blueprint of Apache DataFusion](https://youtu.be/ZbZdm5Opbno) — Development · 39 views · May 14, 2026 · [Details](ZbZdm5Opbno.md) (shared: `architecture` · `columnar` · `engine`)
- [Pathways Over Tools](https://youtu.be/84M1mVL0cjo) — Development · 19 views · Mar 9, 2026 · [Details](84M1mVL0cjo.md) (shared: `integration` · `architecture`)

---
*Auto-generated on May 17, 2026. Back to [development](../development.md) · [index](../index.md).*
