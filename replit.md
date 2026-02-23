# NyayAI - Smart Consumer Justice Platform

## Overview

NyayAI is an AI-powered consumer complaint analysis and justice platform built for the Indian market. It allows citizens to file consumer complaints (via text or voice), receive AI-powered analysis of their grievance (issue classification, emotional tone detection, consumer rights mapping, success probability), and auto-generate formal legal complaint letters. The platform also includes a consumer rights awareness section, a national impact dashboard with data visualizations, and links to government resources like the National Consumer Helpline.

The project is structured as a full-stack TypeScript monorepo with a React frontend and Express backend, using PostgreSQL for persistence and OpenAI for AI features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure
- `client/` — React SPA (Vite-based)
- `server/` — Express API server
- `shared/` — Shared schemas, types, and route definitions used by both client and server
- `server/replit_integrations/` — Pre-built integrations for audio (STT/TTS), chat, image generation, and batch processing
- `client/replit_integrations/` — Client-side audio recording and playback hooks

### Frontend (`client/src/`)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State/Data Fetching**: TanStack React Query for server state management
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives, styled with Tailwind CSS
- **Animations**: Framer Motion for page transitions and interactive elements
- **Charts**: Recharts for the Impact Dashboard data visualizations
- **PDF Generation**: jsPDF for downloadable complaint letters
- **Icons**: Lucide React
- **Internationalization**: Custom i18n context supporting English and Hindi (`client/src/lib/i18n.tsx`)
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

**Pages**:
- `/` — Home (hero + feature cards)
- `/file-complaint` — AI-powered complaint filing with voice input support
- `/awareness` — Consumer rights education (6 fundamental rights)
- `/impact` — Dashboard with charts showing complaint trends
- `/gov-resources` — Links to government helplines and portals

### Backend (`server/`)
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript, executed via `tsx`
- **Build**: Custom build script using esbuild (server) + Vite (client), outputs to `dist/`
- **Dev Mode**: Vite dev server with HMR proxied through Express
- **Production**: Static files served from `dist/public/`

**API Endpoints** (defined in `shared/routes.ts`):
- `POST /api/complaints` — Analyze a complaint using OpenAI and store in database
- `GET /api/stats` — Get aggregated dashboard statistics
- `POST /api/stt` — Speech-to-text conversion (accepts base64 audio)

### Database
- **Database**: PostgreSQL (required via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts`
- **Migrations**: Managed via `drizzle-kit push` (schema push approach, not migration files)
- **Tables**:
  - `complaints` — id, content, type, emotionalTone, city, productCategory, generatedLetter, created_at
  - `conversations` — id, title, created_at (for chat integration)
  - `messages` — id, conversation_id (FK), role, content, created_at (for chat integration)

### AI Integration
- **Provider**: OpenAI API (via Replit AI Integrations)
- **Environment Variables**: `AI_INTEGRATIONS_OPENAI_API_KEY`, `AI_INTEGRATIONS_OPENAI_BASE_URL`
- **Usage**:
  - Complaint analysis: Classifies issue type, detects emotional tone, maps consumer rights, estimates success probability, generates formal legal letters
  - Speech-to-text: Converts voice recordings to text using Whisper
  - Audio format detection and conversion via ffmpeg

### Audio/Voice Integration
- Client-side: `useVoiceRecorder` hook captures audio via MediaRecorder API (WebM/Opus)
- Server-side: Audio format detection, ffmpeg conversion, OpenAI Whisper STT
- Supports WAV, MP3, WebM, MP4, OGG formats

### Key Design Decisions
1. **Shared route definitions with Zod**: API contracts are defined once in `shared/routes.ts` with Zod schemas, ensuring type safety across client and server
2. **Fallback mock data**: The client includes fallback mock responses for when the backend isn't available, ensuring the UI works independently for demo/competition purposes
3. **Custom i18n over libraries**: Simple key-value translation system supports English and Hindi without heavy dependencies
4. **Schema push over migrations**: Uses `drizzle-kit push` for faster iteration rather than generating migration files

## External Dependencies

### Required Services
- **PostgreSQL Database**: Must be provisioned and `DATABASE_URL` environment variable set
- **OpenAI API** (via Replit AI Integrations): Requires `AI_INTEGRATIONS_OPENAI_API_KEY` and `AI_INTEGRATIONS_OPENAI_BASE_URL` environment variables
- **ffmpeg**: Required on the system for audio format conversion (STT feature)

### Key NPM Packages
- `drizzle-orm` + `drizzle-zod` — Database ORM and schema validation
- `express` v5 — HTTP server
- `openai` — AI API client
- `@tanstack/react-query` — Client-side data fetching
- `recharts` — Data visualization charts
- `framer-motion` — Animations
- `jspdf` — PDF generation for complaint letters
- `wouter` — Client-side routing
- `zod` — Schema validation throughout
- `connect-pg-simple` — PostgreSQL session store (available but auth not yet implemented)