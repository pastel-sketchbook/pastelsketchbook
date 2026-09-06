---
type: video
videoId: sQz9WyN2s04
category: kubernetes
tags: [curiosity, rdma, multi-rail, inference]
views: 42
date: 2026-09-04T23:00:12Z
summarized: 2026-09-06T13:56:27.000Z
---

# Architecting Multi-Rail Fabrics for On-Premise AI Inference

> [kubernetes](../kubernetes.md) · 42 views · Sep 04, 2026
> [Watch on YouTube](https://youtu.be/sQz9WyN2s04)

## Summary

A master blueprint for scaling 500GB+ frontier models beyond a single node with multi-rail RDMA fabrics for on-premise AI inference, where the bottleneck shifts from compute to interconnect TTFT/TPOT. It details multi-fabric separation (400–800 Gbps RDMA compute fabric, 900 Gbps–1.8 Tbps NVLink scale-up, GDS/NVMe-oF storage fabric, Kubernetes management and isolated OOB fabrics), rail-optimized spine-leaf topology with GPU-to-rail affinity, and the InfiniBand versus RoCEv2 tradeoff (0.5–1.5µs natively lossless versus 1–3+µs with PFC/ECN tuning). The stack is rounded out with disaggregated prefill/decode KV-cache transfer via NCCL, tensor-parallel all-reduce and MoE routing, 1:1 GPU-to-NIC NUMA/PCIe alignment, GPU Direct Storage for second-scale LLM cold starts, and Kubernetes orchestration with SR-IOV, RDMA device plugin, OFED drivers, NCCL/NVSHMEM, and vLLM/TensorRT-LLM/SGLang runtimes.

## Key Takeaways

- Frontier-model inference is interconnect-bound, so multi-node prefill optimizes time to first token (TTFT) latency while decode optimizes time per output token (TPOT) throughput, replacing the single-node compute-bound model under 80 GB.
- GPU RDMA bypass moves data directly from GPU to NIC over PCIe, cutting latency from 30–100+ microseconds on the legacy GPU→RAM→CPU→NIC TCP/IP path to microsecond-level with 100% CPU offload.
- Rail-optimized spine-leaf topology pins each GPU index to a dedicated leaf rail (e.g. all GPU 0s to rail 1) so intra-rail tensor-parallel collectives stay single-hop, with spine switches reserved strictly for cross-rail traffic.
- InfiniBand gives natively lossless hardware-credit flow control at 0.5–1.5µs latency via a subnet manager at 1.5–2x cost, while RoCEv2 runs 1–3+µs on standard Ethernet but requires strict PFC on priority 3 plus ECN/DCQCN tuning and existing Ethernet automation.
- Bring-up follows a five-stage roadmap: verify PCIe/NUMA alignment with `nvidia-smi topo -m`, enforce lossless PFC/ECN/DCQCN, deploy NVIDIA GPU/network operators with SR-IOV in Kubernetes, prove line rate with `ib_write_bw` and `all_reduce_perf`, and confirm GPU-Direct RDMA bypass in NCCL debug logs.

## Topics Covered

`multi-rail rdma fabrics` · `rail-optimized spine-leaf topology` · `infiniband versus rocev2` · `disaggregated prefill decode` · `tensor parallelism all-reduce` · `gpu direct storage` · `kubernetes rdma orchestration`

## Tags

[curiosity](../tags/curiosity.md) · [rdma](../tags/rdma.md) · [multi-rail](../tags/multi-rail.md) · [inference](../tags/inference.md)

## Related Videos

- [Architecting LLM Inference at Scale](https://youtu.be/WI8yUaPon0w) — Kubernetes · 22 views · Jul 31, 2026 · [Details](WI8yUaPon0w.md) (shared: `disaggregated` · `prefill` · `decode`)
- [KAITO: The Kubernetes Al Toolchain Operator](https://youtu.be/kFzdToXTfn8) — Kubernetes · 19 views · Jul 21, 2026 · [Details](kFzdToXTfn8.md) (shared: `gpu` · `storage` · `kubernetes`)
- [Architecting Meilisearch on AKS & Istio](https://youtu.be/MIZ0ATwu7C0) — Kubernetes · 27 views · Feb 10, 2026 · [Details](MIZ0ATwu7C0.md) (shared: `storage` · `kubernetes`)
- [From Stateful to Secure](https://youtu.be/0U-SUJCmKAU) — Kubernetes · 48 views · Jan 16, 2026 · [Details](0U-SUJCmKAU.md) (shared: `storage` · `kubernetes`)
- [Scaling Node.js from PM2 to Cloud-Native Orchestration](https://youtu.be/p9LNSeAt5Zw) — Kubernetes · 22 views · Apr 22, 2026 · [Details](p9LNSeAt5Zw.md) (shared: `kubernetes` · `orchestration`)

---
*Auto-generated on Sep 06, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
