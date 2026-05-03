# Vivek Landing Page

## Project Overview
A personal landing page for Vivek Patel built with React + Vite and Tailwind CSS v4.

## Architecture
- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **Type**: Static Single Page Application (SPA)

## Project Structure
```
/
├── src/
│   ├── App.jsx          # Root component
│   ├── App.css          # App-level styles
│   ├── main.jsx         # Entry point
│   ├── index.css        # Global styles
│   ├── assets/          # Static assets
│   └── components/      # React components
├── public/              # Public static files
├── index.html           # HTML entry point
└── vite.config.js       # Vite configuration
```

## Development
- Dev server runs on port 5000 (`0.0.0.0`)
- `npm run dev` — start development server
- `npm run build` — build for production (output: `dist/`)

## Deployment
- Target: **static** (Replit static hosting)
- Build command: `npm run build`
- Public directory: `dist`

## Key Configuration
- `vite.config.js`: host set to `0.0.0.0`, port `5000`, `allowedHosts: true` for Replit proxy compatibility
- Tailwind CSS v4 integrated via Vite plugin (no separate config file needed)
