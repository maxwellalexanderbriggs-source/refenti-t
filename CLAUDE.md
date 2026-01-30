# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies (use bun, not npm)
bun install

# Start dev server (Vite on localhost:5173)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Environment Setup

Required environment variables in `.env.local`:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase public anon key

## Architecture Overview

### Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + Auth)
- **Styling**: Tailwind CSS 4 with custom theme
- **Routing**: React Router DOM 7

### Data Layer Architecture

All database operations flow through a **snake_case ↔ camelCase mapping layer** in `src/lib/api.ts`:

- **Database**: Uses snake_case (e.g., `asset_class`, `brochure_url`)
- **TypeScript**: Uses camelCase (e.g., `assetClass`, `brochureUrl`)
- **Mapping functions**: `toDb*` and `fromDb*` for each entity type

Example:
```typescript
// TypeScript interface (camelCase)
interface Project {
  assetClass: string
  brochureUrl?: string
}

// Database row type (snake_case)
type ProjectRow = {
  asset_class: string
  brochure_url: string | null
}
```

This mapping layer exists for all four entities: `Project`, `EventItem`, `NewsItem`, `Inquiry`.

### Database Tables

Four main Supabase tables:
1. `projects` - Real estate portfolio items with asset classes (Residential, Mixed-Use, Commercial, Hospitality)
2. `events` - Featured events and milestones
3. `news` - Blog/news content
4. `inquiries` - Contact form submissions

### Route Architecture

**Public routes** (src/App.tsx):
- `/` - Home
- `/about` - About page
- `/investment` - Investment opportunities
- `/projects` - Portfolio grid view
- `/projects/:id` - Dynamic project detail pages
- `/news` - Events and news
- `/contact` - Contact form

**Admin routes** (protected by Supabase auth):
- `/admin/login` - Auth page
- `/admin/*` - Admin dashboard with nested routes for CRUD operations

The navbar is hidden on all `/admin/*` routes.

### Authentication Flow

Auth is managed via `src/contexts/AuthContext.tsx`:
1. Wraps entire app in `<AuthProvider>`
2. Listens to Supabase auth state changes
3. Provides `session`, `loading`, `signIn()`, `signOut()` to components
4. `<ProtectedRoute>` component checks session before rendering admin routes

### Styling System

Custom Tailwind theme defined in `src/index.css`:
- **Colors**:
  - `refenti-offwhite: #f7f3f0` (background)
  - `refenti-gold: #b7a371` (accent)
  - `refenti-charcoal: #414141` (text)
- **Font**: Nunito Sans variable (weight: 300)
- **Custom utility**: `tracking-ultra: 0.6em` for ultra-wide letter spacing

Prettier auto-formats Tailwind classes using `prettier-plugin-tailwindcss`.

### Code Style

Prettier config (prettier.config.mjs):
- No semicolons (`semi: false`)
- Auto-organizes imports (`prettier-plugin-organize-imports`)
- Auto-sorts Tailwind classes

## Key Patterns

### API Error Handling
All API functions return a discriminated union type:
```typescript
type DataResult<T> =
  | { data: T; error: null }
  | { data: null; error: { message: string; details?: unknown } }
```

Supabase error code `PGRST116` = "not found"

### Project Detail Sections
Projects can have optional rich content via `detailSections` array:
```typescript
interface ProjectDetailSection {
  title: string
  text: string
  image: string
}
```

### Asset Classes
Projects are categorized as: `"Residential" | "Mixed-Use" | "Commercial" | "Hospitality"`
