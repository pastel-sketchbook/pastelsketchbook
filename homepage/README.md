# Pastel Sketchbook - Homepage

The homepage is the first application in this monorepo. It's a React-based landing page for "Pastel Sketchbook" - a non-profit community that turns collective learning into shared wealth.

## Features

- **Interactive Spark AI**: AI-powered idea generator that helps users explore topics within the Pastel Sketchbook model
- **Growth Visualization**: Interactive charts showing compound growth over time
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- **Accessibility**: Keyboard navigation, screen reader support, and ARIA labels
- **Data Persistence**: LocalStorage-based spark saving functionality

## Tech Stack

- **Runtime**: Bun
- **Framework**: React 19.2.3
- **Routing**: TanStack Router 1.144.0
- **Build Tool**: Vite 6.2.0
- **Language**: TypeScript 5.8.2 (strict mode enabled)
- **Styling**: Tailwind CSS 4.1.18
- **Charts**: Recharts 3.6.0
- **AI**: Google GenAI SDK 1.34.0

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+
- Google GenAI API key

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
VITE_API_KEY=your-actual-api-key
VITE_API_MODEL=gemini-3-flash-preview
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

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_KEY` | Yes | Google GenAI API key |
| `VITE_API_MODEL` | No | AI model name (default: "gemini-3-flash-preview") |

**Note**: All environment variables must be prefixed with `VITE_` to be accessible in client-side code via `import.meta.env`.

**Graceful Handling**: The app will render even without environment variables. A warning will be logged to console if variables are missing. Spark AI features will only work when `VITE_API_KEY` is properly configured.

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run router:generate` | Generate route types |
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

- The API key is used client-side via `VITE_API_KEY`
- Ensure your Google GenAI API has proper rate limiting and restrictions
- Never commit `.env.local` to version control

## Accessibility

- Skip-to-content link for keyboard users
- ARIA labels on interactive elements
- Focus indicators on all interactive elements
- Semantic HTML structure

## Monorepo Context

This is App #1 in the monorepo.
