---
type: video
videoId: N4nRAfBZ3BE
category: kubernetes
tags: []
views: 5
date: 2026-01-10T21:55:01Z
summarized: 2026-04-16T22:00:00.000Z
---

# Choosing Your Messaging Fabric on AKS

> [kubernetes](../kubernetes.md) · 5 views · Jan 10, 2026
> [Watch on YouTube](https://youtu.be/N4nRAfBZ3BE)

## Summary

This architectural decision guide compares self-managed message brokers (RabbitMQ, NATS) versus managed PaaS offerings (Azure Service Bus, Azure Event Hubs) for asynchronous communication on Azure Kubernetes Service. The core trade-off is operational control versus managed simplicity: self-managed brokers provide full configuration and topology control but require deep DevOps expertise for monitoring, patching, and disaster recovery, while managed services shift that operational burden to Azure at the cost of less granular control.

## Key Takeaways

- Self-managed brokers like RabbitMQ and NATS on AKS provide full control over configuration, tuning, and topology but require specialized DevOps staffing for day-2 operations including patching and disaster recovery.
- Managed services like Azure Service Bus and Event Hubs eliminate operational overhead but reduce granular control over broker internals and introduce vendor lock-in.
- The decision is fundamentally about operational ownership: who is responsible for monitoring, scaling, and recovering the messaging layer when things fail.
- Loss of internal DevOps knowledge for self-managed brokers creates organizational risk that managed services inherently mitigate.

## Topics Covered

`azure kubernetes service` · `rabbitmq` · `nats` · `azure service bus` · `azure event hubs` · `messaging architecture` · `event-driven design`

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
