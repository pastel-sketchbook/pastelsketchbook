---
type: video
videoId: TmlqoKqMD2Y
category: development
tags: [git, jujutsu, jj, workflow]
views: 116
date: 2026-02-06T00:14:00Z
summarized: 2026-04-14T10:19:43.432Z
---

# Jujutsu (jj) for Git-compatible Workflow

> [development](../development.md) · 116 views · Feb 5, 2026
> [Watch on YouTube](https://youtu.be/TmlqoKqMD2Y)

## Summary

Jujutsu (JJ) is a Git-compatible version control system designed to improve developer velocity and reduce mental overhead by automating snapshots and treating conflicts as non-blocking data. The tool acts as a local 'architect' for restructuring history and managing changes while leveraging Git as a 'courier' for remote synchronization and team collaboration.

## Key Takeaways

- Jujutsu eliminates the need for manual staging by implementing automatic snapshots, ensuring every file modification is immediately captured in the working copy commit.
- The system introduces a 'conflict as data' paradigm, where conflicts are stored directly within commits rather than blocking the repository state, allowing developers to rebase, push, and resolve conflicts asynchronously.
- JJ follows a 'work first, name later' philosophy, utilizing anonymous changes for local development and only requiring bookmarks (branch equivalents) when work is ready to be shared via Git.
- History manipulation is simplified through high-level commands like 'jj squash' and 'jj split', which allow for effortless correction of mistakes and restructuring of commits without the complexity of interactive rebasing.
- The tool is fully co-located with existing Git repositories, respecting .gitignore patterns and using standard Git protocols for remote operations, enabling gradual adoption without infrastructure changes.

## Topics Covered

`jujutsu vcs` · `git compatibility` · `automatic snapshots` · `conflict as data` · `malleable history` · `revsets` · `anonymous changes` · `distributed version control`

## Tags

[git](../tags/git.md) · [jujutsu](../tags/jujutsu.md) · [jj](../tags/jj.md) · [workflow](../tags/workflow.md)

## Related Videos

- [Jujutsu (jj):  An Introduction of its Paradigm Shift](https://youtu.be/5st-kLcNrE8) — Development · 116 views · Feb 5, 2026 · [Details](5st-kLcNrE8.md) (shared: `jujutsu` · `git compatibility` · `git`)
- [The Modern Al/BI Developer's Toolkit](https://youtu.be/gu-5cim8mpA) — Development · 20 views · Mar 14, 2026 · [Details](gu-5cim8mpA.md) (shared: `git` · `data` · `version`)
- [The Modern Git Playbook](https://youtu.be/Z06RjO-zFxI) — Development · 33 views · Jan 18, 2026 · [Details](Z06RjO-zFxI.md) (shared: `git` · `history` · `version`)
- [The Rules and The Rebellion](https://youtu.be/dDtVuJXVYJk) — Development · 34 views · Apr 6, 2026 · [Details](dDtVuJXVYJk.md) (shared: `data` · `distributed`)
- [The Art of Git Gardening](https://youtu.be/PNFlYx8HiOM) — Development · 16 views · Dec 31, 2025 · [Details](PNFlYx8HiOM.md) (shared: `git` · `history`)

---
*Auto-generated on Apr 14, 2026. Back to [development](../development.md) · [index](../index.md).*