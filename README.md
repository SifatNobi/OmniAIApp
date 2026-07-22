# OmniAIApp

**One Platform. Every AI.**

OmniAIApp is an AI-native platform for Desktop and Android that unifies the world's best AI models, AI agents, AI extensions, MCP servers, workflows, and an open marketplace into one seamless experience.

## Project Structure

```
omniapp/
├── app/             - Next.js App Router pages & layouts
├── components/      - React components (animations, layout, sections, ui)
├── constants/       - Site data & configuration
├── hooks/           - Custom React hooks
├── lib/             - Utility functions
├── types/           - TypeScript type definitions
├── public/          - Static assets (SVGs, icons, images)
├── styles/          - Style utilities
├── backend/         - Build infrastructure, shared configs, tooling
└── (config files)   - package.json, next.config.ts, tailwind.config.ts, etc.
```

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI:** shadcn/ui + Custom Components
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Deployment

Optimized for Vercel — auto-detects Next.js at the project root.
