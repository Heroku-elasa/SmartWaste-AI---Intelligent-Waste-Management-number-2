# GreenPars SmartWaste — پارس گرانول سبز

A trilingual (فارسی / English / Türkçe) planning dashboard for a **plastic-waste → recycled-granule** business in Iran, with a **waste-to-energy (WtE) / RDF** extension and a sponsor-equity assessment.

## Features
- **Profit calculator**: pilot 400 kg/h or 1000 kg/h plant; granule and waste price sliders; 5-year P&L including depreciation and 25% tax; payback; 4 scenarios.
- **Three scopes**: 10 cities / half / all cities (capex, profit, payback, jobs).
- **Funding**: 31 bn Toman pilot mix (founders, Pendar Polymer instalments, Environment Fund, crowdfunding) and use of funds.
- **WtE & sponsor**: SATBA tariffs, WtE calculator (MW, capex/MW, gate fee), pros and risks, proposed SPV share structure. See `docs/20_WtE_Sponsor_Assessment.md`.
- **Reports & podcast**: PDF reports and 3-minute podcasts in fa/en/tr (`public/`).
- Every amount is shown in Toman and USD at the free-market rate (`RATE` in `src/model.ts`).

## Run
```bash
npm install
npm run dev      # http://localhost:5000
npm test         # checks the model against the business plan (5.3 yrs base, 2.1 target, pessimistic = never)
npm run build
```
No API key is required.

## Structure
- `src/model.ts`: the single financial model (edit prices, rate and tariffs here).
- `src/i18n.ts`: fa/en/tr strings and the WtE assessment text.
- `src/App.tsx`: pages.
- `legacy/`: the previous SmartWaste-AI code (Gemini/Express). It is excluded from the build and kept for reference. Unrelated modules (dating, barista, doctor, etc.) were removed.

## AI chatbot
The 💬 button opens the GreenPars assistant (fa/en/tr).
- **Offline mode (default):** a rule-based bot (`src/localbot.ts`) answers from the financial model, e.g. "granule 110000 waste 35000", funding, 10 cities, risks, WtE. No key is needed.
- **AI mode:** `server/chat.mjs` is a dependency-free proxy for any OpenAI-compatible API. The key stays on the server.
  ```bash
  cp .env.example .env   # set AI_BASE_URL / AI_API_KEY / AI_MODEL
  npm run api            # :3001; Vite proxies /api to it
  npm run dev
  ```
  Recommended models for Persian:
  - `qwen/qwen-2.5-72b-instruct` or `deepseek-chat` (cheap, good Persian).
  - Local Ollama `qwen2.5:7b`: no key, works inside Iran, no sanctions or payment issues.
  - Gemini and OpenAI block Iranian IPs and cards, so avoid them for production in Iran.

## 🌐 Live deployments
| Where | URL |
|---|---|
| Cloudflare Pages (dashboard + RAG API) | https://greenpars-smartwaste.pages.dev |
| Hugging Face Space (static dashboard) | https://huggingface.co/spaces/sosa123454321/GreenPars-SmartWaste |
| HF dataset (RAG knowledge, 130 chunks) | https://huggingface.co/datasets/sosa123454321/greenpars-knowledge |

## 🧠 RAG architecture
`knowledge/*.md` (60 trilingual reports) → `npm run kb` → `kb/chunks.json` → IDF retriever (`kb/rag.mjs`, zero deps) → top-4 passages + system prompt → **Qwen2.5-72B-Instruct** via Hugging Face router (OpenAI-compatible) → answer with 📚 sources.
Same code runs in `server/chat.mjs` (Node/VPS), `functions/api/chat.js` (Cloudflare Pages Function, secret `HF_TOKEN`) and `hf-space/app.py` (Gradio version, for a PRO/GPU Space).
Deploy: `npm run build && npx wrangler pages deploy dist --project-name greenpars-smartwaste`.

## 🔗 Related open-source projects used as references
| Project | What we took |
|---|---|
| Heroku-elasa/SmartWaste-AI (origin) | base Vite+React app; legacy code in `legacy/` |
| joelparkerhenderson/pitch-deck | pitch structure (Kawasaki, 500 Startups, Thiel 7 questions) |
| sarahdoingthing/Awesome-Decks, KrishMunot/awesome-startup | investor deck examples |
| huggingface/huggingface_hub, gradio-app/gradio | inference client and Space UI |
| cloudflare/workers-sdk (wrangler) | Pages Functions deployment |
| recharts/recharts | charts |
See `knowledge/github_lessons_fa.md` for the lessons applied to the plan.

## 🤖 Telegram bot
`functions/api/telegram.js` is a Cloudflare webhook with a trilingual menu (invest, calculator, reports and pitch decks as files, video, WtE), `/calc 110000 35000`, and RAG AI answers.
Setup:
1. Create a bot with @BotFather.
2. Run `npx wrangler pages secret put TELEGRAM_BOT_TOKEN`.
3. Open `https://greenpars-smartwaste.pages.dev/api/telegram?setup=<TELEGRAM_SECRET>`.

## 🎬 Videos
There are FA/EN/TR 30-second promos in `public/video/`, as MP4 (faststart) and WebM. `functions/video/[[path]].js` adds HTTP Range (206) support, which Safari/iOS needs.
