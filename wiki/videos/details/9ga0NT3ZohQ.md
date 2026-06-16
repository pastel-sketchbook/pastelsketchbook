---
type: video
videoId: 9ga0NT3ZohQ
category: kubernetes
tags: [aks, argocd, gitops]
views: 6
date: 2026-05-22T09:48:19Z
summarized: 2026-05-22T22:00:00.000Z
---

# Seamless GitOps on Azure

> [kubernetes](../kubernetes.md) · 6 views · May 22, 2026
> [Watch on YouTube](https://youtu.be/9ga0NT3ZohQ)

## Summary

Microsoft announces public preview of Argo CD natively integrated into the AKS Azure portal experience, eliminating the integration tax of manually wiring identity, networking, ingress, and registries before the first GitOps deployment. The native experience replaces hard-coded credentials with Microsoft Entra ID and workload identity federation, runs on a hardened Azure Linux base image, and ships with optional automatic patch updates while preserving 100% upstream Argo CD parity and hub-and-spoke fleet support.

## Key Takeaways

- Argo CD is now natively enabled inside the AKS portal with a single click, removing manual CLI installation and the integration tax of wiring identity, ingress, networking, and container registries.
- Security shifts from hard-coded credentials and long-lived secrets to Microsoft Entra ID single sign-on and workload identity federation for secure, identity-based cluster access.
- The deployment foundation moves from variable community base images to a hardened Azure Linux image with significantly reduced CVEs and optional automatic patch updates.
- The integration preserves 100% upstream Argo CD parity and supports hub-and-spoke fleet architectures, so large-scale multi-cluster GitOps workflows remain portable.
- The lifecycle is framed across day zero (guided onboarding), day one (enterprise-ready identity), and day two (scalable fleet operations) — turning a previously weeks-long bring-up into a portal-driven workflow.

## Topics Covered

`argo cd aks integration` · `gitops workflows` · `azure portal experience` · `workload identity federation` · `microsoft entra id sso` · `hub spoke fleet architecture` · `azure linux hardened image` · `kubernetes deployment automation`

## Tags

[aks](../tags/aks.md) · [argocd](../tags/argocd.md) · [gitops](../tags/gitops.md)

## Related Videos

- [Advanced Microservices Blueprint on Azure Kubernetes Service](https://youtu.be/BiYKKVsJROk) — Kubernetes · 21 views · Apr 1, 2026 · [Details](BiYKKVsJROk.md) (shared: `argo` · `aks` · `gitops`)
- [Secure Web App with Azure AD/OAuth2 Proxy](https://youtu.be/rgY4KTMFOMs) — Kubernetes · 60 views · Feb 5, 2026 · [Details](rgY4KTMFOMs.md) (shared: `aks` · `azure` · `workload`)
- [Dragonfly on AKS](https://youtu.be/Q4qm1hvVR2A) — Kubernetes · 21 views · Jan 31, 2026 · [Details](Q4qm1hvVR2A.md) (shared: `aks` · `integration` · `architecture`)
- [The 100+ Service Problem](https://youtu.be/_sxPf3tHq3s) — Kubernetes · 27 views · Jan 16, 2026 · [Details](_sxPf3tHq3s.md) (shared: `architecture` · `kubernetes` · `deployment`)
- [The Blueprint for Enterprise AI on Azure](https://youtu.be/8ycnldvJmuA) — Kubernetes · 18 views · Jan 2, 2026 · [Details](8ycnldvJmuA.md) (shared: `azure` · `architecture` · `kubernetes`)

---
*Auto-generated on May 22, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
