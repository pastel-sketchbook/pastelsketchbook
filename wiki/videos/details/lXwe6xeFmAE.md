---
type: video
videoId: lXwe6xeFmAE
category: development
views: 15
date: 2026-07-26T23:00:10Z
summarized: 2026-07-28T23:05:00.000Z
---

# Transcontinental Data Migration

> [development](../development.md) · 15 views · Jul 26, 2026
> [Watch on YouTube](https://youtu.be/lXwe6xeFmAE)

## Summary

This talk is an engineering playbook for moving 100 TB of data from Europe to Asia, balancing bandwidth, latency, and destination data-sovereignty law, and shows why standard TCP collapses over intercontinental spans (40–60% efficiency versus UDP's 90%) before laying out three viable architectures — high-speed UDP transfer (Aspera/Globus GridFTP over a 10 Gbps dedicated line, ~24–30 h), encrypted physical sneakernet (AWS Snowball Edge/Azure Data Box, 5–7 days), and cloud-to-cloud inter-region replication (AWS/Azure/GCP backbone).

## Key Takeaways

- Distance breaks naive TCP: over intercontinental spans TCP efficiency drops to 40–60% as high-RTT window scaling shrinks the congestion window, so 100 TB at 1 Gbps takes 12–15 days (up to 3–4 weeks) while UDP holds ~90% efficiency and cuts that to ~22 h at 10 Gbps.
- Three architectures map to need: high-speed UDP (Aspera/Signiant or open-source Globus GridFTP/Rclone with 32+ parallel threads, 8–9 Gbps effective on a 10 Gbps line, 24–30 h), encrypted physical drives (AWS Snowball Edge/Azure Data Box, 5–7 predictable days), and cloud-to-cloud inter-region replication (hours to days, S3→S3 / Azure→Azure).
- Geography — not technology — decides the route: Japan/Korea permit UDP; Hong Kong/Vietnam/Malaysia/Singapore require SCC/BCR safeguards; China/India/Indonesia/Philippines enforce strict localization demanding physical shipment or in-country cloud ingestion.
- China's Great Firewall throttles direct Europe→mainland transfers, so the fix is a Hong Kong or Singapore landing zone plus a dedicated Cloud Express route into the mainland.
- Watch the hidden costs: cloud egress on 100 TB can run $5,000–$7,000, and millions of small files bottleneck filesystem IOPS — tar them into 10–50 GB sequential chunks to convert random IO into sequential throughput.

## Topics Covered

`transcontinental data migration` · `tcp vs udp long haul efficiency` · `high speed udp transfer aspera` · `aws snowball azure data box sneakernet` · `cloud to cloud inter region replication` · `asia data sovereignty localization` · `cloud egress fee economics` · `iops bottleneck tar archiving`

## Related Videos

- [The Transport Revolution: Deconstructing HTTP/3](https://youtu.be/JWeu5aqAkR0) — Development · 212 views · Apr 1, 2026 · [Details](JWeu5aqAkR0.md) (shared: `migration` · `tcp` · `udp`)
- [The 2026 Change Data Capture Blueprint](https://youtu.be/am9FvNiJ24M) — Development · 32 views · Apr 8, 2026 · [Details](am9FvNiJ24M.md) (shared: `data` · `replication`)
- [Modernizing Legacy COBOL](https://youtu.be/2Ni8zfsxW6o) — Development · 28 views · Feb 1, 2026 · [Details](2Ni8zfsxW6o.md) (shared: `migration` · `efficiency`)
- [RFC 862 and the Echo Protocol](https://youtu.be/ea5lpF3RyzE) — Development · 40 views · Apr 7, 2026 · [Details](ea5lpF3RyzE.md) (shared: `tcp` · `udp`)
- [The AI Copilot Era Equation](https://youtu.be/xwEN7oZFvdw) — Development · 53 views · Jun 10, 2026 · [Details](xwEN7oZFvdw.md) (shared: `cloud` · `economics`)

---
*Auto-generated on Jul 28, 2026. Back to [development](../development.md) · [index](../index.md).*
