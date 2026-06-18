---
type: video
videoId: RLlEbcXO6k8
category: kubernetes
tags: []
views: 8
date: 2026-03-22T22:39:06Z
summarized: 2026-04-16T22:00:00.000Z
---

# Migrating Workloads from AWS to Azure

> [kubernetes](../kubernetes.md) · 8 views · Mar 22, 2026
> [Watch on YouTube](https://youtu.be/RLlEbcXO6k8)

## Summary

This video presents a structured migration framework for moving workloads from AWS to Azure, emphasizing a like-for-like mapping strategy that replicates the exact AWS architecture on Azure to minimize risk. The mapping covers EC2 to VMs/App Services, ALB to Azure Load Balancer, RDS/DynamoDB to Azure SQL/Cosmos DB, and VPC/Security Groups to VNet/NSG/Azure Firewall. The key strategic decision is to not modernize during migration, preventing scope creep and establishing stability first.

## Key Takeaways

- The migration uses a like-for-like mapping strategy: EC2→VMs, ALB→Azure Load Balancer, RDS→Azure SQL, DynamoDB→Cosmos DB, VPC→VNet.
- The strategic decision to not modernize during migration prevents scope creep and ensures architectural stability before optimization.
- Network layer mapping replaces AWS Security Groups and Gateway Endpoints with Azure NSGs, Azure Firewall, and Private Endpoints.
- The framework prioritizes predictability by replicating exact operational patterns on Azure before considering cloud-native optimizations.

## Topics Covered

`aws to azure migration` · `cloud migration strategy` · `like-for-like mapping` · `cosmos db` · `azure vnet` · `scope creep prevention`

## Related Videos

- [The Cloud Rosetta Stone](https://youtu.be/PMgUhFxrjPc) — Kubernetes · 23 views · Apr 18, 2026 · [Details](PMgUhFxrjPc.md) (shared: `aws` · `azure` · `mapping`)
- [Bridging the Mainframe to the Cloud](https://youtu.be/7iWL5-0C66s) — Kubernetes · 26 views · Apr 4, 2026 · [Details](7iWL5-0C66s.md) (shared: `migration` · `cloud`)
- [Modern Hybrid Identity ](https://youtu.be/nJ10P-fRqZQ) — Kubernetes · 8 views · Mar 17, 2026 · [Details](nJ10P-fRqZQ.md) (shared: `migration` · `cloud`)
- [Strategic Implementation of Blue-Green Deployment](https://youtu.be/Hd767VA7Z-0) — Kubernetes · 13 views · Mar 10, 2026 · [Details](Hd767VA7Z-0.md) (shared: `azure` · `strategy`)
- [AWS Database Selection Blueprint](https://youtu.be/78Sm363xiIw) — Kubernetes · 9 views · Jun 12, 2026 · [Details](78Sm363xiIw.md) (shared: `aws` · `migration`)

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Architect's Sketchbook](zmd://wiki/books/architects-sketchbook.md) — Chapter 2** (confidence: 14%)_
