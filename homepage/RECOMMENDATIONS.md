# YouTube Metadata API - Recommendations

Based on production readiness review.

## Must Fix Before Deploy 🔴

- [x] Add @vercel/node dependency (installed)
- [x] Extract video IDs to shared config (done: src/config/videos.ts)

**Status**: ✅ Blockers resolved - safe to deploy

---

## Should Fix Before Production 🟡

### 3. Add Rate Limiting to API Route
**Priority**: HIGH  
**Why**: Prevent quota exhaustion from malicious requests  
**Effort**: 30 min  
**Files**: `api/videos/metadata.ts`

```typescript
// Simple in-memory rate limiting by IP
const rateLimit = new Map<string, number[]>()
const WINDOW_MS = 60000 // 1 minute
const MAX_REQUESTS = 60

const ip = req.headers['x-forwarded-for'] as string
const now = Date.now()
const requests = rateLimit.get(ip) || []
const validRequests = requests.filter(t => now - t < WINDOW_MS)

if (validRequests.length >= MAX_REQUESTS) {
  return res.status(429).json({ error: 'Too many requests' })
}
```

### 4. User-Facing Error State
**Priority**: HIGH  
**Why**: Currently shows "Unable to load metadata" - confusing for users  
**Effort**: 1 hour  
**Files**: `routes/showcase.tsx`, `src/components/`

Add specific error messages:
- "API temporarily unavailable - showing cached data"
- "No cached data available - please refresh"
- Network error vs quota exceeded

### 5. API Route Unit Tests
**Priority**: MEDIUM  
**Why**: API route currently untested  
**Effort**: 1-2 hours  
**Files**: `test/api.test.ts` (new)

Test cases:
- Valid batch query with multiple IDs
- Missing/invalid IDs
- API failure scenarios
- Cache headers

### 6. Structured Logging
**Priority**: MEDIUM  
**Why**: Monitor quota usage and errors in production  
**Effort**: 1.5 hours  
**Files**: `api/videos/metadata.ts`, `routes/showcase.tsx`

Add logging for:
- API call count and quota usage
- Cache hits vs misses
- Fallback triggers
- Error details

---

## Nice to Have 🟢

### 7. Data Validation Schema
**Priority**: LOW  
**Why**: Validate static JSON structure  
**Effort**: 45 min  
**Files**: Add Zod schema in `src/config/videos.ts`

### 8. Quota Alerts
**Priority**: LOW  
**Why**: Monitor usage before quota exceeded  
**Effort**: 30 min  
**Files**: Add to monitoring docs

Set alert when:
- Quota usage > 70% per day
- Daily requests > expected baseline

### 9. Health Check Endpoint
**Priority**: LOW  
**Why**: Monitor API health in production  
**Effort**: 1 hour  
**Files**: `api/health.ts` (new)

Returns:
- API status (OK/FAILED)
- Fallback availability
- YouTube API status

### 10. Shared API Client
**Priority**: LOW  
**Why**: Extract common patterns for future APIs  
**Effort**: 2 hours  
**Files**: `src/lib/api-client.ts`

Reusable for other Vercel functions in monorepo.

---

## Deployment Checklist

- [x] All blockers fixed
- [x] All tests passing (22/22)
- [x] Zero linting issues
- [ ] Rate limiting implemented (item #3)
- [ ] Error handling improved (item #4)
- [ ] API tests added (item #5)
- [ ] Logging added (item #6)

**Current Status**: ✅ Ready to deploy with recommendations for post-deployment improvements

**Recommended**: Implement #3-6 in next sprint before handling significant traffic

---

## Implementation Timeline

**Immediate (before merge)**:
- ✅ Add @vercel/node (done)
- ✅ Extract video config (done)

**Pre-production (next 2-3 days)**:
- Rate limiting (#3)
- User error states (#4)
- API tests (#5)

**Post-launch (week 2)**:
- Structured logging (#6)
- Health checks (#9)
- Monitoring setup (#8)

**Nice-to-have (backlog)**:
- Data validation (#7)
- API client extraction (#10)

---

Last updated: 2026-01-05
