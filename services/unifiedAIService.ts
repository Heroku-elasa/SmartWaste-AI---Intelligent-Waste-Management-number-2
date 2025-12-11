import { GoogleGenAI } from '@google/genai';
import { Language } from '../types';

interface AIProvider {
  id: string;
  name: string;
  enabled: boolean;
  priority: number;
  endpoint: string | null;
  model: string | null;
  apiKeyEnvVar: string | null;
  apiKey: string | null;
  requestsPerMinute: number | null;
  requestsPerDay: number | null;
  tokensPerMinute: number | null;
}

interface CallOptions {
  functionName: string;
  prompt: string;
  systemInstruction?: string;
  schema?: any;
  maxTokens?: number;
  temperature?: number;
  useGoogleSearch?: boolean;
  imageData?: { base64: string; mimeType: string };
}

interface CallResult {
  text: string;
  provider: string;
  tokens?: number;
}

const API_BASE = '/api/admin/ai';

class UnifiedAIService {
  private geminiClient: GoogleGenAI | null = null;
  private cachedProviders: AIProvider[] | null = null;
  private lastProviderFetch: number = 0;
  private readonly CACHE_TTL = 60000;

  private getGeminiClient(apiKey: string): GoogleGenAI {
    if (!this.geminiClient) {
      this.geminiClient = new GoogleGenAI({ apiKey });
    }
    return this.geminiClient;
  }

  private async fetchProviders(): Promise<AIProvider[]> {
    const now = Date.now();
    if (this.cachedProviders && now - this.lastProviderFetch < this.CACHE_TTL) {
      return this.cachedProviders;
    }

    try {
      const res = await fetch(`${API_BASE}/providers`);
      if (res.ok) {
        const providers = await res.json();
        this.cachedProviders = providers.filter((p: AIProvider) => p.enabled).sort(
          (a: AIProvider, b: AIProvider) => a.priority - b.priority
        );
        this.lastProviderFetch = now;
        return this.cachedProviders;
      }
    } catch (error) {
      console.warn('Failed to fetch providers from backend, using fallback');
    }

    return [
      {
        id: 'gemini',
        name: 'Google Gemini',
        enabled: true,
        priority: 1,
        apiKeyEnvVar: 'GEMINI_API_KEY',
        endpoint: 'https://generativelanguage.googleapis.com',
        model: 'gemini-2.5-flash',
        apiKey: null,
        requestsPerMinute: 15,
        requestsPerDay: 1500,
        tokensPerMinute: 1000000,
      },
    ];
  }

  private async recordLog(
    providerId: string,
    functionName: string,
    status: 'success' | 'error' | 'fallback',
    durationMs: number,
    tokensUsed: number = 0,
    errorMessage?: string,
    requestPreview?: string,
    responsePreview?: string
  ): Promise<void> {
    try {
      await fetch(`${API_BASE}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerId,
          functionName,
          status,
          durationMs,
          tokensUsed,
          errorMessage,
          requestPreview: requestPreview?.substring(0, 200),
          responsePreview: responsePreview?.substring(0, 200),
        }),
      });
    } catch (error) {
      console.warn('Failed to record log:', error);
    }
  }

  private async recordUsage(providerId: string, tokens: number = 0, isError: boolean = false): Promise<void> {
    try {
      await fetch(`${API_BASE}/usage/increment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId, tokens, isError }),
      });
    } catch (error) {
      console.warn('Failed to record usage:', error);
    }
  }

  private async updateFunctionStats(
    functionName: string,
    providerId: string,
    duration: number,
    success: boolean
  ): Promise<void> {
    try {
      await fetch(`${API_BASE}/function-stats/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ functionName, providerId, duration, success }),
      });
    } catch (error) {
      console.warn('Failed to update function stats:', error);
    }
  }

  private async callGemini(provider: AIProvider, options: CallOptions): Promise<string> {
    const apiKey = provider.apiKey || process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key not configured');
    }

    const ai = this.getGeminiClient(apiKey);

    const parts: any[] = [];
    if (options.imageData) {
      parts.push({
        inlineData: {
          data: options.imageData.base64,
          mimeType: options.imageData.mimeType,
        },
      });
    }
    parts.push({ text: options.prompt });

    const config: any = {};
    if (options.systemInstruction) {
      config.systemInstruction = options.systemInstruction;
    }
    if (options.schema) {
      config.responseMimeType = 'application/json';
      config.responseSchema = options.schema;
    }
    if (options.useGoogleSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: provider.model || 'gemini-2.5-flash',
      contents: { parts },
      config,
    });

    return response.text || '';
  }

  private async callOpenRouter(provider: AIProvider, options: CallOptions): Promise<string> {
    const apiKey = provider.apiKey;
    if (!apiKey) {
      throw new Error('OpenRouter API key not configured');
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'SmartWaste AI',
      'Content-Type': 'application/json',
    };

    const messages: any[] = [];
    if (options.systemInstruction) {
      messages.push({ role: 'system', content: options.systemInstruction });
    }

    let userContent: any;
    if (options.imageData) {
      userContent = [
        { type: 'text', text: options.prompt },
        {
          type: 'image_url',
          image_url: {
            url: `data:${options.imageData.mimeType};base64,${options.imageData.base64}`,
          },
        },
      ];
    } else {
      userContent = options.prompt;
    }
    messages.push({ role: 'user', content: userContent });

    const body: any = {
      model: provider.model || 'google/gemini-2.0-flash-001',
      messages,
    };

    if (options.schema) {
      body.response_format = { type: 'json_object' };
    }

    const response = await fetch(`${provider.endpoint}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `OpenRouter Error ${response.status}: ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private async callCloudflare(provider: AIProvider, options: CallOptions): Promise<string> {
    const apiToken = provider.apiKey;
    if (!apiToken) {
      throw new Error('Cloudflare API key not configured');
    }

    const messages: any[] = [];
    if (options.systemInstruction) {
      messages.push({ role: 'system', content: options.systemInstruction });
    }
    messages.push({ role: 'user', content: options.prompt });

    const accountIdMatch = provider.endpoint?.match(/accounts\/([^\/]+)/);
    const endpoint = provider.endpoint || 'https://api.cloudflare.com/client/v4/accounts';
    const model = provider.model || '@cf/meta/llama-3.2-3b-instruct';

    const response = await fetch(`${endpoint}/ai/run/${model}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`Cloudflare AI Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result?.response || data.result || '';
  }

  private async callOpenAI(provider: AIProvider, options: CallOptions): Promise<string> {
    const apiKey = provider.apiKey;
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const messages: any[] = [];
    if (options.systemInstruction) {
      messages.push({ role: 'system', content: options.systemInstruction });
    }

    let userContent: any;
    if (options.imageData) {
      userContent = [
        { type: 'text', text: options.prompt },
        {
          type: 'image_url',
          image_url: {
            url: `data:${options.imageData.mimeType};base64,${options.imageData.base64}`,
          },
        },
      ];
    } else {
      userContent = options.prompt;
    }
    messages.push({ role: 'user', content: userContent });

    const body: any = {
      model: provider.model || 'gpt-4o-mini',
      messages,
    };

    if (options.schema) {
      body.response_format = { type: 'json_object' };
    }

    const response = await fetch(`${provider.endpoint || 'https://api.openai.com/v1'}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `OpenAI Error ${response.status}: ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private async callProvider(provider: AIProvider, options: CallOptions): Promise<string> {
    switch (provider.id) {
      case 'gemini':
        return this.callGemini(provider, options);
      case 'openrouter':
        return this.callOpenRouter(provider, options);
      case 'cloudflare':
        return this.callCloudflare(provider, options);
      case 'openai':
        return this.callOpenAI(provider, options);
      default:
        if (provider.endpoint?.includes('openrouter')) {
          return this.callOpenRouter(provider, options);
        }
        if (provider.endpoint?.includes('openai')) {
          return this.callOpenAI(provider, options);
        }
        if (provider.endpoint?.includes('cloudflare')) {
          return this.callCloudflare(provider, options);
        }
        throw new Error(`Unknown provider: ${provider.id}`);
    }
  }

  async call(options: CallOptions): Promise<CallResult> {
    const providers = await this.fetchProviders();

    if (providers.length === 0) {
      throw new Error('No AI providers are enabled');
    }

    let lastError: Error | null = null;
    let usedFallback = false;

    for (const provider of providers) {
      const startTime = Date.now();

      try {
        const text = await this.callProvider(provider, options);
        const duration = Date.now() - startTime;

        this.recordUsage(provider.id, 0, false);
        this.recordLog(
          provider.id,
          options.functionName,
          usedFallback ? 'fallback' : 'success',
          duration,
          0,
          undefined,
          options.prompt.substring(0, 100),
          text.substring(0, 100)
        );
        this.updateFunctionStats(options.functionName, provider.id, duration, true);

        return { text, provider: provider.id };
      } catch (error) {
        const duration = Date.now() - startTime;
        const errorMessage = error instanceof Error ? error.message : String(error);

        console.error(`Provider ${provider.name} failed:`, errorMessage);

        this.recordUsage(provider.id, 0, true);
        this.recordLog(
          provider.id,
          options.functionName,
          'error',
          duration,
          0,
          errorMessage,
          options.prompt.substring(0, 100)
        );
        this.updateFunctionStats(options.functionName, provider.id, duration, false);

        lastError = error instanceof Error ? error : new Error(errorMessage);
        usedFallback = true;
      }
    }

    throw lastError || new Error('All AI providers failed');
  }

  async testProvider(providerId: string): Promise<{
    success: boolean;
    responseTime: number;
    error?: string;
  }> {
    const providers = await this.fetchProviders();
    const provider = providers.find((p) => p.id === providerId);
    
    if (!provider) {
      return { success: false, responseTime: 0, error: 'Provider not found' };
    }

    const startTime = Date.now();

    try {
      await this.callProvider(provider, {
        functionName: 'test',
        prompt: 'Say "Hello, this is a test" in exactly 5 words.',
      });

      return {
        success: true,
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      return {
        success: false,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  clearCache(): void {
    this.cachedProviders = null;
    this.lastProviderFetch = 0;
  }
}

export const unifiedAIService = new UnifiedAIService();
export default unifiedAIService;
