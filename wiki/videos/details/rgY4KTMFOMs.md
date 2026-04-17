---
type: video
videoId: rgY4KTMFOMs
category: kubernetes
tags: []
views: 40
date: 2026-02-05T14:29:16Z
summarized: 2026-04-16T22:00:00.000Z
---

# Secure Web App with Azure AD/OAuth2 Proxy

> [kubernetes](../kubernetes.md) · 40 views · Feb 05, 2026
> [Watch on YouTube](https://youtu.be/rgY4KTMFOMs)

## Summary

This video is a technical case study on implementing Azure AD and OAuth2 Proxy authentication for a Bun/TypeScript application deployed on AKS, transitioning from open access to a zero-trust architecture. The two-layer security model uses OAuth2 Proxy combined with Azure AD authentication at the ingress, with Istio as the service mesh for traffic routing. Access is restricted to members of a specific Azure AD group, replacing network-level trust with identity-level trust.

## Key Takeaways

- The migration from open access to zero trust implements two-layer security: OAuth2 Proxy at ingress combined with Azure AD authentication.
- Access is governed through Azure AD group enforcement, restricting the application to specific authorized group members only.
- Istio service mesh handles traffic routing with precision while Azure Workload Identity eliminates stored secrets for service authentication.
- The application is built on Bun with TypeScript, deployed on AKS with the security layer operating entirely at the infrastructure level.

## Topics Covered

`azure ad authentication` · `oauth2 proxy` · `zero trust architecture` · `aks security` · `istio service mesh` · `workload identity`

---
*Auto-generated on Apr 16, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
