---
type: video
videoId: VHuQi_1t5qQ
category: development
tags: [go, pointer, gc, slice, map, stack, heap]
views: 70
date: 2026-04-17T18:20:09Z
summarized: 2026-04-22T22:00:00.000Z
---

# Mastering Go Pointers

> [development](../development.md) · 70 views · Apr 17, 2026
> [Watch on YouTube](https://youtu.be/VHuQi_1t5qQ)

## Summary

This video provides a comprehensive guide to Go pointers, covering fundamentals like address-of (&) and dereference (*) operators, pass-by-value versus pass-by-pointer semantics, and pointer receivers for struct mutation. It dives into escape analysis to explain when variables land on the stack versus heap, examines when pointers are genuinely needed (mutating state, avoiding heavy copies, nil semantics, shared state), and clarifies how slices and maps behave as reference-like types under the hood and interact with Go's garbage collector.

## Key Takeaways

- Go is strictly pass-by-value; pointers are required to mutate caller state, and pointer receivers are the idiomatic pattern for struct methods that modify fields.
- Escape analysis determines stack vs heap allocation—understanding it prevents unnecessary heap pressure and GC overhead.
- Pointers should be used deliberately: for mutating state, avoiding copies of large structs, expressing nil semantics, or sharing state across goroutines.
- Slices and maps already contain internal pointers (header structs with backing arrays/hash tables), so passing them by pointer is rarely necessary and often a code smell.

## Topics Covered

`Go pointers` · `address-of & dereference` · `pass-by-value` · `pointer receivers` · `escape analysis` · `stack vs heap` · `slices` · `maps` · `garbage collector`

## Tags

[go](../tags/go.md) · [pointer](../tags/pointer.md) · [gc](../tags/gc.md) · [slice](../tags/slice.md) · [map](../tags/map.md) · [stack](../tags/stack.md) · [heap](../tags/heap.md)

---
*Auto-generated on Apr 22, 2026. Back to [development](../development.md) · [index](../index.md).*