---
type: video
videoId: D1Hth_78ftg
category: programming
tags: []
views: 9
date: 2026-01-10T07:12:38Z
summarized: 2026-04-16T22:00:00.000Z
---

# 타입스크립트와 번으로 만드는 TODO 리스트

> [programming](../programming.md) · 9 views · Jan 10, 2026
> [Watch on YouTube](https://youtu.be/D1Hth_78ftg)

## Summary

This Korean-language tutorial walks through building a persistent CLI todo list application using TypeScript and the Bun runtime. The project demonstrates file-based data persistence using a todos.json file, covering how to load, save, add, and complete todo items with unique IDs. The architecture is deliberately simple with three components: JSON file storage, CRUD operations, and Bun's built-in file I/O APIs.

## Key Takeaways

- The application uses Bun's built-in file APIs to read and write a todos.json file, providing data persistence across program restarts without any external database.
- Each todo item is structured with three fields: a unique ID, content text, and a completion status boolean.
- The loadTodos function handles first-run gracefully by checking if the file exists and returning an empty array if not, while saveTodos overwrites the file with the latest state.
- The project is structured as a CLI application where users interact via typed commands rather than a graphical interface.

## Topics Covered

`bun runtime` · `typescript cli` · `file-based persistence` · `json data storage` · `todo application` · `korean programming tutorial`

## Related Videos

- [비동기 처리 - async/await](https://youtu.be/F6aMGDfVAFg) — Programming · 18 views · Jan 10, 2026 · [Details](F6aMGDfVAFg.md) (shared: `bun runtime` · `bun` · `runtime`)
- [타입스크립트와 번으로 배우는 프로그래밍 1](https://youtu.be/T5FjMjTQCBI) — Programming · 77 views · Jan 10, 2026 · [Details](T5FjMjTQCBI.md) (shared: `bun runtime` · `bun` · `runtime`)
- [알고리즘에서 코드로  TypeScript 가이드](https://youtu.be/dsxuWtfzBGI) — Programming · 13 views · Jan 14, 2026 · [Details](dsxuWtfzBGI.md) (shared: `typescript` · `korean programming tutorial` · `korean`)
- [알고리즘 완전 정복](https://youtu.be/iEn_PMcBlDk) — Programming · 5 views · Jan 14, 2026 · [Details](iEn_PMcBlDk.md) (shared: `typescript`)
- [영어 리스닝  3000시간의 법칙](https://youtu.be/qyqLjeu8Hng) — Programming · 54 views · Jan 13, 2026 · [Details](qyqLjeu8Hng.md) (shared: `korean`)

---
*Auto-generated on Apr 16, 2026. Back to [programming](../programming.md) · [index](../index.md).*
