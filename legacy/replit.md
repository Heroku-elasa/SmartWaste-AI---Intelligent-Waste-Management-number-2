# EcoRide - Smart Waste Management

## Overview
EcoRide is a React + TypeScript + Vite application for smart waste management. It provides features including:
- Smart waste dashboard and monitoring
- AI-powered waste management with Gemini integration
- Collection request and scheduling
- Real-time monitoring capabilities

## Project Structure
- `/components/` - React components (pages, modals, UI elements)
- `/services/` - Backend services (Gemini AI, OpenRouter, database)
- `/utils/` - Utility functions (HTML generation)
- `App.tsx` - Main application component
- `index.tsx` - Application entry point
- `types.ts` - TypeScript type definitions
- `constants.ts` - Application constants

## Tech Stack
- React 19
- TypeScript 5.8
- Vite 6
- Tailwind CSS (via CDN)
- Recharts for data visualization
- Google Gemini AI integration

## Development
The application runs on port 5000 using Vite dev server.

### Environment Variables
- `GEMINI_API_KEY` - Required for AI features

## Deployment
Configured as a static site deployment. The build process uses `npm run build` which outputs to the `dist` directory.
