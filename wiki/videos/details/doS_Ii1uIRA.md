---
type: video
videoId: doS_Ii1uIRA
category: kubernetes
tags: [satellite, rhel]
views: 23
date: 2026-08-31T23:00:30Z
summarized: 2026-09-03T03:00:00.000Z
---

# Orchestrating Red Hat Satellite

> [kubernetes](../kubernetes.md) · 23 views · Aug 31, 2026
> [Watch on YouTube](https://youtu.be/doS_Ii1uIRA)

## Summary

This visual guide maps Red Hat Satellite's hub-and-spoke architecture — a central Satellite server synced to the Red Hat CDN, Capsule Servers with Smart Proxy gateways as local relays for remote data centers, and client hosts — onto its open-source engine of Foreman (UI/API, provisioning, inventory, RBAC), Pulp (fetching, storing, versioning and distributing RPMs and container images), Candlepin (entitlement validation and activation keys), Qpid Dispatch (AMQP messaging), and Ansible/Puppet for state enforcement and drift remediation. It details how content views filter aggregated repositories (Red Hat CDN, EPEL) into immutable versioned snapshots (e.g., excluding zero-day kernels, freezing by date to v1.0) and composite content views merge OS, DB, and security team streams into a unified release, which lifecycle environments then promote as an immutable binary through Library → Development → Testing → Production with single-API rollback. The session contrasts native Satellite capabilities (content views, CVE filtering, Candlepin offline manifests, automated Capsules) against DIY reposync (manual trees, modifyrepo for updateinfo.xml, rsync cron), and specifies the five-step air-gapped pipeline (sync upstream → export via `export connected satellite.sh` → transfer via USB/hard drive/data diode → import → promote) requiring internal NTP stratum 1/2 and 1–2 TB storage, plus firewall flows — Capsule→Satellite TCP 443 (API/Katello), 8443 (Candlepin API), 9090 (Smart Proxy API) and bidirectional 5647 (Qpid Dispatch AMQP) via firewalld — and remote-execution modes of push SSH on TCP 22 versus pull MQTT on 1883/8883 with activation keys rewriting `etc.yum.repos.d/redhat.repo` to Pulp endpoints.

## Key Takeaways

- Hub-and-spoke with layered open-source engine: central Satellite as Red Hat CDN-linked control tower, purple Capsule Servers for content caching and local task execution, green client hosts fetching updates, backed by Foreman (control plane), Pulp (content distribution), Candlepin (licensing/activation keys), Ansible/Puppet (configuration), and Smart Proxy on Capsules for secure Foreman-to-host gateway — more robust than DIY reposync directory trees.
- Content views provide native isolation and versioning: aggregate raw repos into filtered, immutable snapshots (e.g., exclude zero-day kernel, freeze RPMs to a date → publish v1.0), while composite content views (CCVs) solve team scale by merging standalone OS/DB/security content views from separate conveyor belts into one coherent release for endpoints.
- Lifecycle environments choreograph when software moves: Library locks the baseline package state, Development validates application integration, Testing provides final QA sign-off, and Production enforces patch compliance, promoting the exact same immutable binary state so a breaking patch can be rolled back for an entire host group with one API call without re-download.
- Air-gapped "deep space" topology uses upstream Satellite in the connected DMZ to aggregate and `export connected satellite.sh` content, physically transfer it across the air gap (USB/hard drive or data diode) to a downstream Satellite with zero outbound access that uses offline RHSM manifests to manage isolated hosts and Capsules, staged via the five steps sync → export → transfer → import → promote.
- Networking is explicitly firewall-driven and consumption is key-bound: Capsule→Satellite requires TCP 443 for Katello/API downloads, 8443 for Candlepin, 9090 for Smart Proxy API, plus bidirectional 5647 for Qpid Dispatch AMQP (all via firewalld); hosts bind to a content view + lifecycle environment via activation keys that dynamically update `etc.yum.repos.d/redhat.repo` to the correct Pulp endpoint, with remote execution as push SSH on 22 or pull MQTT on 1883/8883 where clients poll Capsule/Satellite, ideal for blocking inbound SSH.

## Topics Covered

`red hat satellite capsule` · `pulp composite content views` · `lifecycle environments promotion` · `candlepin activation keys` · `qpid dispatch firewall ports` · `air-gapped satellite export` · `ssh mqtt remote execution`

## Tags

[satellite](../tags/satellite.md) · [rhel](../tags/rhel.md)

## Related Videos

- [RabbitMQ 4.2.8 Plugin Ecosystem](https://youtu.be/6XAbKoeK9JU) — Kubernetes · 19 views · Jul 8, 2026 · [Details](6XAbKoeK9JU.md) (shared: `lifecycle` · `mqtt`)
- [The Complete Codebase Lifecycle](https://youtu.be/C6wLm6NRZW4) — Kubernetes · 6 views · Jan 14, 2026 · [Details](C6wLm6NRZW4.md) (shared: `lifecycle`)
- [The Codebase Lifecycle](https://youtu.be/ctKLD4d146g) — Kubernetes · 16 views · Jan 13, 2026 · [Details](ctKLD4d146g.md) (shared: `lifecycle`)
- [Kubernetes Version Upgrade Strategy](https://youtu.be/ftODZr2_V5Q) — Kubernetes · 32 views · Dec 26, 2025 · [Details](ftODZr2_V5Q.md) (shared: `lifecycle`)
- [Clickhouse is Winning the Observability Wars](https://youtu.be/mf86g5lXfTg) — Kubernetes · 25 views · Jul 16, 2026 · [Details](mf86g5lXfTg.md) (shared: `views`)

---
*Auto-generated on Sep 03, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
