# Internery — Frontend

Part-time job marketplace for students and employers, built with **Next.js 15** (App Router, TypeScript, pnpm).

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 15 | Framework (App Router, SSR/SSG, Turbopack) |
| React | 19 | UI |
| TypeScript | 5 | Type safety |
| TanStack Query | 5 | Server state / data fetching |
| Zustand | 4 | Client state |
| React Hook Form | 7 | Forms |
| Zod | 3 | Validation |
| better-auth | latest | Auth client (cookie-based session) |
| next-intl | 3 | i18n (vi / en) |
| lucide-react | latest | Icons |

## Ports

| Service | URL |
|---------|-----|
| **Frontend** (Next.js) | http://localhost:3000 |
| **Backend** (SvelteKit) | http://localhost:5173 |

API calls from the browser go through the Next.js rewrite proxy:
`/api/*` → `http://localhost:5173/api/*`

## Getting Started

```bash
# 1. Copy env template
cp .env.example .env.local
# Edit .env.local if needed (defaults work for local dev)

# 2. Install dependencies
pnpm install

# 3. Start dev server (Turbopack)
pnpm dev
```

Open http://localhost:3000

> The SvelteKit backend must be running at http://localhost:5173 for API calls to work.

## Scripts

```bash
pnpm dev          # Dev server with Turbopack
pnpm build        # Production build
pnpm start        # Production server
pnpm lint         # ESLint
pnpm lint:fix     # ESLint auto-fix
pnpm format       # Prettier
pnpm type-check   # TypeScript check (tsc --noEmit)
pnpm test         # Vitest unit tests
pnpm test:e2e     # Playwright e2e tests
```

## Directory Structure

```
c:\FE\nextjs-template\
├── public/                    # Static assets (favicon, images)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (public)/          # Public pages (no auth required)
│   │   │   ├── jobs/          # /jobs — Job listings
│   │   │   ├── companies/     # /companies — Company listings
│   │   │   ├── about/
│   │   │   └── layout.tsx     # Public layout (Header + Footer)
│   │   ├── (auth)/            # Auth pages
│   │   │   ├── login/         # /login
│   │   │   ├── register/      # /register
│   │   │   ├── verify-email/  # /verify-email
│   │   │   └── layout.tsx     # Centered card layout
│   │   ├── (student)/         # Protected — STUDENT role
│   │   │   ├── student/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── profile/
│   │   │   │   ├── applied-jobs/
│   │   │   │   └── saved-jobs/
│   │   │   └── layout.tsx     # Student sidebar layout
│   │   ├── (employer)/        # Protected — EMPLOYER role
│   │   │   ├── employer/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── jobs/
│   │   │   │   └── candidates/
│   │   │   └── layout.tsx     # Employer sidebar layout
│   │   ├── (admin)/           # Protected — ADMIN role
│   │   ├── layout.tsx         # Root layout (font, metadata, providers)
│   │   ├── page.tsx           # Homepage (/)
│   │   ├── providers.tsx      # QueryClientProvider etc.
│   │   ├── error.tsx          # Global error boundary
│   │   ├── not-found.tsx      # 404 page
│   │   └── loading.tsx        # Global loading UI
│   ├── assets/styles/         # Global CSS, variables, animations
│   ├── components/
│   │   ├── ui/                # Shared UI primitives (Button, Input…)
│   │   ├── layout/            # Header, Footer, Sidebar…
│   │   └── sections/          # Page-level section components
│   ├── features/              # Feature slices (co-locate by domain)
│   │   ├── auth/              # Login, register, session
│   │   ├── student/           # Student profile, CV, applications
│   │   ├── employer/          # Job posting, candidate review
│   │   ├── jobs/              # Job listings and detail
│   │   ├── companies/         # Company listings and detail
│   │   ├── search/            # Search and suggestions
│   │   └── applications/      # Job application flow
│   ├── hooks/                 # Shared custom hooks
│   ├── lib/
│   │   ├── auth-client.ts     # better-auth React client
│   │   └── auth.ts            # Server-side session helper
│   ├── services/
│   │   ├── apiClient.ts       # Fetch wrapper (credentials, error parsing)
│   │   ├── axiosClient.ts     # Legacy axios client (kept for reference)
│   │   └── queryClient.ts     # TanStack Query client config
│   ├── store/                 # Zustand global state slices
│   ├── types/                 # Shared TypeScript types
│   ├── constants/             # API endpoints, app constants
│   ├── utils/                 # format, validate, storage helpers
│   ├── locales/
│   │   ├── en/index.json      # English strings
│   │   └── vi/index.json      # Vietnamese strings
│   └── middleware.ts          # Route protection (session cookie check)
├── .env.example               # Environment variable template
├── next.config.ts             # Next.js config (rewrites, images, headers)
├── tsconfig.json              # TypeScript config (strict, path aliases)
└── package.json
```

## Path Aliases

```ts
import { apiClient }    from '@/services/apiClient';
import { authClient }   from '@/lib/auth-client';
import { useAuth }      from '@features/auth/hooks/useAuth';
import { formatDate }   from '@utils/format';
```

All `@/*` aliases resolve to `src/*`. See `tsconfig.json` for the full list.

## User Roles

Backend roles: `STUDENT`, `EMPLOYER`, `ADMIN`

- Role check in middleware: **session cookie presence only** (redirect to `/login` if missing)
- Role-based access: handled in each protected group's `layout.tsx` (server-side)
