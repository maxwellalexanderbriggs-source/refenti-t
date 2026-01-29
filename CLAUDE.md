# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Premium real estate portfolio website for Refenti Realty Group - a specialized real estate development company in Addis Ababa, Ethiopia. The site showcases luxury residential and mixed-use property developments with investment opportunities and administrative management capabilities.

**Tech Stack:**

- React 19 + TypeScript 5.9
- Vite 7 (build tool)
- React Router 7 (BrowserRouter for clean URLs)
- Tailwind CSS v4 (with @tailwindcss/vite plugin)
- Bun (package manager)
- No backend - localStorage for data persistence

## Development Commands

```bash
# Development
bun install          # Install dependencies
bun run dev          # Start dev server (http://localhost:3000)

# Production
bun run build        # TypeScript check + Vite build
bun run preview      # Preview production build
```

## Architecture

### Data Layer

**Storage:** All data persists in browser localStorage (no backend).

**Data Management (`src/constants.ts`):**

- `INITIAL_*` constants define seed data for projects, events, news, inquiries
- `get*()` functions retrieve from localStorage with fallback to initial data
- `save*()` functions persist to localStorage
- Storage keys versioned (e.g., `refenti_projects_v1`)

**Data Flow:**

1. Admin creates/edits content via admin pages
2. Changes saved to localStorage via `save*()` functions
3. Public pages read via `get*()` functions
4. Data resets on localStorage clear or different browser/device

### Routing Structure

**Public Routes:**

- `/` - Home (hero, featured projects, events)
- `/about` - Company mission & principles
- `/investment` - Investment opportunities
- `/projects` - Project listing
- `/projects/:id` - Dynamic project details
- `/projects/bole` - Specific project (Bole)
- `/projects/kazanchis` - Specific project (Kazanchis)
- `/projects/bulbula` - Specific project (Bulbula)
- `/news` - Events and news feed
- `/contact` - Inquiry form

**Admin Routes (nested under `/admin`):**

- `/admin/projects` - Manage projects (CRUD)
- `/admin/projects/new` - Create project
- `/admin/projects/edit/:id` - Edit project
- `/admin/events` - Manage events
- `/admin/news` - Manage news articles
- `/admin/inquiries` - View/manage contact form submissions

**Route Behavior:**

- `App.tsx` conditionally hides navbar/footer on admin routes
- `ScrollToTop` component scrolls to top on route change
- `useReveal` hook triggers `.reveal` animations on scroll

### Styling System

**Tailwind v4 Configuration (`src/index.css`):**

- Uses `@import "tailwindcss"` (not `@tailwind` directives)
- Custom theme via `@theme` directive:
  - Colors: `--color-refenti-offwhite`, `--color-refenti-gold`, `--color-refenti-charcoal`
  - Fonts: Nunito Sans (bundled via @fontsource-variable)
  - Letter spacing: `--tracking-extrawide` (0.4em), `--tracking-ultra` (0.6em)
  - Animations: `--animate-fade-in`, `--animate-slide-in-from-top`

**Custom CSS Classes:**

- `.glass-nav` - Glassmorphism navbar effect (backdrop blur)
- `.reveal` / `.reveal.active` - Scroll-triggered fade-in animations
- `.subtle-shadow` - Soft shadow for cards/elements
- `.expand-x` - Horizontal expansion animation

**Animation System:**

- IntersectionObserver watches `.reveal` elements
- Adds `.active` class when in viewport
- Used throughout all pages for entrance effects

### Component Patterns

**Reusable Components:**

- `Navbar.tsx` - Fixed glass navbar with dropdown project menu
  - Desktop: Hover-triggered dropdown with project previews
  - Mobile: Slide-down menu
  - Closes automatically on route change

**Page Structure:**

- Hero sections with parallax scrolling (`transform: translateY`)
- Scroll-based dynamic styles (inline `style` props)
- Grid layouts with Tailwind responsive breakpoints
- Heavy use of arbitrary values (e.g., `text-[13px]`, `rounded-[2rem]`)

**Admin Pages Pattern:**

- Split layout: sticky editor form (left) + list view (right)
- Inline editing with controlled inputs
- Immediate localStorage persistence
- No backend API calls

### Type System

**Core Types (`src/types.ts`):**

- `Project` - Real estate project data
- `ProjectDetailSection` - Feature sections with title/text/image
- `EventItem` - Events with featured flag
- `NewsItem` - News articles with categories
- `Inquiry` - Contact form submissions

**TypeScript Configuration:**

- Strict mode enabled (`tsconfig.app.json`)
- `noUnusedLocals` and `noUnusedParameters` enforced
- `verbatimModuleSyntax` - requires `import type` for types
- Uses project references (`tsconfig.json` → `tsconfig.app.json`, `tsconfig.node.json`)

## Important Conventions

### Code Style

- Prettier formatted (2-space indent, no semicolons, double quotes)
- Use `import type` for type-only imports (required by `verbatimModuleSyntax`)
- React functional components with TypeScript
- Tailwind utility classes over custom CSS

### Data Updates

- Always use `get*()` and `save*()` functions from `constants.ts`
- Never directly access `localStorage` in components
- Admin changes reflect immediately (no refresh needed)

### Routing

- Use `<Link>` from react-router-dom for internal navigation
- Dynamic project routes use `:id` param matching project.id
- Admin detection checks `location.pathname.startsWith("/admin")`

### Animations

- Add `.reveal` class to elements for scroll animations
- Use inline styles for dynamic scroll-based transforms
- Tailwind animations defined in `@theme` directive

## Production Build

Build outputs to `dist/`:

- HTML entry point
- Bundled JS (~97KB gzipped)
- Optimized CSS (~10KB gzipped)
- Font files (split by language subset)

**Deployment Requirements:**

- Static file hosting (Netlify, Vercel, etc.)
- SPA fallback rule: redirect all routes to `/index.html`
  - Netlify: `/*  /index.html  200` in `public/_redirects`
  - Vercel: `"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]` in `vercel.json`
