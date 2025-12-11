
# EcoRide Smart Waste Management Platform

This is a comprehensive AI-powered waste management application built with React, TypeScript, and Vite.

## API Configuration

This application primarily uses the **Google Gemini API** (`@google/genai`).
However, if the API quota is exceeded or you prefer another provider, it supports **OpenRouter** as a fallback.

### Using Google Gemini
1. Ensure your `API_KEY` is set in the environment variables (e.g., via `process.env.API_KEY` in the build tool or `.env` file).
2. The app defaults to using this key.

### Using OpenRouter (Fallback)
If the Google API fails (e.g., 429 Too Many Requests), a modal will appear.
1. Sign up at [OpenRouter.ai](https://openrouter.ai/).
2. Create an API Key.
3. Enter the key in the "Quota Exceeded" modal within the app.
4. Click "Use OpenRouter".
5. The app will switch to using OpenRouter (defaulting to `google/gemini-2.0-flash-001` or `openai/gpt-4o-mini`) for subsequent requests.

**Note:** Some advanced features like direct Google Search grounding are simulated or simplified when using the OpenRouter fallback.

---

## Deployment Options

### Deploy to Cloudflare Pages (Recommended for Frontend)

Cloudflare Pages offers free hosting for static sites with generous limits.

#### Method 1: Git Integration (Recommended)

1. Push your code to GitHub/GitLab
2. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Go to **Workers & Pages** > **Create application** > **Pages**
4. Select **Connect to Git** and choose your repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Framework preset:** Vite (auto-detected)
6. Add environment variables:
   - `GEMINI_API_KEY`: Your Google Gemini API key
7. Click **Save and Deploy**

Cloudflare will automatically rebuild on every push.

#### Method 2: Direct Deploy with Wrangler CLI

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist
```

### Cloudflare Workers (If Backend Needed)

If you need a backend API, Cloudflare Workers offers a generous free tier:

**Free Tier Limits:**
- 100,000 requests per day
- 10 ms CPU time per request
- Up to 100 Workers
- D1 (SQL Database) included
- Workers KV (Key-Value Storage) included

**Setup:**
```bash
# Create a new Worker
npm create cloudflare@latest my-api -- --type=api

# Or add to existing project
npm install -D @cloudflare/vite-plugin
```

---

## Free Python Backend Hosting Options

If you need a Python backend instead, here are the best free hosting platforms:

### 1. Render (Recommended)
- **Free Tier:** 750 hours/month, includes PostgreSQL
- **Custom Domain:** Yes (even on free tier)
- **Deployment:** Git-based or Docker
- **URL:** [render.com](https://render.com)

### 2. PythonAnywhere
- **Free Tier:** 512 MB storage, one web app
- **Best For:** Learning/prototyping
- **URL:** [pythonanywhere.com](https://www.pythonanywhere.com)

### 3. Railway
- **Free Tier:** 750 hours/month, includes PostgreSQL
- **Custom Domain:** Yes
- **URL:** [railway.app](https://railway.app)

### 4. Koyeb
- **Free Tier:** 1 service + PostgreSQL database
- **URL:** [koyeb.com](https://www.koyeb.com)

### 5. Google App Engine
- **Free Tier:** Standard environment with limits
- **URL:** [cloud.google.com/appengine](https://cloud.google.com/appengine)

### Quick Comparison

| Platform | Free Database | Custom Domain | Best For |
|----------|--------------|---------------|----------|
| Render | PostgreSQL | Yes | Small web apps |
| PythonAnywhere | No | No | Learning/testing |
| Railway | PostgreSQL | Yes | Full-stack apps |
| Koyeb | PostgreSQL | Yes | Basic web apps |
| Google App Engine | No | Yes | Scalable GCP apps |

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server runs on `http://localhost:5000`.

---

## Project Structure

```
/
├── components/       # React components
├── services/         # API services (Gemini, OpenRouter)
├── utils/            # Utility functions
├── App.tsx           # Main application
├── index.tsx         # Entry point
├── vite.config.ts    # Vite configuration
└── package.json      # Dependencies
```

## License

See [LICENSE](./LICENSE) file.
