---
type: video
videoId: 6XAbKoeK9JU
category: kubernetes
tags: [rabbitmq, plugins]
views: 11
date: 2026-07-08T23:00:34Z
summarized: 2026-07-09T19:01:18.635Z
---

# RabbitMQ 4.2.8 Plugin Ecosystem

> [kubernetes](../kubernetes.md) · 11 views · Jul 8, 2026
> [Watch on YouTube](https://youtu.be/6XAbKoeK9JU)

## Summary

A Kubernetes- and AKS-targeted capability reference for the RabbitMQ 4.2.8 Alpine image, covering plugin lifecycle states (explicitly enabled, implicitly enabled as a dependency, or bundled-dormant) and an active core profile spanning management, Prometheus telemetry, OAuth2/peer-discovery, and Shovel-based message movement. It walks the auth backends (OAuth2 JWT, LDAP, HTTP, cache, SSL/TLS trust store, loopback), cross-broker routing (Shovel vs Federation), protocol bridges (AMQP 1.0, MQTT, STOMP, WebSockets), streams and custom routing, the three-step operator-driven enablement workflow, and a five-surface 360° verification strategy.

## Key Takeaways

- Only top-level plugins need explicit enablement via `spec.rabbitMQ.additionalPlugins`; dependencies such as management_agent, web_dispatch, and peer_discovery_common are resolved and activated automatically by the operator.
- The active core profile pairs management (HTTP API + web UI on 15672) with Prometheus metrics on /metrics:15692, OAuth2 JWT auth against providers like Azure AD, Kubernetes headless-service peer discovery, and Shovel for dead-letter-queue replay.
- Auth backends span OAuth2, LDAP/Active Directory, HTTP delegation, a cache booster, SSL/TLS client-certificate auth with a dynamic runtime trust store (no broker restart), and a loopback backend that forces external auth for non-local clients.
- Cross-broker needs split between Shovel (point-to-point DLQ replay, static + dynamic) and Federation (geo-distribution, multi-DC HA/DR), while protocols extend beyond AMQP 0-9-1 to AMQP 1.0, MQTT 3.1.1/5.0, STOMP, and WebSockets.
- Enablement is declare (CR) → `kubectl apply` → operator updates the plugins ConfigMap, with block storage (AKS) applying changes automatically but NFS-backed clusters requiring a rolling restart; verify via CLI, management UI, ConfigMap, management API, and Prometheus metrics.

## Topics Covered

`rabbitmq plugin lifecycle` · `kubernetes operator reconcile` · `oauth2 jwt authentication` · `prometheus metrics scraping` · `shovel dead letter replay` · `federation geo distribution` · `amqp mqtt stomp protocols` · `rabbitmq streams`

## Tags

[rabbitmq](../tags/rabbitmq.md) · [plugins](../tags/plugins.md)

## Related Videos

- [From Stateful to Secure](https://youtu.be/0U-SUJCmKAU) — Kubernetes · 48 views · Jan 16, 2026 · [Details](0U-SUJCmKAU.md) (shared: `rabbitmq` · `kubernetes`)
- [Choosing Your Messaging Fabric on AKS](https://youtu.be/N4nRAfBZ3BE) — Kubernetes · 5 views · Jan 10, 2026 · [Details](N4nRAfBZ3BE.md) (shared: `rabbitmq` · `kubernetes`)
- [Bridging the Mainframe to the Cloud](https://youtu.be/7iWL5-0C66s) — Kubernetes · 26 views · Apr 4, 2026 · [Details](7iWL5-0C66s.md) (shared: `rabbitmq` · `distribution`)
- [Architecting Kubernetes with CUE](https://youtu.be/to1PClyd0YA) — Kubernetes · 19 views · Mar 16, 2026 · [Details](to1PClyd0YA.md) (shared: `kubernetes` · `prometheus`)
- [minikv: Distributed Systems Meets Data Science](https://youtu.be/a8heWpae5p0) — Kubernetes · 18 views · Apr 11, 2026 · [Details](a8heWpae5p0.md) (shared: `kubernetes` · `operator`)

---
*Auto-generated on Jul 9, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
