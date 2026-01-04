# AGENTS.md - Homepage App

## Project Overview

The homepage app is the first application in this monorepo. It's a React-based landing page for "Pastel Sketchbook" - a non-profit community that turns collective learning into shared wealth.

**Location**: `/homepage/`

## Tech Stack

- **Runtime**: Bun
- **Framework**: React 19.2.3
- **Routing**: TanStack Router 1.144.0
- **Build Tool**: Vite 6.2.0
- **Language**: TypeScript 5.8.2 (strict mode enabled)
- **Styling**: Tailwind CSS 4.1.18
- **Charts**: Recharts 3.6.0
- **AI**: Google GenAI SDK 1.34.0
- **Linting/Formatting**: Biome 2.3.11 (single quotes, no semicolons)

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

### routes/index.tsx (543 lines)
Main homepage containing ALL sections:
1. **Hero** (#hero): Main landing section with title and illustration
2. **Vision** (#vision): Explains the core concept
3. **Problem** (#problem): Learning monetization challenges
4. **Digital Garden** (no id): Community garden metaphor
5. **Virtuous Cycle** (#cycle): 5-step process flow
6. **Spark AI** (#spark): Interactive AI idea generator with localStorage persistence
7. **Investment Jar** (#investment): ETF investment strategy
8. **Growth Chart** (#growth): Compound growth visualization with Recharts

## Important Patterns

### State Management
- Uses React hooks (`useState`, `useEffect`)
- LocalStorage for SparkAI persistence (`STORAGE_KEY = "pastel_sketchbook_sparks"`)
- No global state management (Context, Redux, etc.)

### Environment Variables
- **VITE_API_KEY**: Google GenAI API key (required)
- **VITE_API_MODEL**: AI model name (default: "gemini-3-flash-preview")
- Must be prefixed with `VITE_` to be accessible in client-side code via `import.meta.env`

### Styling Conventions
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
- Google GenAI SDK for SparkAI feature
- Structured output using `responseSchema` for type safety
- JSON response parsing with error handling

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

## Common Tasks

### Adding a New Section
1. Add section markup in `routes/index.tsx`
2. Add ID for anchor navigation
3. Add corresponding nav link in `routes/__root.tsx` Header component

### Modifying SparkAI
- API logic in `routes/index.tsx:62-103` (generateSpark function)
- State management in `routes/index.tsx:34-52`
- UI rendering in `routes/index.tsx:302-454`

### Changing Color Theme
- Update color values in `index.html` styles and component classes
- Search for hex codes: `#1B3022`, `#5F7D61`, `#D4A373`, `#E76F51`, `#E9C46A`, `#FAF9F6`

### Updating Chart Data
- Modify `data` array in `routes/index.tsx:11-17`
- Recharts configuration at `routes/index.tsx:502-520`

## Important Notes

### Known Issues
- API key used client-side (ensure proper rate limiting on Google GenAI)
- Large bundle sizes (> 500KB warnings) - see TODO Phase 6.2 for code splitting

### Accessibility
- Skip-to-content link implemented (Tab + Enter)
- ARIA labels on interactive elements
- Focus indicators on all interactive elements
- Screen reader testing ongoing

### Testing
- No test framework currently set up (see TODO Phase 8)
- Testing framework planned (see TODO.md Phase 8)

## Environment Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp homepage/.env.example homepage/.env.local
```

2. Add your Google GenAI API key to `.env.local`:
```
VITE_API_KEY=your-actual-api-key
VITE_API_MODEL=gemini-3-flash-preview
```

3. Run dev server

**Note**: The app will render even without environment variables. A warning will be logged to console if variables are missing. Spark AI features will only work when `VITE_API_KEY` is set.

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

## Monorepo Context

This is App #1 in the monorepo. Future apps should:
- Follow similar Vite + TanStack Router pattern
- Use shared color palette and design system
- Reuse components from a shared package (when created)
- Follow monorepo workspace configuration (to be added)
