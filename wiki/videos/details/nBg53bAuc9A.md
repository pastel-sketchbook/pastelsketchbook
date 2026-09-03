---
type: video
videoId: nBg53bAuc9A
category: kubernetes
tags: [zero-trust, k8s]
views: 1
date: 2026-09-02T23:00:23Z
summarized: 2026-09-03T03:00:00.000Z
---

# Zero-Trust Database Credentials in Kubernetes

> [kubernetes](../kubernetes.md) · 1 views · Sep 02, 2026
> [Watch on YouTube](https://youtu.be/nBg53bAuc9A)

## Summary

An architectural blueprint for zero-trust database credentials in Kubernetes that replaces static Kubernetes Secrets and long-lived environment variables with short-lived, dynamically injected credentials sourced from an external vault (CyberArk Central Credential Provider, following the external secrets operator and HashiCorp Vault dynamic-credentials pattern). It details a pod-level design where a CyberArk-fetcher init container authenticates via workload identity — SPIFFE/SPIRE-issued client certificates for mutual TLS and projected service-account JWT validation — over TLS 1.3 with strict NetworkPolicy egress, writing credentials to a `tmpfs` `emptyDir` volume at `/var/run/secrets/db` as `creds.properties` with `chmod 600`/`chown 1001` and non-root execution to eliminate API leaks, `/proc/*/environ` inspection, and `/dev/mem` dump vectors. TomEE then consumes the RAM-only file at runtime through property replacement or a custom PasswordCipher to configure its JDBC/DBCP pool without ConfigMap cleartext, while credential rotation is handled by evolving from init-only (pod-restart) to a continuous sidecar refresh loop that depends on `testOnBorrow=true` and `validationQuery=SELECT 1` to prune stale connections on authentication failures.

## Key Takeaways

- Static credentials in Kubernetes Secrets, ConfigMaps, and container environment variables break zero-trust because they leak via the Kubernetes API, remain visible in `/proc/<pid>/environ` to any process with pod exec, and can be scraped from RAM or swap via `/dev/mem` dumps and memory forensics.
- Secure injection follows the external-secrets-operator pattern: a dedicated init container acting as CyberArk fetcher authenticates to CyberArk CCP over HTTPS mTLS using SPIFFE/SPIRE or cert-manager-signed client certificates (`client.crt`/`client.key`/`ca.crt`) plus projected service-account JWTs sent as a custom header or via reverse proxy, gated by NetworkPolicy egress to port 443, then `curl` plus `jq` parsing for `k8s-tommy-app`/`db-prod-user` in `db-safes` writes `creds.properties` to a shared `tmpfs` `emptyDir` at `/var/run/secrets/db`.
- Least-privilege and ephemeral storage harden the path: `emptyDir.medium: Memory` with `sizeLimit: 10Mi`, `chmod 600` and `chown 1001:1001` restricting access to non-root UID 1001, and no disk persistence so secrets vanish on pod termination, crash, or eviction, all transported over TLS 1.3 with mutual authentication and CyberArk AppID without a bootstrap password.
- TomEE achieves zero cleartext consumption by reading from the in-memory volume at runtime rather than ConfigMaps: option one uses native property replacement (`-D` pointing to `/var/run/secrets/db/creds.properties`) with low complexity but moderate cleartext risk in `tomee.xml`, while option two implements a custom `PasswordCipher` Java class that resolves the password from the file path, eliminating cleartext from configuration entirely.
- Rotation requires a sidecar over init-only: the init container runs once at pod boot and forces pod restarts on CyberArk rotation (breaking active connections), whereas a continuously running sidecar periodically refreshes the RAM volume, relies on DBCP `testOnBorrow=true` and `validationQuery=SELECT 1`, catches SQL authentication exceptions on stale connections, prunes the pool, and re-establishes connections with fresh credentials without downtime.

## Topics Covered

`zero-trust database credentials` · `kubernetes secrets management` · `external secrets operator pattern` · `vault dynamic credentials cyberark ccp` · `workload identity spire` · `tmpfs emptydir in-memory volume` · `credential rotation sidecar`

## Tags

[zero-trust](../tags/zero-trust.md) · [k8s](../tags/k8s.md)

## Related Videos

- [Zero Trust in Kubernetes](https://youtu.be/4b-H6ZaoNUE) — Kubernetes · 47 views · Jan 17, 2026 · [Details](4b-H6ZaoNUE.md) (shared: `kubernetes` · `workload` · `identity`)
- [Architecting Kubernetes Operators](https://youtu.be/hvkvH7i8NLc) — Kubernetes · 18 views · May 31, 2026 · [Details](hvkvH7i8NLc.md) (shared: `kubernetes` · `pattern` · `workload`)
- [Architecting Enterprise Secret Management in Rust](https://youtu.be/JrCT7Xu-aGU) — Kubernetes · 20 views · Jun 25, 2026 · [Details](JrCT7Xu-aGU.md) (shared: `secrets` · `credential` · `rotation`)
- [Seamless GitOps on Azure](https://youtu.be/9ga0NT3ZohQ) — Kubernetes · 17 views · May 22, 2026 · [Details](9ga0NT3ZohQ.md) (shared: `kubernetes` · `workload` · `identity`)
- [Kubernetes 1.36 (Haru)](https://youtu.be/2ksi8K7wg3I) — Kubernetes · 95 views · Apr 23, 2026 · [Details](2ksi8K7wg3I.md) (shared: `kubernetes` · `dynamic` · `volume`)

---
*Auto-generated on Sep 03, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
