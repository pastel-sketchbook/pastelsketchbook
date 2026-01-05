# YouTube Metadata API Testing Guide

This document covers testing the YouTube metadata integration across all phases.

## Phase 3: Client Integration Testing

### Test 1: Metadata Generation Script
Run the script locally to verify API key works:
```bash
bun scripts/generate-video-metadata.ts
```

Expected output:
```
Fetching metadata for 22 videos...
✓ Generated 22 video metadata
✓ Saved to /Users/AD9C65/projects/pastel-sketchbook/homepage/public/videos-metadata.json
✓ Fallback JSON ready (generated at 2026-01-05T13:50:17.541Z)
```

### Test 2: Build with Prebuild Script
Verify prebuild automatically generates metadata:
```bash
bun run build
```

The build output should show:
```
$ bun scripts/generate-video-metadata.ts
Fetching metadata for 22 videos...
✓ Generated 22 video metadata
```

### Test 3: Static Fallback JSON
Check that `public/videos-metadata.json` exists and has proper structure:
```bash
cat public/videos-metadata.json | jq '.count'
```

Expected: `22` (or number of videos)

## Phase 4: Integration Testing

### Test 4: Fallback Behavior
Test that the fallback works when API is unavailable:

1. Rename the API file temporarily:
```bash
mv api/videos/metadata.ts api/videos/metadata.ts.bak
```

2. Run dev server and navigate to `/showcase` - should still show videos from static JSON

3. Restore:
```bash
mv api/videos/metadata.ts.bak api/videos/metadata.ts
```

### Test 5: Unit Tests
Run the test suite (includes mocked API):
```bash
bun run test:run
```

All tests should pass, including the mocked fetch setup in `test/setup.ts`.

### Test 6: Data Structure Validation
Verify response format matches expected schema:
```typescript
interface YouTubeVideo {
  id: string
  title: string
  views: number
  date: string
}

interface ApiResponse {
  videos: YouTubeVideo[]
  timestamp: string
}
```

### Test 7: Cache Headers (Local)
When testing locally, the API response includes:
- `Cache-Control: public, max-age=21600, s-maxage=21600` (6 hours)

## Phase 5: Deployment Testing

### Test 8: Vercel Deployment
1. Set `VITE_YOUTUBE_API_KEY` in Vercel project settings
2. Deploy: `git push` (triggers build)
3. Monitor `/api/videos/metadata?ids=V2cZl5s4EKU,L9sxbq8ugoU` response
4. Check CloudWatch logs for quota usage

### Test 9: Fallback on Quota Exceeded
If API rate limit is hit:
- Client automatically falls back to `/public/videos-metadata.json`
- No errors shown to user
- Console warns: "API route failed, falling back to static metadata"

### Test 10: Response Time
Expected response time:
- API route: < 1 second (cached)
- Static JSON: < 100ms
- Fallback: ~200ms (fetch + parse)

## Monitoring

### YouTube API Quota
- Free tier: 10,000 units/day
- This endpoint uses 1 unit per request
- Monitor at: https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas

### Recommended Alerts
1. Quota usage > 50% of daily limit
2. API response time > 2 seconds
3. Fallback usage rate increasing

## Troubleshooting

### API returns 401 Unauthorized
- Check `VITE_YOUTUBE_API_KEY` is set in environment
- Verify API key hasn't expired
- Re-generate key in Google Cloud Console

### API returns 403 Forbidden
- YouTube Data API v3 might not be enabled
- Enable at: https://console.cloud.google.com/apis/library/youtube.googleapis.com

### Fallback shows "Unable to load metadata"
- Check network connectivity
- Verify `public/videos-metadata.json` exists
- Verify static JSON is valid (use `jq` to validate)

### Build fails during prebuild
- Ensure `VITE_YOUTUBE_API_KEY` is set or provide `--skip-generate` flag
- Check YouTube API quota hasn't been exceeded
- Verify all video IDs are valid

## Continuous Integration

The `prebuild` script runs automatically during build:
```json
"prebuild": "bun scripts/generate-video-metadata.ts"
```

On CI/CD systems:
1. Set `VITE_YOUTUBE_API_KEY` in environment
2. Build triggers prebuild automatically
3. Static JSON is committed to repo (optional)
4. Deployed with fallback ready

## Performance Benchmarks

| Scenario | Response Time | Data Source |
|----------|---------------|-------------|
| Fresh API call | 800ms | YouTube API |
| Cached API call | 50ms | Vercel edge cache |
| Fallback fetch | 200ms | Static JSON |
| Both fail | <50ms | Placeholder data |

---

**Last Updated**: 2026-01-05  
**Status**: ✅ All phases complete
