---
type: video
videoId: BsiQrEaF3kU
category: kubernetes
tags: []
views: 26
date: 2026-02-04T11:42:09Z
summarized: 2026-04-16T22:00:00.000Z
---

# MotherDuck: Serverless DuckDB in the Cloud & Client

> [kubernetes](../kubernetes.md) · 26 views · Feb 4, 2026
> [Watch on YouTube](https://youtu.be/BsiQrEaF3kU)

## Summary

This presentation explores MotherDuck's hybrid query processing architecture based on the CIDR 2024 paper, which runs DuckDB across both cloud and client in a "1.5 tier" data architecture. It argues that the big data era is giving way to "easy data" where single-node scale-up systems handle 95%+ of enterprise workloads (most databases are under 1TB, most queries touch less than 10GB) without the operational overhead of distributed clusters.

## Key Takeaways

- Over 95% of databases are smaller than 1TB and 95%+ of queries involve less than 10GB, making distributed cluster overhead unnecessary for most workloads.
- MotherDuck's 1.5-tier architecture runs DuckDB on both client and cloud, enabling hybrid query processing that eliminates traditional three-tier rigidity.
- The shift from "big data" scale-out clusters to "easy data" single-node scale-up provides instant elasticity with near-zero management overhead.
- Hybrid execution allows queries to leverage local compute for small datasets while transparently offloading to cloud for larger analytical workloads.

## Topics Covered

`duckdb` · `motherduck` · `hybrid query processing` · `1.5 tier architecture` · `serverless analytics` · `single-node databases`

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
