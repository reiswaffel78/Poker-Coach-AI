# Poker Coach - AI Training Assistant

## Overview

Poker Coach is an AI-powered poker training assistant that analyzes poker screenshots and provides strategic hand recommendations. Users upload screenshots of their poker games, and the system uses Google Gemini's vision capabilities (via Replit AI Integrations) to extract game state information (hole cards, community cards, position, pot size, stack sizes, villain actions) and delivers actionable recommendations (FOLD, CHECK, CALL, RAISE, ALL-IN) with detailed reasoning in English.

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
- **Internationalization**: react-i18next (English only, no German legal requirements)

### Backend Architecture
- **Framework**: Express.js 5 running on Node.js with TypeScript
- **API Design**: RESTful JSON API with endpoints under `/api/`
- **AI Integration**: Google Gemini API (via Replit AI Integrations) for vision-based poker screenshot analysis
- **CORS**: Configured for Chrome/Firefox extensions (chrome-extension://, moz-extension://)
- **Build System**: esbuild for server bundling, Vite for client bundling

### Chrome Extension
- **Location**: `extension/` folder
- **Features**: 
  - Hotkey capture (Ctrl+Shift+P) for instant screenshot analysis
  - Overlay UI showing recommendations directly in browser
  - Popup with settings for API URL configuration
  - Storage sync for persistent settings
- **Manifest Version**: 3 (Chrome MV3)
- **Installation**: Load unpacked extension from `extension/` folder in chrome://extensions

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

### Routes
- `/` - Marketing landing page with Hero, Features, How-it-Works, Extension section, FAQ
- `/app` - Main poker analysis tool (screenshot upload & AI recommendations, Coach/Roast modes)
- `/quiz` - Interactive poker quiz with Fold/Call/Raise questions, streak tracking, LocalStorage persistence
- `/ranges` - Hand range visualization with 13x13 matrix, position presets (UTG, MP, CO, BTN, SB, BB)
- `/hands` - Hand of the Day index (daily poker hand analysis)
- `/hands/:slug` - Individual hand analysis with actions table, AI recommendation, alternatives, common mistakes
- `/wiki` - Poker Glossary A-Z index
- `/wiki/:slug` - Individual term with definition, formula, example, related terms
- `/famous-hands` - Human vs Machine famous poker hands index
- `/famous-hands/:slug` - Individual famous hand analysis comparing human decision vs AI recommendation
- `/guide` - User guide for using the tool
- `/extension-guide` - Chrome extension installation guide
- `/privacy` - Privacy policy
- `/terms` - Terms of service

### Content System
- **Data Files**: Static TypeScript content in `client/src/data/`
  - `hands-of-the-day.ts` - Daily hand analysis content
  - `wiki-terms.ts` - Poker glossary terms
  - `famous-hands.ts` - Famous poker hand analyses
  - `quiz-scenarios.ts` - Interactive quiz hand scenarios
  - `range-presets.ts` - Position-based hand range presets for visualization
- **Content Types**: Zod schemas in `shared/content-types.ts`
- **SEO**: react-helmet-async for dynamic meta tags, structured data (Article, DefinedTerm schemas)

### Analysis Modes
- **Coach Mode**: Standard AI analysis with strategic recommendations
- **Roast Mode**: Humorous but educational feedback (Phil Hellmuth style roasting)
- Both modes include social sharing (Twitter, Copy to clipboard)

### Interactive Features
- **Quiz/Trainer**: Pre-configured poker scenarios, Fold/Call/Raise/All-In buttons, streak tracking with LocalStorage
- **Range Matrix**: 13x13 heatmap visualization of hand ranges by position

### Project Structure
```
client/           # React frontend
  src/
    components/   # UI components including shadcn/ui
    pages/        # Route components
      Landing.tsx       # Marketing landing page
      App.tsx           # Poker analysis tool (Coach/Roast modes)
      Quiz.tsx          # Interactive poker quiz trainer
      Ranges.tsx        # Hand range visualization
      HandsOfTheDay.tsx # Hand of the Day index
      HandDetail.tsx    # Individual hand analysis
      Wiki.tsx          # Poker glossary index
      WikiDetail.tsx    # Individual term page
      FamousHands.tsx   # Famous hands index
      FamousHandDetail.tsx # Individual famous hand
      ExtensionGuide.tsx # Chrome extension installation guide
    data/         # Static content data
      hands-of-the-day.ts
      wiki-terms.ts
      famous-hands.ts
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  routes.ts       # API route definitions
  storage.ts      # Data persistence layer
  index.ts        # Server entry with CORS for extensions
  replit_integrations/  # AI integration utilities
shared/           # Shared types and schemas
  schema.ts       # Drizzle database schema
extension/        # Chrome Browser Extension
  manifest.json   # Extension configuration (MV3)
  background.js   # Service worker for hotkeys and API calls
  content.js      # Content script for overlay display
  overlay.css     # Overlay styling
  popup.html/js   # Extension popup UI
  icons/          # Extension icons (16, 48, 128px)
public/           # Static assets
  og-image.png    # OpenGraph image for social sharing
  sitemap.xml     # SEO sitemap
  robots.txt      # Search engine directives
```

## External Dependencies

### AI Services
- **Google Gemini API**: Used via Replit AI Integrations for poker screenshot analysis (gemini-2.5-flash model)
- **Environment Variables**: `AI_INTEGRATIONS_GEMINI_API_KEY` and `AI_INTEGRATIONS_GEMINI_BASE_URL`
- **Cost**: Uses Replit Credits, significantly cheaper than OpenAI with generous free tier

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
