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

---
*Auto-generated on Apr 16, 2026. Back to [programming](../programming.md) · [index](../index.md).*
