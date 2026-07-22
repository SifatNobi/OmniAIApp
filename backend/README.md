# OmniAIApp — Backend Infrastructure

This directory contains the project's build infrastructure, shared configuration, and tooling.

## Contents

| File | Purpose |
|---|---|
| `package.json` | Backend dependency management & orchestration scripts |
| `next.config.ts` | Next.js build configuration (reference copy) |
| `tsconfig.json` | TypeScript configuration (reference copy) |
| `tailwind.config.ts` | Tailwind CSS theme configuration (reference copy) |
| `postcss.config.js` | PostCSS pipeline configuration (reference copy) |
| `.prettierrc` | Shared code formatting rules |
| `next-env.d.ts` | Next.js TypeScript declarations |
| `README.md` | This file |

## Architecture

```
omniapp/
├── backend/       ← You are here — Infrastructure & config
├── frontend/      ← Complete Next.js application (runs independently)
└── README.md      ← Root project documentation
```

The **frontend** directory is a self-contained Next.js 15 project that can be installed and run independently. This `backend/` directory holds reference configurations and shared tooling used during development and deployment.

## Commands

```bash
# Install frontend dependencies
npm run install:frontend

# Run frontend development server
npm run dev:frontend

# Build frontend for production
npm run build:frontend
```
