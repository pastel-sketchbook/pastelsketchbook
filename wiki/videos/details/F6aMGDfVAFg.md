---
type: video
videoId: F6aMGDfVAFg
category: programming
tags: []
views: 18
date: 2026-01-10T07:11:59Z
summarized: 2026-04-16T22:00:00.000Z
---

# 비동기 처리 - async/await

> [programming](../programming.md) · 18 views · Jan 10, 2026
> [Watch on YouTube](https://youtu.be/F6aMGDfVAFg)

## Summary

This Korean-language tutorial explains asynchronous programming with async/await in TypeScript using the Bun runtime, using a cafe ordering analogy where synchronous code blocks all customers while one order is prepared. The video covers the async keyword for marking non-blocking functions, await for pausing only the current function's execution without freezing the entire program, the fetch API for network requests, and try/catch for error handling in unreliable network environments.

## Key Takeaways

- The async keyword signals that a function may perform time-consuming work, allowing the runtime to continue executing other code rather than blocking the entire program.
- Await pauses only the specific async function's execution flow (not the whole program) until the awaited promise resolves, then resumes from that point.
- The Bun.sleep example demonstrates that during a 1-second await, other program operations continue executing—the program never fully freezes.
- Professional developers always wrap fetch calls in try/catch blocks because network connections are inherently unreliable—servers may not respond and URLs may be incorrect.

## Topics Covered

`async await` · `typescript` · `bun runtime` · `fetch api` · `error handling` · `non-blocking io` · `korean programming tutorial`

## Related Videos

- [타입스크립트와 번으로 만드는 TODO 리스트](https://youtu.be/D1Hth_78ftg) — Programming · 9 views · Jan 10, 2026 · [Details](D1Hth_78ftg.md) (shared: `typescript` · `bun runtime` · `bun`)
- [타입스크립트와 번으로 배우는 프로그래밍 1](https://youtu.be/T5FjMjTQCBI) — Programming · 81 views · Jan 10, 2026 · [Details](T5FjMjTQCBI.md) (shared: `typescript` · `bun runtime` · `bun`)
- [알고리즘에서 코드로  TypeScript 가이드](https://youtu.be/dsxuWtfzBGI) — Programming · 13 views · Jan 14, 2026 · [Details](dsxuWtfzBGI.md) (shared: `typescript` · `korean programming tutorial` · `korean`)
- [알고리즘 완전 정복](https://youtu.be/iEn_PMcBlDk) — Programming · 5 views · Jan 14, 2026 · [Details](iEn_PMcBlDk.md) (shared: `typescript`)
- [영어 리스닝  3000시간의 법칙](https://youtu.be/qyqLjeu8Hng) — Programming · 61 views · Jan 13, 2026 · [Details](qyqLjeu8Hng.md) (shared: `korean`)

---
*Auto-generated on Apr 16, 2026. Back to [programming](../programming.md) · [index](../index.md).*
<!-- book-classification -->
_Belongs to: **[The Internals Companion](zmd://wiki/books/internals-companion.md) — Chapter 10** (confidence: 7%)_
