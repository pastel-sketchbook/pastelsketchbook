# AGENTS.md - Homepage App

## Project Overview

The homepage app is the first application in this monorepo. It's a React-based landing page for "Pastel Sketchbook" - a non-profit community that turns collective learning into shared wealth.

**Location**: `/homepage/`

## Tech Stack

- **Runtime**: Bun
- **Framework**: React 19.2.3
- **Routing**: TanStack Router 1.144.0
- **Build Tool**: Vite (latest)
- **Language**: TypeScript 5.8.3 (strict mode enabled)
- **Styling**: Tailwind CSS 4.1.18
- **Charts**: Recharts 3.6.0
- **AI**: Google GenAI SDK 1.34.0
- **Linting/Formatting**: Biome (latest)

## Project Structure

```
homepage/
├── routes/              # TanStack Router file-based routing
│   ├── __root.tsx       # Root layout (Header, Footer)
│   └── index.tsx        # Main homepage (all sections combined)
├── App.tsx              # Root component with RouterProvider
├── routeTree.ts         # Route tree definition (primary router export)
├── entry-client.tsx     # Client entry point with env validation (client-side render only)
├── types.ts             # TypeScript type definitions
├── global.d.ts          # Global type declarations (VITE_ env vars)
├── index.html           # HTML entry point
├── index.css            # Global styles with Tailwind directives
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── biome.json           # Biome formatting and linting config
├── .biomeignore        # Biome ignore patterns
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── .env.example         # Environment variables template
```

## Key Components

### routes/__root.tsx
Root layout component containing:
- **Header**: Fixed navigation with logo, nav links, and "Join the Garden" CTA
- **Footer**: Multi-section footer with audience profiles and call-to-action
- **Outlet**: Renders child routes

### routes/index.tsx (26 lines)
Main homepage containing core sections:
1. **Hero**: Main landing section with title and illustration
2. **Philosophy**: Community values and core concept
3. **SparkAI**: Interactive AI idea generator with localStorage persistence
4. **Growth**: Compound growth visualization with Recharts

### routes/showcase.tsx (296 lines)
Video showcase page with:
- Video gallery with category filters
- Search functionality
- YouTube metadata API integration with static fallback
- Loading skeleton states

### routes/podcast.tsx (19 lines)
Podcast/media route placeholder

## Important Patterns

### State Management
- Uses React hooks (`useState`, `useEffect`)
- LocalStorage for SparkAI persistence (`STORAGE_KEY = "pastel_sketchbook_sparks"`)
- No global state management (Context, Redux, etc.)

### Environment Variables
- **VITE_API_KEY**: Google GenAI API key (required, client-side)
- **VITE_API_MODEL**: AI model name (default: "gemini-3-flash-preview", client-side)
- **VITE_YOUTUBE_API_KEY**: YouTube Data API key (server-side only, required for metadata generation)
  - Needed: Local development (metadata generation), Vercel deployment (API route)
  - Not needed: Client code (API route handles it)
  - Set via environment variables or Vercel project settings
- Must be prefixed with `VITE_` to be accessible in code via `import.meta.env` (client) or `process.env` (server)

### Styling Conventions
- **60:30:10 Rule**: Adhere to the 60:30:10 design rule for balanced aesthetics:
  - **60% (Primary)**: Off-white background (`#FAF9F6`) and dark green text (`#1B3022`).
  - **30% (Secondary)**: Medium green accents (`#5F7D61`) and tan elements (`#D4A373`).
  - **10% (Accent)**: Terracotta (`#E76F51`) and yellow (`#E9C46A`) highlights for focus.
- **Organic Imperfection**: Avoid perfect geometric shapes for UI containers. Use SVG paths with slight irregularities and custom classes like `.sketch-border`.
- **Typography hierarchy**: Use Serif fonts for headings and narrative text to lean into the "sketchbook" feel; use Sans-serif for navigation, labels, and data points.
- **Micro-animations**: Every interactive element should have a subtle hover state using `framer-motion` (e.g., hover scribble, scale, or loose easing).
- **Performance-First**: Heavy libraries (Recharts, Google GenAI) must be dynamically imported to maintain a light initial bundle.
- Tailwind CSS utility classes
- Custom color palette:
  - `#1B3022` - Dark green (primary text)
  - `#5F7D61` - Medium green (accent, links, borders)
  - `#D4A373` - Tan (secondary accent)
  - `#E76F51` - Terracotta (highlight)
  - `#E9C46A` - Yellow (highlight)
  - `#FAF9F6` - Off-white (background)
- Custom classes: `.sketch-border`, `.sketch-hover`, `.sketch-focus`, `.animate-fade-in`, `.shimmer`, `.animate-pop`

### API Integration

**Google GenAI (SparkAI)**:
- Google GenAI SDK for SparkAI feature
- Structured output using `responseSchema` for type safety
- JSON response parsing with error handling

**YouTube Metadata API** (Showcase page):
- **Server-side**: Vercel serverless function at `/api/videos/metadata`
  - Calls YouTube Data API v3 with `part=snippet,statistics`
  - Accepts query param: `ids` (comma-separated video IDs)
  - Returns: `{ videos: [{ id, title, views, date }], timestamp }`
  - Cache-Control: 6 hours (`max-age=21600`)
  - Uses ~1 quota unit per batch (free tier: 10,000/day)
- **Client fallback**: Static JSON at `/public/videos-metadata.json`
  - Generated pre-build via `prebuild` script
  - Automatically updated when `VITE_YOUTUBE_API_KEY` is set
  - Fallback if API route unavailable (network error, quota exceeded)
- **Rationale**: See `docs/rationale/youtube-metadata-architecture.md`

### Routing
- TanStack Router file-based routing
- Scroll-based navigation using anchor links (`href="#section"`)
- No actual route parameters or dynamic routes currently

## Running the Project

### Development
```bash
cd homepage
bun install
bun run dev
```
Server runs on `http://localhost:3000` (configured in vite.config.ts)

### Production Build
```bash
cd homepage
bun run build
bun run preview
```

### Router Generation
```bash
cd homepage
bun run router:generate
```
Generates route types from file-based routing

### Code Formatting & Linting
```bash
cd homepage
bun run format          # Format all files
bun run format:check     # Check formatting without changes
bun run lint            # Check for linting errors
bun run lint:fix        # Fix linting errors
bun run check           # Run both format and lint checks
bun run check:fix       # Fix all format and lint issues
```

**Biome Configuration**:
- Single quotes for strings (double for JSX)
- No semicolons (as needed)
- 2-space indentation
- 100 character line width
- Config: `biome.json`

### Testing
```bash
cd homepage
bun run test            # Run tests in watch mode
bun run test:ui        # Run tests with UI interface
bun run test:run        # Run tests once
bun run test:coverage   # Run tests with coverage report
```

**Testing Configuration**:
- Framework: Vitest 4.0.16
- Test Environment: Happy DOM 20.0.11
- Testing Library: React Testing Library 16.3.1
- Coverage Provider: v8 with 80% threshold
- Coverage Reports: HTML, LCOV, Text, JSON
- Config: `vitest.config.ts`

**Test Files**:
- `test/setup.ts` - Test setup with cleanup and mocks
- `test/types.test.ts` - Type guard tests
- `test/storage.test.ts` - localStorage persistence tests

## Critical Rules

### ⚠️ NEVER Deploy Automatically
- **DO NOT run `bun run deploy:vercel` on your own**
- Always ask the user before deploying to production
- User controls all deployments
- Only provide deploy commands or instructions to the user

## Common Tasks

### Adding a New Section
1. Add section markup in `routes/index.tsx`
2. Add ID for anchor navigation
3. Add corresponding nav link in `routes/__root.tsx` Header component

### Modifying SparkAI
- Component located in `src/components/SparkAI.tsx`
- State management: localStorage for persistence
- API logic: Google GenAI SDK with structured output

### Changing Color Theme
- Update color values in `index.css` and component classes
- Search for hex codes: `#1B3022`, `#5F7D61`, `#D4A373`, `#E76F51`, `#E9C46A`, `#FAF9F6`

### Updating Chart Data
- Modify data arrays in `src/components/Growth.tsx`
- Recharts configuration in same file

## Code Splitting & Error Handling

### Route-Based Code Splitting (Implemented)
- **Showcase route**: Lazy-loaded with ChunkErrorBoundary
- **Podcast route**: Lazy-loaded with ChunkErrorBoundary
- **Fallback UI**: Skeleton loaders / spinners during chunk load
- **Retry logic**: Exponential backoff (1s, 2s, 4s max)

### Error Logging
- **ChunkErrorBoundary**: Handles code-split route failures
- **SketchErrorBoundary**: Handles component runtime errors
- **MetricsLogger**: Logs chunk load metrics, duration, retry counts
- **Error type detection**: Automatic classification (chunk_load, runtime, api, network)

**Performance**: Initial bundle reduced 546KB → 350KB, TTI improved 2.5s → 0.6s

See `docs/error-logging-and-code-splitting.md` for comprehensive guide.

## Important Notes

### Known Issues
- API key used client-side (ensure proper rate limiting on Google GenAI)
- Bundle size optimized with code splitting (now ~350KB initial, within limits)

### Accessibility
- Skip-to-content link implemented (Tab + Enter)
- ARIA labels on interactive elements
- Focus indicators on all interactive elements
- Screen reader testing ongoing

### Testing
- Vitest with React Testing Library
- 199+ passing tests
- ~30% coverage on critical paths
- See test/ directory for test files

## Environment Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp homepage/.env.example homepage/.env.local
```

2. Add your API keys to `.env.local`:
```
VITE_API_KEY=your-gemini-api-key-here
VITE_API_MODEL=gemini-3-flash-preview
VITE_YOUTUBE_API_KEY=your-youtube-api-key-here
```

3. Run dev server

**Notes**:
- **Spark AI**: Requires `VITE_API_KEY`. App renders without it, but AI features won't work.
- **YouTube Metadata**: Requires `VITE_YOUTUBE_API_KEY` for local metadata generation. On Vercel, set this in project settings instead.
- The `prebuild` script automatically generates `public/videos-metadata.json` before build if the API key is available.

## TypeScript Configuration

- Target: ES2022
- Module: ESNext
- JSX: react-jsx
- Path alias: `@/*` maps to homepage root
- Strict mode enabled
- All files formatted with Biome (single quotes, no semicolons)

## Build Output

- `homepage/dist/` contains production build
- Static files in `dist/assets/`
- Entry point: `dist/index.html`

## Dependencies Notes

- **TanStack Router DevTools**: Only for development, not in production
- **React 19**: Latest version with automatic batching and other improvements
- **Recharts**: Charting library for GrowthChart section

## Working with the Codebase

When making changes:
1. Always work in the `homepage/` directory
2. Use `routes/index.tsx` for homepage sections (not components/)
3. Use `routes/__root.tsx` for Header/Footer changes
4. Run `bun run dev` for development
5. Run `bun run check:fix` before committing (formats and fixes linting)
6. Run `bun run build` to test production build
7. Test responsive design (mobile, tablet, desktop)

### Pre-Commit Quality Gate (Required)

**Before pushing any commits**, run the full quality check:
```bash
bun run check:all
```

This ensures:
- ✅ Code formatting compliance (Biome)
- ✅ Linting passes (zero issues)
- ✅ All tests passing (42+ tests)
- ✅ Coverage reports generated

**Only commit if all checks pass.** This is non-negotiable for maintaining code quality.

## Security Standards (A Grade)

**Overall**: Application reviewed and approved for production. Security grade A. All recommendations implemented.

### API Key Management
- ✅ `VITE_API_KEY` (Google GenAI) - Client-side only, intentional for third-party service
- ✅ `VITE_YOUTUBE_API_KEY` - **Server-side only**, never exposed to client
- ✅ `.env.local` must NOT be committed (verified in .gitignore)
- ✅ Vercel project: Set secrets in project settings, never in git

### Input Validation & Error Handling
- ✅ Zod schema validation for all API responses
- ✅ Structured output via `responseSchema` for AI responses
- ✅ User-facing errors are generic; never expose internal details
- ✅ Error boundaries prevent component crashes from cascading

### Rate Limiting (YouTube API)
- ✅ 60 requests/minute per IP
- ✅ In-memory implementation (sufficient for Vercel serverless)
- ✅ Returns 429 status when exceeded
- ✅ Note: Multi-server scaling may require Redis future

### CORS & Third-Party Security
- ✅ CORS headers restrict origins (configured in `api/videos/metadata.ts`)
- ✅ YouTube API calls server-side only
- ✅ Timeouts configured (10s default) to prevent hangs
- ✅ All third-party SDK usage type-safe and validated

### Deployment Checklist
- [ ] Verify `.env.local` is NOT in git history
- [ ] Set `VITE_YOUTUBE_API_KEY` in Vercel project settings (never in repo)
- [ ] Test rate limiting with load simulation
- [ ] Review CSP headers (optional, low priority)
- [ ] Monitor error logs for 24 hours post-deploy
- [ ] See `docs/archives/SECURITY_AUDIT.md` for historical security review

## Documentation Structure

### Main Files
- **AGENTS.md** (this file) - Live developer guide
- **README.md** - Getting started and feature overview
- **TODO.md** - Active feature tracking

### Reference Documentation
- **docs/api-patterns.md** - API design patterns and conventions
- **docs/youtube-metadata-testing.md** - Testing guides for metadata API
- **docs/error-logging-and-code-splitting.md** - Code splitting, error boundaries, chunk loading
- **docs/rationale/youtube-metadata-architecture.md** - Architecture decisions

### Archived Audits & Reviews
All point-in-time reviews have been archived in **docs/archives/**:
- **ANIMATION_REVIEW.md** - Animation implementation opportunities (Jan 5, 2026)
- **CODE_AUDIT.md** - Test coverage and security review (Jan 5, 2026)
- **DEPLOYMENT_CHECKLIST.md** - Deployment verification steps (Jan 5, 2026)
- **DEPLOYMENT_REVIEW.md** - Local/Vercel deployment parity (Jan 5, 2026)
- **SECURITY_AUDIT.md** - Security assessment with A-grade rating (Jan 5, 2026)

These archives document historical reviews. Always refer to implementation code as the source of truth for current status.

## Monorepo Context

This is App #1 in the monorepo. Future apps should:
- Follow similar Vite + TanStack Router pattern
- Use shared color palette and design system
- Reuse components from a shared package (when created)
- Follow monorepo workspace configuration (to be added)
