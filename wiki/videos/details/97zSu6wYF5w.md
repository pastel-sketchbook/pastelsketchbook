---
type: video
videoId: 97zSu6wYF5w
category: development
tags: []
views: 23
date: 2026-07-10T23:00:35Z
summarized: 2026-07-12T18:00:00.000Z
---

# Cross-Runtime Development with Rust and napi-rs

> [development](../development.md) · 23 views · Jul 10, 2026
> [Watch on YouTube](https://youtu.be/97zSu6wYF5w)

## Summary

This talk demonstrates how to build high-performance hybrid packages for Node.js and Bun using Rust and napi-rs, compiling a Rust core engine into a universal `.node` binary that runs natively across both runtimes without WebAssembly trade-offs. It walks through the two-phase architecture — a Rust `cdylib` crate with `@napi` macros for automatic type bridging, and a TypeScript distribution wrapper with `napi build` integration — culminating in cross-runtime parity where the same binary executes identically in Node.js and Bun at 0.1ms without any runtime-specific conditionals.

## Key Takeaways

- napi-rs compiles Rust logic into a C ABI-compatible `.node` binary via `crate-type = ["cdylib"]` and `napi-build`, enabling direct native execution in JavaScript runtimes without WASM overhead.
- The `@napi` macro automatically handles Rust-to-JS type mapping (i32 → number, String → string, Vec<T> → Array), eliminating manual binding code while preserving type safety across the language boundary.
- The hybrid package architecture separates concerns cleanly: a Rust core (`cargo.toml`, `build.rs`, `src/lib.rs`) handles native logic, while a TypeScript wrapper (`package.json`, `tsconfig.json`, `ts/src/index.ts`) provides idiomatic developer APIs with input validation and defaults.
- Node.js and Bun share the same Node API specification at the ABI level, meaning the same compiled `.node` binary runs in both runtimes with identical output and performance — no runtime-specific conditional logic required.
- The unified build pipeline runs `napi build --platform && tsc` to produce `.node` binaries, `.js` files, and `.d.ts` declarations, all consolidated into a `dist/` directory for distribution.

## Topics Covered

`napi-rs cross-runtime` · `rust native node addon` · `cdylib crate type` · `napi macro type bridging` · `hybrid package architecture` · `node api abi parity` · `bun native module support` · `unified npm build pipeline`

## Related Videos

- [OpenCV Library Architecture and Capabilities](https://youtu.be/ZfAc2pqcS-4) — Development · 59 views · May 11, 2026 · [Details](ZfAc2pqcS-4.md) (shared: `architecture` · `api` · `module`)
- [The Prisma Ecosystem Architecture](https://youtu.be/LnJbrb0EUaE) — Development · 17 views · May 8, 2026 · [Details](LnJbrb0EUaE.md) (shared: `rust` · `architecture` · `build`)
- [The pkg.go.dev API](https://youtu.be/zWuFvi-0Go4) — Development · 20 views · May 23, 2026 · [Details](zWuFvi-0Go4.md) (shared: `package` · `architecture` · `api`)
- [From 0 to N-Dimensions](https://youtu.be/6M76N3jhh1Q) — Development · 40 views · May 19, 2026 · [Details](6M76N3jhh1Q.md) (shared: `rust` · `crate` · `type`)
- [Architecting a Modern Robocode Engine](https://youtu.be/d3JxtD__-L0) — Development · 75 views · May 29, 2026 · [Details](d3JxtD__-L0.md) (shared: `rust` · `cdylib` · `architecture`)

---
*Auto-generated on Jul 12, 2026. Back to [development](../development.md) · [index](../index.md).*
