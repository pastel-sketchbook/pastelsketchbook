---
type: video
videoId: A6hH4t9MaSQ
category: development
tags: [idp, .net]
views: 10
date: 2026-08-23T23:00:04Z
summarized: 2026-08-28T03:00:00.000Z
---

# Governing Al Agents in Enterprise .NET Development

> [development](../development.md) · 10 views · Aug 23, 2026
> [Watch on YouTube](https://youtu.be/A6hH4t9MaSQ)

## Summary

This session frames governing AI agents in enterprise .NET development as a transition from unpredictable generative autonomy to constrained generation enforced by hard architectural boundaries. It exposes the .NET iceberg where agents see only explicit syntax — braces, classes, and methods — but miss implicit architecture: dependency injection lifetimes (transient/scoped/singleton), EF Core change tracking, middleware pipeline ordering, and domain invariants buried in legacy code. Governance is achieved by layering ArchUnitNET boundary tests, Roslyn custom analyzers elevated to build errors, and a machine-readable agents.md manifest that provisions precise context and confines agents to verifiable single-file tasks.

## Key Takeaways

- **.NET iceberg — explicit syntax vs implicit architecture overwhelms context:** Agents optimize for explicit functional requirements and localized logic, but enterprise .NET relies on implicit contracts — DI container conventions and lifetimes (transient/scoped/singleton), EF Core change-tracking mechanics and execution-flow dependence, implicit middleware pipeline ordering, and domain invariants deeply buried in legacy layers — which are rarely documented and exceed the agent context window.
- **Compilation trap — compiles yet silently fails in production:** Successful build is a broken proxy for correctness; injecting a scoped DB context into a singleton, returning unbounded `IQueryable` without `.Take()`/pagination (unindexed EF Core queries that collapse under load), and `async void` methods that swallow exceptions and crash processes all compile without error but cause non-deterministic runtime failures.
- **Context-window failures — 10–50 project solutions break agents:** Enterprise solutions with 10–50 `.csproj` files and massive DI graphs overwhelm model limits (files >500 KB excluded from indexing, related files missed); agents operate blind like scatterbrain juniors, instantly violating layering boundaries (e.g., web presentation → infrastructure DB bypassing domain), duplicating services, and proliferating duct-tape abstractions and misplaced state that accelerates architectural decay.
- **Verification overhead and supply-chain risk destroy the productivity illusion:** Developers now spend 35% debugging AI output vs 25% writing (remaining 40% other/meetings) per LinkedIn/Microsoft data — DI errors manifest only at runtime, EF Core errors only under load, middleware bugs only on specific request paths — while agentic coding introduces supply-chain threats: 1-in-7 MCP servers with significant security findings and 392 confirmed prompt-injection flaws in agent tools.
- **Governance funnel — three automated filters plus agents.md and safe zone:** Replaces fatigued human PR review (high verification fatigue) with zero-fatigue build errors: Filter 1 Roslyn custom analyzers via strict `.editorconfig` (ERR001 async void ban outside event handlers, ERR002 unbounded EF `IQueryable` without `.Take()`, ERR003 captive dependency scoped→singleton), Filter 2 ArchUnitNET unit architecture tests (domain should not depend on infrastructure, controllers only inject interfaces never `DBContext`), Filter 3 CI/CD sandbox (containerized EF migrations, isolated verification) → safe governed merge; `agents.md` manifest in repo/SRC root provisions DI rules (never singleton DB context, handlers scoped), EF Core rules (mutations via explicit pattern, read queries `AsNoTracking`, ban `.Result`/`.Wait`), logging (`CancellationToken` propagation), and defines safe zone (isolated deterministic) — unit tests (xUnit/NSubstitute/AutoFixture, null/invariant/concurrency coverage), explicit static DTO extension mapping over opaque AutoMapper reflection, mechanical refactoring (.NET Framework → .NET 8/9, `ConfigurationManager`→`IConfiguration`, `web.config`→middleware per-file with immediate tests) — vs danger zone (multi-project features, middleware ordering, core domain state mutations, complex EF migrations).

## Topics Covered

`governing ai agents dotnet` · `implicit dotnet architecture iceberg` · `dependency injection lifetimes` · `ef core change tracking` · `archunitnet boundary enforcement` · `roslyn analyzers build errors` · `agents.md context provisioning` · `constrained generation safe zone`

## Tags

[idp](../tags/idp.md) · [.net](../tags/.net.md)

## Related Videos

- [Backend Patterns in Rust](https://youtu.be/Th5MMOFQbh8) — Development · 49 views · Feb 22, 2026 · [Details](Th5MMOFQbh8.md) (shared: `architecture` · `dependency` · `injection`)
- [The Architecture of Systemic Decoupling](https://youtu.be/R3n8UxyD7mc) — Development · 56 views · Apr 27, 2026 · [Details](R3n8UxyD7mc.md) (shared: `architecture` · `dependency` · `injection`)
- [Architecting Scalable Rust Backends](https://youtu.be/SpNfrWmI8iE) — Development · 82 views · Feb 22, 2026 · [Details](SpNfrWmI8iE.md) (shared: `architecture` · `dependency` · `injection`)
- [The Repository Pattern](https://youtu.be/cWozmWrqnxs) — Development · 844 views · Feb 13, 2026 · [Details](cWozmWrqnxs.md) (shared: `architecture` · `dependency` · `injection`)
- [Design Patterns in Go](https://youtu.be/DazzkNtnzec) — Development · 119 views · Feb 24, 2026 · [Details](DazzkNtnzec.md) (shared: `implicit` · `dependency` · `injection`)

---
*Auto-generated on Aug 28, 2026. Back to [development](../development.md) · [index](../index.md).*
