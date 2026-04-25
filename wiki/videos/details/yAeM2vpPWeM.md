---
type: video
videoId: yAeM2vpPWeM
category: development
tags: [ai, code review, good code, dip]
views: 8
date: 2026-04-25T10:56:42Z
summarized: 2026-04-25T18:00:00.000Z
---

# Design for Deletion

> [development](../development.md) · 8 views · Apr 25, 2026
> [Watch on YouTube](https://youtu.be/yAeM2vpPWeM)

## Summary

This video argues that the true mark of a mature software system is how cleanly it allows code removal, not just addition. It introduces "design for deletion" as an architectural discipline: organizing code into vertical feature slices with explicit boundaries, pushing experiments to the periphery via adapters and plugins, enforcing dependency inversion so the core never imports edges, and treating feature flags as short-lived scaffolding with a formal decommissioning lifecycle. A "deletion friendliness matrix" scores modules across isolation, encapsulation, test coverage, replaceability, runtime kill switches, observability, data ownership, and API versioning to quantify removal risk before acting.

## Key Takeaways

- Design every feature as a removable plug-in: if deleting it requires modifying more than 3-5 files outside its folder, the boundary is leaking.
- Organize code by vertical feature slices (not horizontal layers) so an entire feature can be removed by deleting a single folder.
- Push experiments, third-party integrations, and temporary features to the periphery; the stable core defines interfaces and never imports edges.
- Use the "deletion friendliness matrix" (scoring isolation, encapsulation, test coverage, replaceability, kill switch, observability, data ownership, API versioning) to quantify removal risk before attempting deletion.
- Feature flags are scaffolding, not architecture — follow a toggle-off, observe, then delete lifecycle to prevent them from becoming secondary architecture.
- Cheap creation enables safe deletion: optimize for disposable modules with fast scaffolding and clear boundaries rather than over-abstracting out of fear of rewriting.

## Topics Covered

`design for deletion` · `modularity` · `vertical slices` · `dependency inversion` · `feature flags` · `event-driven architecture` · `composition root` · `deletion friendliness matrix` · `technical debt` · `code boundaries`

## Tags

[ai](../tags/ai.md) · [code review](../tags/code review.md) · [good code](../tags/good code.md) · [dip](../tags/dip.md)

---
*Auto-generated on Apr 25, 2026. Back to [development](../development.md) · [index](../index.md).*
