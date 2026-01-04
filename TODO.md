# TODO: Homepage Refactor & Improvements - COMPLETED

## Phase 1: Migration to TanStack Router with Vite ✅

### 1.1 Setup TanStack Router ✅
- [x] Install TanStack Router dependencies with Bun
- [x] Create TanStack Router project structure (routes/, app.tsx, router.tsx, routeTree.ts)
- [x] Update `vite.config.ts` for TanStack Router
- [x] Create `app.tsx` root component
- [x] Create `routes/__root.tsx` layout route with Header and Footer
- [x] Configure TanStack Router with file-based routing
- [x] Set up route components for homepage

### 1.2 Component Migration ✅
- [x] All sections consolidated into `routes/index.tsx` (Hero, Vision, ProblemSolution, DigitalGarden, VirtuousCycle, SparkAI, InvestmentJar, GrowthChart)
- [x] Header and Footer moved to `routes/__root.tsx`
- [x] Removed old `App.tsx` component file

### 1.3 Build Configuration ✅
- [x] Updated `package.json` scripts for Bun + Vite
- [x] Updated `tsconfig.json` for TypeScript support
- [x] Removed unnecessary dependencies (@tanstack/start, vinxi)

## Phase 2: Bug Fixes from Code Review ✅

### 2.1 Critical Fixes ✅
- [x] Added TypeScript declaration for `VITE_API_KEY` and `VITE_API_MODEL` in `global.d.ts`
- [x] Fixed hardcoded API model - now configurable via `VITE_API_MODEL` environment variable

### 2.2 Navigation Improvements ✅
- [x] Added `aria-label` attributes to navigation links for accessibility
- [x] Added `aria-hidden` to decorative SVG icons

### 2.3 Data Persistence ✅
- [x] SparkAI functionality preserved with localStorage persistence

### 2.4 Legal/Compliance ✅
- [x] Non-profit 501(c)(3) claim kept but should be verified before production

## Phase 3: Accessibility Improvements ✅

### 3.1 ARIA & Screen Readers ✅
- [x] Added `aria-label` to icon-only buttons in Header
- [x] Added `aria-label` to icon-only buttons in Footer
- [x] Added `aria-hidden` to decorative SVG illustrations
- [x] Added `aria-label` to Join button

## Phase 4: Technical Debt ✅

### 4.1 Configuration Improvements ✅
- [x] Made API model configurable via environment variable (`VITE_API_MODEL`)
- [x] Created `.env.example` file for reference

---

## Files Created/Modified

### New Files
- `app.tsx` - Main app component with RouterProvider
- `router.tsx` - Router instance export
- `routeTree.ts` - Route tree definition
- `routes/__root.tsx` - Root layout with Header and Footer
- `routes/index.tsx` - Main homepage with all sections
- `entry-client.tsx` - Client entry point
- `global.d.ts` - TypeScript declarations for VITE_ env vars
- `.env.example` - Example environment variables

### Modified Files
- `vite.config.ts` - Simplified for Vite + TanStack Router
- `package.json` - Updated scripts and dependencies
- `tsconfig.json` - Added global.d.ts to includes
- `index.html` - Updated entry point to `/entry-client.tsx`

---

## Running the Project

### Development
```bash
cd homepage
bun run dev
```

### Production Build
```bash
cd homepage
bun run build
```

### Environment Variables
Copy `.env.example` to `.env.local` and add your values:
```
VITE_API_KEY=your-gemini-api-key
VITE_API_MODEL=gemini-3-flash-preview
```

---

## Phase 5: Code Quality & Organization Enhancements

### 5.1 Clean Up Unused Files ✅
- [x] Remove duplicate component files in `homepage/components/` (SparkAI.tsx, GrowthChart.tsx, Hero.tsx, Vision.tsx, VirtuousCycle.tsx, InvestmentJar.tsx, DigitalGarden.tsx, Footer.tsx, Header.tsx, ProblemSolution.tsx)
- [x] Remove unused `app.config.ts` file (TanStack Start config not used with Vite)
- [x] Remove duplicate `router.tsx` export (keep only `routeTree.ts`)
- [x] Remove unused `SectionId` enum from `types.ts`

### 5.2 Fix Inconsistent API Key Usage ✅
- [x] Update `components/SparkAI.tsx:62` to use `import.meta.env.VITE_API_KEY` instead of `process.env.API_KEY`
- [x] Add runtime validation for required environment variables
- [ ] Document environment variable requirements in README

### 5.3 Type Safety Improvements ✅
- [x] Add type guards for JSON.parse in `routes/index.tsx:94`
- [x] Add TypeScript strict mode to tsconfig.json
- [x] Fix any missing type declarations

### 5.4 Code Formatting & Linting ✅
- [x] Install Biome as dev dependency
- [x] Configure Biome with single quotes and no semicolons
- [x] Add format and lint scripts to package.json
- [x] Format all existing files with Biome
- [ ] Configure pre-commit hooks for auto-formatting

## Phase 6: Performance Optimizations

### 6.1 Bundle Size Reduction ✅
- [x] Remove Tailwind CSS CDN from `index.html:7`
- [x] Install Tailwind CSS as dev dependency (`bun add -d tailwindcss`)
- [x] Configure PostCSS and Tailwind config
- [x] Set up Tailwind build process

### 6.2 Code Splitting & Lazy Loading
- [ ] Implement React.lazy() for large sections in `routes/index.tsx`
- [ ] Dynamic import Recharts components
- [ ] Optimize import maps in `index.html` to load on-demand
- [ ] Consider using vite-plugin-svgr for SVG icons

### 6.3 Build Configuration
- [ ] Review and optimize Vite configuration
- [ ] Add bundle size analysis tool
- [ ] Set up production build optimizations

## Phase 7: Accessibility Improvements

### 7.1 Keyboard Navigation
- [x] Add skip-to-content link as top item in `routes/__root.tsx`
- [ ] Ensure all interactive elements have visible focus indicators
- [ ] Test tab order and focus management

### 7.2 ARIA & Screen Readers
- [x] Add aria-label to clear button in `routes/index.tsx:325`
- [ ] Review and improve aria-labels throughout the app
- [ ] Test with screen readers

## Phase 8: Testing & Quality Assurance

### 8.1 Test Framework Setup ✅
- [x] Install testing dependencies (vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, happy-dom, @vitest/coverage-v8)
- [x] Configure Vitest for React testing with Happy DOM
- [x] Configure coverage reporting (html, lcov, text, json)
- [x] Set up test scripts in package.json
- [x] Create example test files (types, storage)

### 8.2 Unit Tests (In Progress)
- [ ] Write tests for SparkAI component logic
- [x] Write tests for localStorage persistence
- [ ] Write tests for GrowthChart component
- [ ] Write tests for API integration (mock Google GenAI)
- [x] Write tests for type guards (isSparkResult)

### 8.3 E2E Tests
- [ ] Consider adding Playwright for E2E testing
- [ ] Test critical user flows (Spark AI, save functionality)

## Phase 9: Documentation & Maintenance

### 9.1 Documentation
- [ ] Create comprehensive README.md in root directory
- [ ] Document monorepo structure (homepage is app #1)
- [ ] Document environment variables and setup steps
- [ ] Document development workflow
- [ ] Add CONTRIBUTING.md guidelines

### 9.2 Security
- [ ] Review API key exposure risks (VITE_API_KEY is client-side)
- [ ] Add API rate limiting documentation
- [ ] Add .env.local to .gitignore if not present
- [ ] Document security best practices

### 9.3 CI/CD (Future)
- [ ] Set up GitHub Actions for linting and testing
- [ ] Configure automated deployment workflow
- [ ] Add pre-commit hooks (husky + lint-staged)

## Phase 10: Monorepo & Future Apps

### 10.1 Monorepo Structure
- [ ] Document monorepo setup for future apps
- [ ] Configure shared packages/utils for reuse
- [ ] Set up workspace configuration
- [ ] Plan for shared components library

### 10.2 Additional Features (Backlog)
- [ ] Add more routes (About, Join, Contact pages)
- [ ] Implement user authentication
- [ ] Add backend API integration
- [ ] Implement analytics tracking
- [ ] Add error boundary components
- [ ] Implement dark mode toggle

---

## Remaining Tasks from Previous Phase

- [ ] Test and verify non-profit 501(c)(3) legal status
