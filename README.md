# Together — Candidate Portal

The candidate-facing website for the Together hiring platform. Built with Next.js, TypeScript, and Tailwind CSS in an amber/gold glassmorphism aesthetic that matches the recruiter dashboard.

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/                # API route stubs (mock data)
│   │   ├── jobs/           # GET /api/jobs, GET /api/jobs/[id]
│   │   ├── applications/   # GET /api/applications/[id]
│   │   └── candidates/     # GET /api/candidates/me/applications
│   ├── dashboard/          # Candidate dashboard + application detail
│   ├── jobs/               # Job listing + job detail pages
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   ├── profile/            # Profile editor + setup wizard
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # Reusable UI primitives
│   │   ├── glass-card.tsx  # Glassmorphism card container
│   │   ├── button.tsx      # Button (primary/secondary/ghost/outline)
│   │   ├── input.tsx       # Input + TextArea with labels/errors
│   │   ├── badge.tsx       # Badge + StageBadge
│   │   ├── fit-score.tsx   # FitScoreRing + FitScoreBar
│   │   ├── skill-tag.tsx   # SkillTag + SkillTagInput
│   │   └── ambient-background.tsx
│   ├── layout/             # Navbar + Footer
│   └── jobs/               # JobCard, ApplicationCard
├── lib/
│   ├── types.ts            # TypeScript interfaces (Job, Application, etc.)
│   ├── mock-data.ts        # Mock data + fit score calculator
│   ├── auth-context.tsx    # Client-side auth context (localStorage)
│   └── utils.ts            # Formatters, classname helpers
└── styles/
    └── globals.css         # Tailwind theme + custom utilities
```

## Pages & Flows

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, testimonials |
| `/jobs` | Browse all open roles with search and filters |
| `/jobs/[id]` | Job detail + apply flow + fit score sidebar |
| `/login` | Sign in |
| `/signup` | Create account |
| `/profile/setup` | Multi-step profile wizard (post-signup) |
| `/profile` | Edit profile (skills, experience, links) |
| `/dashboard` | Application overview with stats |
| `/dashboard/applications/[id]` | Detailed application view with timeline & fit breakdown |

## Data Models

- **CandidateProfile** — skills, experience level, role preferences, links
- **Job** — title, company, requirements, tags, salary range
- **Application** — links candidate to job with stage + timeline
- **FitScore** — 0-100 overall score with strengths, gaps, recommendations

## Design System

- **Aesthetic**: Minimal luxury + glassmorphism
- **Accent**: Amber/gold (`amber-500` through `amber-700`)
- **Background**: Warm cream (`#faf9f6`) with ambient radial gradient orbs
- **Cards**: `bg-white/50` + `backdrop-blur-xl` + soft white borders
- **Typography**: Outfit (Google Fonts)
- **Corners**: `rounded-2xl` throughout

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Auth**: Client-side context with localStorage (swap to NextAuth/JWT)
- **Data**: Mock data in-memory (swap to Prisma/Postgres)
