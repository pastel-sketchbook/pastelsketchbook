# Pastel Sketchbook - Homepage

The homepage is the first application in this monorepo. It's a React-based landing page for "Pastel Sketchbook" - a non-profit community that turns collective learning into shared wealth.

## Features

- **Interactive Spark AI**: AI-powered idea generator that helps users explore topics within the Pastel Sketchbook model
- **Growth Visualization**: Interactive charts showing compound growth over time
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- **Accessibility**: Keyboard navigation, screen reader support, and ARIA labels
- **Data Persistence**: LocalStorage-based spark saving functionality

## Tech Stack

- **Runtime**: [Bun](https://bun.sh) — **the only supported runtime**. All scripts, dev server, build, tests, and the `prebuild` pipeline run under `bun`. Do not use `npm`, `pnpm`, `yarn`, or `node` directly.
- **Framework**: React 19.2.6
- **Routing**: TanStack Router 1.170.6
- **Build Tool**: Vite 8.0.14
- **Language**: TypeScript 6.0.3 (strict mode enabled)
- **Styling**: Tailwind CSS 4.3.0
- **3D**: Three.js 0.184 (with `@react-three/fiber` 9.6 + `@react-three/drei` 10.7)
- **Charts**: Recharts 3.8.1
- **Animation**: framer-motion 12.40
- **State**: TanStack React Query 5.100
- **Validation**: Zod 4.4
- **AI**: Google GenAI SDK 2.6
- **Testing**: Vitest 4.1 + Happy DOM 20.9 + Testing Library 16.3
- **Linting/Formatting**: Biome 2.4
- **Deployment**: Vercel 54.4 (`@vercel/node` 5.8)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) — required. The lockfile is `bun.lock` and `@types/bun` is wired into TypeScript. Other package managers and Node.js are not supported in this codebase.
- Google GenAI API key (for Spark AI; the app renders without it)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pastel-sketchbook/homepage
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Google GenAI API key to `.env.local`:
```
VITE_GEMINI_API_KEY=your-actual-api-key
VITE_GEMINI_API_MODEL=gemini-3-flash-preview
```

### Development

Run the development server:
```bash
bun run dev
```

The app will be available at `http://localhost:3000`

### Production Build

Build for production:
```bash
bun run build
```

Preview production build:
```bash
bun run preview
```

### Router Generation

Generate route types (if you modify route files):
```bash
bun run router:generate
```

## Project Structure

```
homepage/
├── routes/              # TanStack Router file-based routing
│   ├── __root.tsx       # Root layout (Header, Footer)
│   └── index.tsx        # Main homepage (all sections)
├── App.tsx              # Root component with RouterProvider
├── routeTree.ts         # Route tree definition
├── entry-client.tsx     # Client entry point
├── types.ts             # TypeScript type definitions
├── global.d.ts          # Global type declarations (VITE_ env vars)
├── index.html           # HTML entry point
├── index.css            # Global styles with Tailwind directives
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
├── .env.example        # Environment variables template
└── .env.local          # Your local environment variables (not in git)
```

## Environment Variables

| Variable | Required | Scope | Description |
|----------|----------|-------|-------------|
| `VITE_GEMINI_API_KEY` | Yes | Client-side | Google GenAI API key for Spark AI |
| `VITE_GEMINI_API_MODEL` | No | Client-side | AI model name (default: "gemini-3-flash-preview") |
| `VITE_YOUTUBE_API_KEY` | No | Server-side only | YouTube Data API key for video metadata (local dev & Vercel deploy) |

**Note**: All `VITE_` prefixed variables are accessible in client-side code via `import.meta.env`. Server-side functions can access non-prefixed variables.

**Graceful Handling**: The app will render even without environment variables. A warning will be logged to console if variables are missing. Spark AI features will only work when `VITE_GEMINI_API_KEY` is properly configured. Videos will use static cached metadata if the YouTube API is unavailable.

## Available Scripts

All scripts are invoked through `bun run` (no `npm`, `pnpm`, `yarn`, or `node`).

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production (runs `prebuild` first) |
| `bun run preview` | Preview production build |
| `bun run router:generate` | Generate route types (TanStack Router) |
| `bun run sync:videos` | Sync YouTube video metadata into `public/videos-metadata.json` |
| `bun run wiki:transcripts` | Export raw transcripts into `wiki/raw/transcripts/` and mirror to `public/transcripts/` |
| `bun run wiki:generate` | Regenerate wiki markdown pages and `public/wiki-bundle.json` |
| `bun run wiki:analysis` | Generate the semiannual channel analysis now |
| `bun run wiki:analysis:if-due` | Generate the semiannual channel analysis only when due (Apr/Oct) |
| `bun run format` | Format all files with Biome |
| `bun run format:check` | Check formatting without changes |
| `bun run lint` | Check for linting errors |
| `bun run lint:fix` | Fix linting errors |
| `bun run check` | Run both format and lint checks |
| `bun run check:fix` | Fix all format and lint issues |
| `bun run test` | Run tests in watch mode |
| `bun run test:ui` | Run tests with UI interface |
| `bun run test:run` | Run tests once |
| `bun run test:coverage` | Run tests with coverage report |
| `bun run check:all` | Pre-push quality gate: `format:check` + `lint` + `test:coverage` |
| `bun run deploy:vercel` | Deploy to Vercel production (use only with explicit user approval) |

> **Note**: All standalone scripts under [`scripts/`](./scripts/) are executed via the Bun runtime (`bun scripts/<name>.ts`) and rely on Bun-specific APIs and `@types/bun`. Do not run them with `node` or `tsx`.

## Color Palette

- **Dark Green**: `#1B3022` (primary text, headings)
- **Medium Green**: `#5F7D61` (accent, links, borders, buttons)
- **Tan**: `#D4A373` (secondary accent)
- **Terracotta**: `#E76F51` (highlight, error states)
- **Yellow**: `#E9C46A` (highlight, success states)
- **Off-White**: `#FAF9F6` (background)

## Development Guidelines

### Adding a New Section

1. Add section markup in `routes/index.tsx`
2. Add ID for anchor navigation (e.g., `id="new-section"`)
3. Add corresponding nav link in `routes/__root.tsx`

## Testing

Tests are written using Vitest with React Testing Library. Coverage reports are generated with v8 provider.

### Running Tests

```bash
# Run tests in watch mode (recommended during development)
bun run test

# Run tests with UI interface
bun run test:ui

# Run tests once (CI)
bun run test:run

# Run tests with coverage report
bun run test:coverage
```

### Coverage Thresholds

- **Statements**: 80%
- **Functions**: 80%
- **Branches**: 80%
- **Lines**: 80%

Coverage reports are generated in the `coverage/` directory in HTML, LCOV, and JSON formats.

## Security Notes

- The API key is used client-side via `VITE_GEMINI_API_KEY`
- Ensure your Google GenAI API has proper rate limiting and restrictions
- Never commit `.env.local` to version control

## Accessibility

- Skip-to-content link for keyboard users
- ARIA labels on interactive elements
- Focus indicators on all interactive elements
- Semantic HTML structure

## Documentation

For detailed developer information, see:
- **AGENTS.md** - Complete developer guide with patterns and workflows
- **TODO.md** - Feature tracking and in-progress work
- **docs/** - API patterns, architecture rationale, and testing guides

## Monorepo Context

This is App #1 in the monorepo.
