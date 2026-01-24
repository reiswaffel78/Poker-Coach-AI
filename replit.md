# Poker Coach - AI Training Assistant

## Overview

Poker Coach is an AI-powered poker training assistant that analyzes poker screenshots and provides strategic hand recommendations. Users upload screenshots of their poker games, and the system uses OpenAI's vision capabilities to extract game state information (hole cards, community cards, position, pot size, stack sizes, villain actions) and delivers actionable recommendations (FOLD, CHECK, CALL, RAISE, ALL-IN) with detailed reasoning in German.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, built using Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming (light/dark mode support)
- **Design Theme**: Poker-themed green felt color scheme

### Backend Architecture
- **Framework**: Express.js 5 running on Node.js with TypeScript
- **API Design**: RESTful JSON API with endpoints under `/api/`
- **AI Integration**: OpenAI API (via Replit AI Integrations) for vision-based poker screenshot analysis
- **Build System**: esbuild for server bundling, Vite for client bundling

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains all database table definitions
- **Tables**: Users, hand analyses, conversations, and messages
- **Current Runtime**: In-memory storage (MemStorage class) with PostgreSQL schema ready for migration
- **Migrations**: Drizzle Kit manages schema changes via `db:push` command

### Key API Endpoints
- `POST /api/analyze` - Submit poker screenshot for AI analysis
- `GET /api/analyses` - Retrieve analysis history
- Conversation and chat endpoints for extended AI interactions

### Project Structure
```
client/           # React frontend
  src/
    components/   # UI components including shadcn/ui
    pages/        # Route components
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  routes.ts       # API route definitions
  storage.ts      # Data persistence layer
  replit_integrations/  # AI integration utilities
shared/           # Shared types and schemas
  schema.ts       # Drizzle database schema
```

## External Dependencies

### AI Services
- **OpenAI API**: Used via Replit AI Integrations for poker screenshot analysis and text generation
- **Environment Variables**: `AI_INTEGRATIONS_OPENAI_API_KEY` and `AI_INTEGRATIONS_OPENAI_BASE_URL`

### Database
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- **connect-pg-simple**: Session storage support

### Key NPM Packages
- **drizzle-orm / drizzle-kit**: Database ORM and migration tooling
- **zod / drizzle-zod**: Schema validation
- **@tanstack/react-query**: Async state management
- **Radix UI**: Accessible UI primitives
- **Tailwind CSS**: Utility-first styling

### Build and Development
- **Vite**: Frontend dev server and bundler
- **tsx**: TypeScript execution for development
- **esbuild**: Production server bundling