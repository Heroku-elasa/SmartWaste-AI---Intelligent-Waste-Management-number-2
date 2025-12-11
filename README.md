
# EcoRide Smart Waste Management Platform

This is a comprehensive AI-powered waste management application.

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
