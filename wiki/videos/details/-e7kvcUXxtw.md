---
type: video
videoId: -e7kvcUXxtw
category: kubernetes
tags: [shift left, governance, monitoring, security, stride]
views: 23
date: 2026-04-29T21:49:39Z
summarized: 2026-06-03T23:20:00.000Z
---

# DevSecOps on Azure Kubernetes Service

> [kubernetes](../kubernetes.md) · 23 views · Apr 29, 2026
> [Watch on YouTube](https://youtu.be/-e7kvcUXxtw)

## Summary

A blueprint for embedding continuous security across the AKS application lifecycle by mapping five stages — plan, develop, build, deploy, operate — onto Microsoft Entra ID, GitHub Advanced Security, Azure Container Registry, Microsoft Defender for Containers/DevOps, Ratify, Azure Policy/Gatekeeper, Azure CNI with Cilium, and the Sentinel/Monitor/Log Analytics observability stack. The talk argues for STRIDE-driven threat modeling up front, signed-image and SBOM-backed supply chain integrity, OIDC-based pull GitOps, and unified SIEM correlation in production.

## Key Takeaways

- Shift security left by running SonarQube, SARIF, OWASP, and Trivy checks inside the IDE and pre-commit hooks so vulnerabilities are caught before code ever leaves the developer workstation.
- Build supply-chain trust with SBOMs (Microsoft SBOM tool or Syft producing SPDX/CycloneDX), Defender for Containers registry scans, and Notation + Azure Key Vault image signing verified at admission by Ratify.
- Enforce cluster posture as code using Azure Policy and Gatekeeper at the cluster layer, unattended OS/runtime upgrades at the node layer, and Azure CNI powered by Cilium's eBPF data plane with FQDN filtering at the pod layer.
- Eliminate long-lived secrets in deployment by combining GitHub environment approvals, OpenID Connect federation, and pull-based GitOps to reach Azure resources without stored credentials.
- Unify operational visibility through Azure Monitor + managed Grafana for metrics, Log Analytics for centralized logs, and Microsoft Sentinel + Defender for Cloud for correlated threat detection and configuration-drift alerting.

## Topics Covered

`devsecops lifecycle` · `stride threat modeling` · `software bill of materials` · `image signing with notation` · `ratify admission verification` · `oidc gitops deployment` · `azure cni cilium ebpf` · `azure policy gatekeeper governance` · `sentinel defender siem correlation`

## Tags

[shift left](../tags/shift left.md) · [governance](../tags/governance.md) · [monitoring](../tags/monitoring.md) · [security](../tags/security.md) · [stride](../tags/stride.md)

## Related Videos

- [The Complete Codebase Lifecycle](https://youtu.be/C6wLm6NRZW4) — Kubernetes · 6 views · Jan 14, 2026 · [Details](C6wLm6NRZW4.md) (shared: `lifecycle` · `azure` · `governance`)
- [Seamless GitOps on Azure](https://youtu.be/9ga0NT3ZohQ) — Kubernetes · 11 views · May 22, 2026 · [Details](9ga0NT3ZohQ.md) (shared: `image` · `gitops` · `deployment`)
- [The Codebase Lifecycle](https://youtu.be/ctKLD4d146g) — Kubernetes · 16 views · Jan 13, 2026 · [Details](ctKLD4d146g.md) (shared: `lifecycle` · `deployment`)
- [Zero Trust in Kubernetes](https://youtu.be/4b-H6ZaoNUE) — Kubernetes · 46 views · Jan 17, 2026 · [Details](4b-H6ZaoNUE.md) (shared: `cilium` · `policy`)
- [Strategic Implementation of Blue-Green Deployment](https://youtu.be/Hd767VA7Z-0) — Kubernetes · 13 views · Mar 10, 2026 · [Details](Hd767VA7Z-0.md) (shared: `deployment` · `azure`)

---
*Auto-generated on Jun 3, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
