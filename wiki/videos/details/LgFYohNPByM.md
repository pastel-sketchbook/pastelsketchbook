---
type: video
videoId: LgFYohNPByM
category: kubernetes
views: 30
date: 2026-09-06T23:00:14Z
summarized: 2026-09-11T11:09:23.450Z
---

# Modernizing Kubernetes Secrets Management

> [kubernetes](../kubernetes.md) · 30 views · Sep 6, 2026
> [Watch on YouTube](https://youtu.be/LgFYohNPByM)

## Summary

This video traces a three-stage evolution from CyberArk CCP mTLS via cert-manager to SA JWT exchange and native Conjur authentication for Kubernetes workload identity. It details IIS and PVWA certificate-to-AppID mapping, kubelet atomic symlink rotation with Reloader versus in-memory hot reload, and a defense-in-depth delivery model using Conjur Followers as in-cluster caches.

## Key Takeaways

- Replace static IP-based CCP trust with verifiable workload identity because ephemeral pod IPs invalidate host-bound authentication.
- Use cert-manager with short-lived X.509 client certificates mapped via PVWA common name to CCP application IDs for legacy mTLS migration.
- Automate certificate rotation with Reloader rolling restarts for simplicity or in-memory hot reload with Go GetClientCertificate and Rust arc-swap for zero downtime.
- Bridge Kubernetes SA JWTs validated by the TokenReview API to legacy CCP via Conjur Secrets Provider sidecars or a custom auth proxy translating JWTs to mTLS.
- Deploy Conjur Followers as local tmpfs-backed caches with network policies, NAT-restricted AppIDs, and one-to-one safe mapping to eliminate the centralized IIS bottleneck.

## Topics Covered

`workload identity authentication` · `cyberark ccp mtls` · `cert-manager rotation` · `service account jwt exchange` · `conjur followers caching` · `zero-downtime certificate reload` · `defense-in-depth secrets delivery`

## Related Videos

- [Zero-Trust Database Credentials in Kubernetes](https://youtu.be/nBg53bAuc9A) — Kubernetes · 41 views · Sep 2, 2026 · [Details](nBg53bAuc9A.md) (shared: `workload` · `identity` · `cyberark`)
- [Secure Web App with Azure AD/OAuth2 Proxy](https://youtu.be/rgY4KTMFOMs) — Kubernetes · 95 views · Feb 5, 2026 · [Details](rgY4KTMFOMs.md) (shared: `workload` · `identity` · `authentication`)
- [A Blueprint for Secure Azure Authentication in Go](https://youtu.be/R2zktRqz81U) — Kubernetes · 18 views · Jan 12, 2026 · [Details](R2zktRqz81U.md) (shared: `identity` · `authentication` · `service`)
- [Zero Trust in Kubernetes](https://youtu.be/4b-H6ZaoNUE) — Kubernetes · 47 views · Jan 17, 2026 · [Details](4b-H6ZaoNUE.md) (shared: `workload` · `identity` · `service`)
- [Advanced Microservices Blueprint on Azure Kubernetes Service](https://youtu.be/BiYKKVsJROk) — Kubernetes · 24 views · Apr 1, 2026 · [Details](BiYKKVsJROk.md) (shared: `workload` · `identity` · `service`)

---
*Auto-generated on Sep 11, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
