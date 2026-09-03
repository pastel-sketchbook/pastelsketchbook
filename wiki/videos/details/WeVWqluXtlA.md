---
type: video
videoId: WeVWqluXtlA
category: kubernetes
tags: [k8s, stateful, nfs]
views: 17
date: 2026-08-30T23:00:07Z
summarized: 2026-09-03T03:00:00.000Z
---

# Upgrading MKE with NFS Stateful Workloads

> [kubernetes](../kubernetes.md) · 17 views · Aug 30, 2026
> [Watch on YouTube](https://youtu.be/WeVWqluXtlA)

## Summary

An architectural playbook for stateful-safe upgrades of Mirantis Kubernetes Engine with NFS stateful workloads, showing how external NFS decouples persistent data from node lifecycles so workloads survive drains and full cluster upgrades when network reachability and Kubernetes storage orchestration are preserved. It contrasts untracked inline NFS pod mounts with PV/PVC-orchestrated NFS that provides a fully managed lifecycle, safe suspend/reschedule and StatefulSet/Deployment support, detailed via a `nfs-pv-prod` PersistentVolume (100Gi, ReadWriteMany, Retain, `vers=4.1,hard` on `nfs.example.com:/exports/proddata`). It then enforces the strict dependency order — external etcd → MKE managers one-at-a-time to protect raft quorum → Docker Trusted Registry → CSI drivers (Portworx/Pure/Rex-Ray/EBS) → workers — guarded by pod disruption budgets, strict version-skew limits, and pre/post-flight validation.

## Key Takeaways

- External NFS isolates persistent data from Mirantis Kubernetes Engine node lifecycles, unlike local storage tied to a container/worker that is lost on drain/reboot; NFS-backed pods survive drains and cluster upgrades only if NFS reachability is maintained and Kubernetes storage orchestration via persistent volume/persistent volume claim is used, as inline pod mounts are untracked, detach abruptly on pod deletion, and support only single pods.
- Always use PV/PVC over inline `nfs` mounts: PV/PVC gives visibility, managed lifecycle, and safe rescheduling across StatefulSets and Deployments; the MKE-compatible PV example uses `apiVersion: v1`, `kind: PersistentVolume`, `metadata.name: nfs-pv-prod`, `capacity: 100Gi`, `accessModes: ReadWriteMany` (required for shared directories/CI/CD/multi-pod), `persistentVolumeReclaimPolicy: Retain` (prevents accidental deletion), `mountOptions: [vers=4.1, hard]` per Mirantis/Kubernetes guidance, and `nfs: { server: nfs.example.com, path: /exports/proddata }`.
- Preflight validation is mandatory: keep `/var` <70% on all nodes, use `overlay2`, confirm chosen storage drivers (NFS, Rex-Ray, EBS, Portworx, Pure) support the target MKE version, verify NFS server reachable from all nodes with no firewall changes during upgrades, configure a pod disruption budget for every StatefulSet, and respect version skew — managers within ±1 minor of workers and kubelets never jump >1 minor — baselined via `ucp health`, `docker system info`, and `kubectl get nodes`.
- Upgrade in absolute dependency order: external etcd first, then MKE managers (control plane) one at a time, then Docker Trusted Registry (DTR) after managers but before workers, then CSI drivers verified, finally MKE workers; manager upgrades protect raft quorum via three steps — A) health checks (`docker container run --rm -v /var/run/docker.sock:/var/run/docker.sock mirantis/ucp upgrade checks`), B) MKE upgrade of the target, C) raft stability verification (`ucp swarm status`) — always maintaining majority quorum (≥2/3, ≥3/5; diagram shows 4/5 active with one sinking).
- Safe worker drains require `kubectl drain --ignore-daemonsets --delete-emptydir-data` to avoid hanging on DaemonSets and to preserve `emptyDir` data, with correctly configured pod disruption budgets preventing forced eviction and letting the scheduler relocate pods; the three-phase survival model is cordon worker A → graceful pod termination → PV/PVC automatically detaches/remounts NFS share on healthy worker B, while simultaneous drains of nodes hosting the same StatefulSet must never occur — even with PDBs, concurrent loss breaks replica consensus and halts MongoDB/Cassandra/etcd quorum — validated post-upgrade via `kubectl get pv/pvc`, `kubectl describe pvc`, `kubectl rollout status statefulset/<name>`, `kubectl exec -it pod -- mount | grep <nfs-server>`, `docker plugin ls`, `kubectl get events --sort-by=.metadata.creationTimestamp`, and `ucp health`.

## Topics Covered

`mke nfs stateful workloads` · `pv pvc orchestration` · `raft quorum protection` · `etcd dtr csi upgrade sequence` · `pod disruption budgets` · `worker drain safety` · `storage validation post-upgrade checks`

## Tags

[k8s](../tags/k8s.md) · [stateful](../tags/stateful.md) · [nfs](../tags/nfs.md)

## Related Videos

- [Mastering Batch Workload Orchestration on Kubernetes](https://youtu.be/XKTtea0xGsA) — Kubernetes · 25 views · Jul 17, 2026 · [Details](XKTtea0xGsA.md) (shared: `orchestration` · `pod disruption budgets` · `pod`)
- [Kubernetes Cluster Architecture](https://youtu.be/rJTUB-u8U2Y) — Kubernetes · 13 views · Jan 9, 2026 · [Details](rJTUB-u8U2Y.md) (shared: `etcd` · `pod` · `worker`)
- [From Stateful to Secure](https://youtu.be/0U-SUJCmKAU) — Kubernetes · 48 views · Jan 16, 2026 · [Details](0U-SUJCmKAU.md) (shared: `stateful` · `workloads` · `storage`)
- [Mastering Hybrid CDC Architectures](https://youtu.be/KdLQEv3Tiiw) — Kubernetes · 24 views · Apr 7, 2026 · [Details](KdLQEv3Tiiw.md) (shared: `stateful` · `workloads` · `storage`)
- [Orchestrating Kubernetes Resilience](https://youtu.be/ZECKRFPN8BA) — Kubernetes · 16 views · Aug 25, 2026 · [Details](ZECKRFPN8BA.md) (shared: `pod` · `disruption` · `drain`)

---
*Auto-generated on Sep 03, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
