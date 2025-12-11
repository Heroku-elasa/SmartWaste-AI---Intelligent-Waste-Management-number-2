export interface AIProviderLimits {
  requestsPerMinute: number;
  requestsPerDay: number;
  tokensPerMinute: number;
}

export interface AIProviderUsage {
  requestsToday: number;
  tokensToday: number;
  lastUsed: Date | null;
  lastError: string | null;
  errorsToday: number;
}

export interface AIProvider {
  id: string;
  name: string;
  enabled: boolean;
  priority: number;
  apiKeyEnvVar: string;
  endpoint: string;
  model: string;
  limits: AIProviderLimits;
  usage: AIProviderUsage;
  apiKey?: string;
}

export interface AILog {
  id: string;
  timestamp: Date;
  provider: string;
  function: string;
  status: 'success' | 'error' | 'fallback';
  duration: number;
  tokens: number;
  error?: string;
  requestPreview?: string;
  responsePreview?: string;
}

export interface FallbackConfig {
  maxTokens: number;
  temperature: number;
  providers?: AIProvider[];
}

export interface AIFunctionStats {
  name: string;
  lastCalled: Date | null;
  providerUsed: string | null;
  avgResponseTime: number;
  callCount: number;
  successCount: number;
  errorCount: number;
}

export interface AIProviderTestResult {
  providerId: string;
  success: boolean;
  responseTime: number;
  error?: string;
}

export const DEFAULT_PROVIDERS: AIProvider[] = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    enabled: true,
    priority: 1,
    apiKeyEnvVar: 'GEMINI_API_KEY',
    endpoint: 'https://generativelanguage.googleapis.com',
    model: 'gemini-2.5-flash',
    limits: {
      requestsPerMinute: 15,
      requestsPerDay: 1500,
      tokensPerMinute: 1000000,
    },
    usage: {
      requestsToday: 0,
      tokensToday: 0,
      lastUsed: null,
      lastError: null,
      errorsToday: 0,
    },
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    enabled: true,
    priority: 2,
    apiKeyEnvVar: 'OPENROUTER_API_KEY',
    endpoint: 'https://openrouter.ai/api/v1',
    model: 'google/gemini-2.0-flash-001',
    limits: {
      requestsPerMinute: 20,
      requestsPerDay: 1000,
      tokensPerMinute: 500000,
    },
    usage: {
      requestsToday: 0,
      tokensToday: 0,
      lastUsed: null,
      lastError: null,
      errorsToday: 0,
    },
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Workers AI',
    enabled: false,
    priority: 3,
    apiKeyEnvVar: 'CLOUDFLARE_API_TOKEN',
    endpoint: 'https://api.cloudflare.com/client/v4/accounts',
    model: '@cf/meta/llama-3.2-3b-instruct',
    limits: {
      requestsPerMinute: 50,
      requestsPerDay: 10000,
      tokensPerMinute: 100000,
    },
    usage: {
      requestsToday: 0,
      tokensToday: 0,
      lastUsed: null,
      lastError: null,
      errorsToday: 0,
    },
  },
  {
    id: 'openai',
    name: 'OpenAI',
    enabled: false,
    priority: 4,
    apiKeyEnvVar: 'OPENAI_API_KEY',
    endpoint: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini',
    limits: {
      requestsPerMinute: 60,
      requestsPerDay: 10000,
      tokensPerMinute: 150000,
    },
    usage: {
      requestsToday: 0,
      tokensToday: 0,
      lastUsed: null,
      lastError: null,
      errorsToday: 0,
    },
  },
];
