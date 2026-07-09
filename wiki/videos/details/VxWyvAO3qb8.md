---
type: video
videoId: VxWyvAO3qb8
category: kubernetes
tags: [nats, azure, event-hubs, aks]
views: 14
date: 2026-01-15T12:59:07Z
summarized: 2026-04-16T22:00:00.000Z
---

# The Two-System Pattern

> [kubernetes](../kubernetes.md) · 14 views · Jan 15, 2026
> [Watch on YouTube](https://youtu.be/VxWyvAO3qb8)

## Summary

This video presents a reference architecture for integrating NATS as an internal cluster messaging system on Azure Kubernetes Service with Azure Event Hubs as an enterprise gateway. The "two-system pattern" separates east-west traffic (low-latency intra-cluster communication via NATS) from north-south traffic (durable, large-scale event streaming via Event Hubs). A bridge layer connects the two, achieving both local speed and global scalability.

## Key Takeaways

- NATS handles east-west intra-cluster messaging with high performance and low latency within an AKS cluster.
- Azure Event Hubs serves as the enterprise gateway for north-south traffic, providing durable long-term event streaming.
- The bridge layer between NATS and Event Hubs enables seamless data flow between internal microservices and external enterprise systems.
- This pattern separates concerns by traffic direction, allowing each messaging system to optimize for its specific workload.

## Topics Covered

`nats messaging` · `azure event hubs` · `aks architecture` · `east-west traffic` · `north-south traffic` · `event streaming`

## Related Videos

- [Choosing Your Messaging Fabric on AKS](https://youtu.be/N4nRAfBZ3BE) — Kubernetes · 5 views · Jan 10, 2026 · [Details](N4nRAfBZ3BE.md) (shared: `nats` · `messaging` · `azure event hubs`)
- [Continuous Flow](https://youtu.be/tcrNdx1yH_E) — Kubernetes · 15 views · Mar 22, 2026 · [Details](tcrNdx1yH_E.md) (shared: `azure event hubs` · `azure` · `event`)
- [Secure Web App with Azure AD/OAuth2 Proxy](https://youtu.be/rgY4KTMFOMs) — Kubernetes · 65 views · Feb 5, 2026 · [Details](rgY4KTMFOMs.md) (shared: `azure` · `aks` · `architecture`)
- [The Complete Codebase Lifecycle](https://youtu.be/C6wLm6NRZW4) — Kubernetes · 6 views · Jan 14, 2026 · [Details](C6wLm6NRZW4.md) (shared: `azure` · `aks`)
- [K8s Services  AKS & Istio](https://youtu.be/C5HqbzLRYZ0) — Kubernetes · 16 views · Jan 10, 2026 · [Details](C5HqbzLRYZ0.md) (shared: `aks` · `traffic`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Architect's Sketchbook](zmd://wiki/books/architects-sketchbook.md) — Chapter 1** (confidence: 30%)_
