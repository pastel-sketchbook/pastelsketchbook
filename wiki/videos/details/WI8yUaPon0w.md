---
type: video
videoId: WI8yUaPon0w
category: kubernetes
views: 8
date: 2026-07-31T23:00:03Z
summarized: 2026-08-01T17:57:00.000Z
---

# Architecting LLM Inference at Scale

> [kubernetes](../kubernetes.md) · 8 views · Jul 31, 2026
> [Watch on YouTube](https://youtu.be/WI8yUaPon0w)

## Summary

This talk is an architectural deep-dive into vLLM, the unified open-source serving engine that abstracts 200+ model architectures across Nvidia, AMD, TPU, XPU, and CPU hardware behind an OpenAI-compatible API. It explains the three-layer stack — serving front end, dynamic execution engine (torch.compile, CUDA graph dispatch), and hardware/memory layer — and the core techniques that deliver throughput and memory efficiency: PagedAttention for KV cache fragmentation, multi-tier GPU/CPU KV offloading with Triton swap kernels and zero-copy shared memory, dynamic attention kernel routing, and Ray-based distributed execution with expert parallelism load balancing. It closes with multi-tenant LoRA serving (Punica), a multimodal registry, disaggregated prefill/decode serving, and a hardened production container stack (C/CUDA core, Rust ZMQ frontend, vLLM OpenAI nonroot) deployed natively on Kubernetes via Helm with horizontal pod autoscaling.

## Key Takeaways

- Model × hardware fragmentation is the core problem: deploying 200+ model architectures across diverse accelerators requires per-model, per-platform optimization; vLLM collapses that into one engine with a standard OpenAI-compatible serving layer.
- PagedAttention maps non-contiguous physical memory to contiguous logical sequences, eliminating up to ~60% memory waste from fragmentation and overallocation in traditional KV cache serving.
- Multi-tier KV cache offloading uses asynchronous Triton swap kernels over PCIe plus zero-copy MAP shared memory views (torch.tensor views without duplication), with LRU and ARC eviction policies managing CPU memory.
- Disaggregated serving physically isolates compute-heavy prefill from memory-heavy decode, enabling independent scaling and direct high-speed KV cache transfer between the two worker types.
- Production deployment is a layered container: a C/CUDA compute core, a Rust frontend using ZMQ and MessagePack for IPC, and a vLLM OpenAI nonroot application layer, orchestrated via Helm with Deployments, Services, and HPAs.

## Topics Covered

`llm inference engine` · `kv cache management` · `pagedattention` · `disaggregated prefill decode serving` · `cuda graph dispatch` · `mixture of experts load balancing` · `zero copy memory` · `loRA adapter serving` · `multimodal inference pipeline` · `kubernetes model serving`

## Related Videos

- [KAITO: The Kubernetes Al Toolchain Operator](https://youtu.be/kFzdToXTfn8) — Kubernetes · 10 views · Jul 21, 2026 · [Details](kFzdToXTfn8.md) (shared: `llm` · `inference` · `engine`)
- [Kubernetes Services & Istio](https://youtu.be/OnwiaDRj1-k) — Kubernetes · 30 views · Jan 12, 2026 · [Details](OnwiaDRj1-k.md) (shared: `management` · `load` · `balancing`)
- [Orchestrating Distributed Al on Kubernetes](https://youtu.be/W_rZivDmMRY) — Kubernetes · 8 views · Jul 30, 2026 · [Details](W_rZivDmMRY.md) (shared: `serving` · `zero` · `kubernetes`)
- [Candle: A Minimalist Framework for Serverless ML Inference](https://youtu.be/8PaVKQoDReY) — Development · 94 views · May 9, 2026 · [Details](8PaVKQoDReY.md) (shared: `inference` · `engine` · `cuda`)
- [K8s Services  AKS & Istio](https://youtu.be/C5HqbzLRYZ0) — Kubernetes · 23 views · Jan 10, 2026 · [Details](C5HqbzLRYZ0.md) (shared: `management` · `kubernetes`)

---
*Auto-generated on Aug 1, 2026. Back to [kubernetes](../kubernetes.md) · [index](../index.md).*
