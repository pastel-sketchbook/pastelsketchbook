# API Client Patterns

Reusable patterns and utilities for building Vercel serverless functions in this monorepo.

## Overview

`src/lib/api-client.ts` provides shared infrastructure for:
- **Type-safe API requests** with Zod schema validation
- **Automatic retries** with exponential backoff
- **Rate limiting** per IP address
- **Structured logging** for observability
- **Error handling** with consistent formatting

## Usage Examples

### Basic API Request

```typescript
import { makeApiRequest } from '@/lib/api-client'
import { VideoMetadataResponseSchema } from '@/config/videos'

const response = await makeApiRequest(
  'https://api.example.com/data',
  VideoMetadataResponseSchema,
  { timeout: 5000, retries: 2 }
)

if (response.data) {
  console.log(response.data) // Validated response
} else {
  console.error(response.error)
}
```

### Cached Fetch

Avoid repeated API calls within a time window:

```typescript
import { createCachedFetch } from '@/lib/api-client'

const getCachedMetadata = createCachedFetch(
  VideoMetadataResponseSchema,
  3600000 // 1 hour TTL
)

// First call: fetches from API
const result1 = await getCachedMetadata('/api/videos/metadata')

// Second call within 1 hour: returns cached
const result2 = await getCachedMetadata('/api/videos/metadata')
```

### Rate Limiting

Prevent quota exhaustion:

```typescript
import { RateLimiter } from '@/lib/api-client'

const limiter = new RateLimiter(60000, 60) // 60 req/min

if (!limiter.isAllowed(clientIp)) {
  return res.status(429).json({ error: 'Rate limit exceeded' })
}

// Process request...
```

### Error Handling

Consistent error formatting:

```typescript
import { createErrorResponse } from '@/lib/api-client'

try {
  // API logic
} catch (error) {
  return res.status(500).json(createErrorResponse(error))
}
```

## Data Validation

Use Zod schemas to validate all API responses:

```typescript
import { VideoMetadataSchema, VideoMetadata } from '@/config/videos'

const video = VideoMetadataSchema.parse(rawData)
// Throws ZodError if invalid

// Type-safe access
const title: string = video.title
const views: number = video.views
```

## Patterns for New APIs

When adding a new API route:

1. **Define schemas** in a config file:
   ```typescript
   // src/config/my-api.ts
   export const MyDataSchema = z.object({
     id: z.string(),
     value: z.number()
   })
   ```

2. **Use the API client**:
   ```typescript
   // api/my-endpoint.ts
   import { makeApiRequest } from '@/lib/api-client'
   
   const result = await makeApiRequest(url, MyDataSchema)
   ```

3. **Add rate limiting** for public endpoints:
   ```typescript
   const limiter = new RateLimiter(60000, 100)
   ```

4. **Log operations**:
   ```typescript
   logger.info('Processing request', { endpoint, duration })
   ```

## Health Check Endpoint

Monitor API health in production:

```bash
curl https://your-domain.vercel.app/api/health
```

Returns:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-05T14:45:21.058Z",
  "checks": {
    "api": { "status": "ok", "responseTime": 250 },
    "fallback": { "status": "ok" },
    "environment": { "status": "ok" }
  }
}
```

### Status Codes
- `200` - Healthy (all checks pass)
- `503` - Degraded (one check fails)
- `500` - Unhealthy (multiple checks fail)

## Best Practices

1. **Always validate responses** with schemas
2. **Use type inference** from schemas: `type MyData = z.infer<typeof MySchema>`
3. **Set reasonable timeouts** for external APIs (5-10 seconds)
4. **Configure retries carefully** - avoid thundering herd
5. **Log operation duration** for performance monitoring
6. **Clean up resources** - call `limiter.destroy()` if needed
7. **Cache strategically** - use TTL appropriate to data freshness requirements

## Performance Considerations

- Cached requests avoid quota exhaustion but may serve stale data
- Rate limiting prevents abuse but may reject legitimate traffic
- Retries improve reliability but increase latency on failures
- Schema validation adds minimal overhead (~1-2ms for small objects)

## Future Improvements

- [ ] Distributed rate limiting with Redis (for multi-server deployments)
- [ ] Metrics collection and dashboards
- [ ] Configurable retry strategies (exponential backoff)
- [ ] Circuit breaker pattern for cascading failures
