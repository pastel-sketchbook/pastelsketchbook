# Pastel Sketchbook

A non-profit project that converts collective learning into shared wealth through automated content creation and long-term investment.

## Vision

Pastel Sketchbook reimagines education as **production**. Learners study language (or other skills) while simultaneously creating monetizable educational content. Revenue from that content flows into a shared investment fund, compounding over decades into generational wealth for the entire community.

**Model**: Language learning + content automation → YouTube revenue → ETF investments → long-term compounding growth

## Repository Structure

This is a monorepo containing multiple applications:

```
pastel-sketchbook/
├── homepage/           # Landing page & primary app (React + TanStack Router + Vite)
├── docs/               # Project documentation
├── .github/            # GitHub workflows
└── README.md          # This file
```

### App #1: Homepage

The landing page for Pastel Sketchbook. It features:
- **Hero section**: Project overview
- **SparkAI**: Interactive AI-powered idea generator
- **Growth chart**: Compound growth visualization
- **Showcase**: Video gallery of community content
- **Philosophy**: Core values and learning approach

**Tech Stack**:
- React 19.2.3
- TanStack Router 1.147.3
- Vite 7.3.1
- Tailwind CSS 4.1.18
- Google GenAI SDK
- Recharts (charts)
- Biome (formatting/linting)
- Vitest (testing)

**Location**: `homepage/`

## Getting Started

### Prerequisites
- [Bun](https://bun.sh) (runtime and package manager)
- Node.js 18+ (if not using Bun)

### Installation

```bash
# Clone the repository
git clone https://github.com/pastel-sketchbook/pastelsketchbook.git
cd pastel-sketchbook

# Navigate to the homepage app
cd homepage

# Install dependencies
bun install
```

### Environment Setup

1. Copy the environment template:
```bash
cp homepage/.env.example homepage/.env.local
```

2. Add your API keys to `homepage/.env.local`:
```env
VITE_API_KEY=your-google-genai-api-key
VITE_API_MODEL=gemini-3-flash-preview
VITE_YOUTUBE_API_KEY=your-youtube-api-key
```

### Run Development Server

```bash
cd homepage
bun run dev
```

Server runs on `http://localhost:3000`

### Build for Production

```bash
cd homepage
bun run build
bun run preview
```

## Key Features

### SparkAI
An interactive AI idea generator that uses Google Generative AI to brainstorm content ideas. Results are persisted to localStorage for later reference.

### Growth Visualization
Interactive Recharts visualization showing compound growth projections at 7% annual returns over 30 years.

### Video Showcase
Gallery of community-created educational videos with filtering and search capabilities.

### Responsive Design
Mobile-first design with the "60:30:10" color rule:
- 60% primary (off-white background, dark green text)
- 30% secondary (medium green, tan accents)
- 10% accent (terracotta, yellow highlights)

## Project Architecture

### Core Concept

1. **Learning Phase**: Community members study language/skill in structured cohorts
2. **Production Phase**: Learners create educational content about what they learn
3. **Monetization Phase**: Content published to YouTube, generates revenue
4. **Investment Phase**: Revenue automatically invested in low-cost index ETFs
5. **Compounding Phase**: Fund grows over 30 years into generational wealth

### Financial Model

- **Time Horizon**: 30 years
- **Target Annual Revenue**: $100K+ per year (scales with community)
- **Investment Vehicle**: Low-cost index ETFs (S&P 500, Total World Stock)
- **Expected Returns**: 7-8% annually
- **Projected Growth**: $3M in contributions → $7-10M+ with compounding

## Development

### Code Quality

Run the complete quality check before committing:

```bash
cd homepage
bun run check:all
```

This runs:
- **Format check** (Biome)
- **Linting** (Biome)
- **Tests** with coverage (Vitest)

### Code Formatting

```bash
cd homepage
bun run format          # Format all files
bun run format:check     # Check without changes
bun run lint:fix        # Fix linting issues
```

**Style Guide**:
- Single quotes for strings
- No semicolons (as needed)
- 2-space indentation
- 100-character line width
- Uses Biome for enforcement

### Testing

```bash
cd homepage
bun run test            # Watch mode
bun run test:ui        # Test UI interface
bun run test:run        # Run once
bun run test:coverage   # Coverage report
```

## Documentation

### Project Plans
- **Pastel_Sketchbook_Actionable_Plans.md** - Detailed strategic plan with timelines and metrics
- **TODO.md** - Active feature tracking and completed work

### Developer Documentation
- **homepage/AGENTS.md** - Complete developer guide with patterns and conventions
- **homepage/README.md** - Homepage app-specific documentation
- **homepage/docs/** - API patterns, error handling, code splitting

## Deployment

The homepage is deployed on Vercel. **Do not deploy automatically** — always ask before deploying to production.

To deploy manually:
```bash
cd homepage
bun run deploy:vercel
```

## Security

- API keys managed via environment variables
- YouTube API calls server-side only (never exposed to client)
- Input validation with Zod schemas
- Error boundaries prevent cascading failures
- Rate limiting on YouTube API (60 requests/minute)

See `homepage/docs/archives/SECURITY_AUDIT.md` for detailed security review.

## Legal Status

Pastel Sketchbook is organized as a 501(c)(3) non-profit organization (pending verification).

## Contributing

This is an active development project. See **CONTRIBUTING.md** (coming soon) for guidelines.

## License

TBD

## Contact

For questions or to join the community, visit the homepage at [pastelsketchbook.com](https://pastelsketchbook.com) or open an issue on GitHub.

---

**Last Updated**: January 12, 2026  
**Project Stage**: MVP Development (Homepage Phase Complete)
