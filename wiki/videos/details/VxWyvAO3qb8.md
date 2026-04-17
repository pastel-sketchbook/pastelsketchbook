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

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
