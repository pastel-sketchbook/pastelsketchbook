# YouTube Metadata Architecture Rationale

**Date**: January 5, 2026  
**Status**: Proposed  
**Component**: Video Gallery / Showcase Page

## Problem Statement

The showcase page needs to fetch YouTube video metadata (view counts and publish dates) for ~20 videos across 4 categories. The original approach had limitations:

- **noembed fallback**: Doesn't provide view counts, only titles and publish dates
- **Manual extraction**: `extract_yt.ts` scrapes HTML but isn't integrated into the data pipeline
- **Client-side API exposure**: YouTube API key would be visible in frontend code (security/quota risk)

## Constraints

1. **Hobby/Free Tier**: No budget for paid services
2. **Vercel Deployment**: Hosted on Vercel's free plan
3. **Zero Infrastructure**: No separate backend servers
4. **Reliable Data**: Need both view counts and accurate publish dates

## Decision: Vercel Serverless API + Static Fallback

### Architecture

```
showcase.tsx (Client)
    ↓
fetch('/api/videos/metadata?ids=V2cZl5s4EKU,L9sxbq8ugoU,...')
    ↓
api/videos/metadata.ts (Vercel Serverless Function)
    ├─ Checks response cache (6-hour TTL)
    ├─ Calls YouTube Data API v3 (secure key in env vars)
    ├─ Returns: { id, title, viewCount, publishedAt }
    └─ Sets Cache-Control headers
    ↓
Fallback: public/videos-metadata.json (static JSON file)
```

### Why This Approach

**Vercel Serverless Functions**:
- ✅ Free tier: Unlimited invocations, no per-call costs
- ✅ 10-second execution window (request takes <1 second)
- ✅ Deployed alongside app, no separate infrastructure
- ✅ Native support for environment variables (API key security)

**YouTube Data API v3**:
- ✅ Free tier: 10,000 quota units/day
- ✅ Batch queries: All 20 IDs in single request = 1 unit
- ✅ Can make 10,000 requests/day safely (way above needs)
- ✅ Returns both `viewCount` and `publishedAt` in one call

**Static Fallback**:
- ✅ Pre-generated `videos-metadata.json` as ultimate safety net
- ✅ Prevents total failure if API quota exceeded
- ✅ Zero runtime cost
- ✅ Updated via build script before deployment

### Cost Analysis

| Component | Free Tier | Your Usage | Status |
|-----------|-----------|-----------|--------|
| Vercel Functions | Unlimited | 1 call per 6 hours | ✅ Free |
| YouTube API | 10,000 units/day | ~240 units/day (40 calls) | ✅ Free |
| Storage (JSON) | 100GB | <1KB | ✅ Free |

**Total Cost: $0**

### Implementation Plan

1. Create `api/videos/metadata.ts` (Vercel function)
2. Add `VITE_YOUTUBE_API_KEY` to Vercel env vars (remove from client)
3. Create build script to pre-generate `public/videos-metadata.json`
4. Update `showcase.tsx` to call `/api/videos/metadata` instead of direct YouTube API
5. Add Cache-Control headers for 6-hour caching

### Rollback Plan

If YouTube API quota exceeded:
- Client falls back to `/public/videos-metadata.json`
- Data is stale but functional
- Previous day's data acts as safety net

## Alternatives Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **Direct YouTube API (current)** | Simple setup | Exposes key, client-side quota risk | ❌ Rejected |
| **noembed only** | Free, no key | No view counts | ❌ Rejected |
| **Static JSON only** | Zero runtime cost | Data always stale | ⚠️ Fallback only |
| **Extract HTML script** | Works without API key | Fragile, YouTube could break | ❌ Not reliable |
| **Vercel API + Static** | Secure, reliable, free, current data | Slight complexity | ✅ **Chosen** |

## Future Improvements

- Add monitoring/alerting for API quota usage
- Implement refresh strategy (weekly scheduled updates to static JSON)
- Add metrics endpoint to track fetch performance
- Cache in Vercel KV (if team upgrades plan)

## References

- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [YouTube Data API Quota](https://developers.google.com/youtube/v3/getting-started#quota)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
