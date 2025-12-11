import { AIProvider, AILog, AIFunctionStats, DEFAULT_PROVIDERS } from '../types/aiProvider';

const STORAGE_KEY = 'ai_providers_config';
const LOGS_STORAGE_KEY = 'ai_logs';
const STATS_STORAGE_KEY = 'ai_function_stats';
const MAX_LOGS = 500;

class AIProviderManager {
  private providers: AIProvider[] = [];
  private logs: AILog[] = [];
  private functionStats: Map<string, AIFunctionStats> = new Map();
  private apiKeys: Map<string, string> = new Map();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.providers = parsed.map((p: AIProvider) => ({
          ...p,
          usage: {
            ...p.usage,
            lastUsed: p.usage.lastUsed ? new Date(p.usage.lastUsed) : null,
          },
        }));
      } else {
        this.providers = [...DEFAULT_PROVIDERS];
        this.saveToStorage();
      }

      const logsStored = localStorage.getItem(LOGS_STORAGE_KEY);
      if (logsStored) {
        this.logs = JSON.parse(logsStored).map((log: AILog) => ({
          ...log,
          timestamp: new Date(log.timestamp),
        }));
      }

      const statsStored = localStorage.getItem(STATS_STORAGE_KEY);
      if (statsStored) {
        const stats = JSON.parse(statsStored);
        Object.entries(stats).forEach(([key, value]: [string, any]) => {
          this.functionStats.set(key, {
            ...value,
            lastCalled: value.lastCalled ? new Date(value.lastCalled) : null,
          });
        });
      }
    } catch (error) {
      console.error('Failed to load AI provider config:', error);
      this.providers = [...DEFAULT_PROVIDERS];
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.providers));
    } catch (error) {
      console.error('Failed to save AI provider config:', error);
    }
  }

  private saveLogs(): void {
    try {
      const logsToSave = this.logs.slice(-MAX_LOGS);
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logsToSave));
    } catch (error) {
      console.error('Failed to save AI logs:', error);
    }
  }

  private saveStats(): void {
    try {
      const statsObj: Record<string, AIFunctionStats> = {};
      this.functionStats.forEach((value, key) => {
        statsObj[key] = value;
      });
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(statsObj));
    } catch (error) {
      console.error('Failed to save AI stats:', error);
    }
  }

  getProviders(): AIProvider[] {
    return [...this.providers].sort((a, b) => a.priority - b.priority);
  }

  getEnabledProviders(): AIProvider[] {
    return this.getProviders().filter((p) => p.enabled);
  }

  getProvider(id: string): AIProvider | undefined {
    return this.providers.find((p) => p.id === id);
  }

  updateProvider(id: string, updates: Partial<AIProvider>): void {
    const index = this.providers.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.providers[index] = { ...this.providers[index], ...updates };
      this.saveToStorage();
    }
  }

  setProviderEnabled(id: string, enabled: boolean): void {
    this.updateProvider(id, { enabled });
  }

  reorderProviders(orderedIds: string[]): void {
    orderedIds.forEach((id, index) => {
      const provider = this.providers.find((p) => p.id === id);
      if (provider) {
        provider.priority = index + 1;
      }
    });
    this.saveToStorage();
  }

  setApiKey(providerId: string, apiKey: string): void {
    this.apiKeys.set(providerId, apiKey);
    const provider = this.providers.find((p) => p.id === providerId);
    if (provider) {
      provider.apiKey = apiKey;
      this.saveToStorage();
    }
  }

  getApiKey(providerId: string): string | undefined {
    const provider = this.providers.find((p) => p.id === providerId);
    if (provider?.apiKey) {
      return provider.apiKey;
    }
    return this.apiKeys.get(providerId);
  }

  addProvider(provider: Omit<AIProvider, 'usage'>): void {
    const newProvider: AIProvider = {
      ...provider,
      usage: {
        requestsToday: 0,
        tokensToday: 0,
        lastUsed: null,
        lastError: null,
        errorsToday: 0,
      },
    };
    this.providers.push(newProvider);
    this.saveToStorage();
  }

  removeProvider(id: string): void {
    this.providers = this.providers.filter((p) => p.id !== id);
    this.saveToStorage();
  }

  recordUsage(providerId: string, tokens: number = 0): void {
    const provider = this.providers.find((p) => p.id === providerId);
    if (provider) {
      provider.usage.requestsToday++;
      provider.usage.tokensToday += tokens;
      provider.usage.lastUsed = new Date();
      this.saveToStorage();
    }
  }

  recordError(providerId: string, error: string): void {
    const provider = this.providers.find((p) => p.id === providerId);
    if (provider) {
      provider.usage.lastError = error;
      provider.usage.errorsToday++;
      this.saveToStorage();
    }
  }

  isWithinLimits(providerId: string): boolean {
    const provider = this.providers.find((p) => p.id === providerId);
    if (!provider) return false;
    return provider.usage.requestsToday < provider.limits.requestsPerDay;
  }

  getUsagePercentage(providerId: string): number {
    const provider = this.providers.find((p) => p.id === providerId);
    if (!provider) return 0;
    return Math.min(100, (provider.usage.requestsToday / provider.limits.requestsPerDay) * 100);
  }

  addLog(log: Omit<AILog, 'id' | 'timestamp'>): void {
    const newLog: AILog = {
      ...log,
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };
    this.logs.push(newLog);
    if (this.logs.length > MAX_LOGS) {
      this.logs = this.logs.slice(-MAX_LOGS);
    }
    this.saveLogs();
  }

  getLogs(filters?: {
    status?: 'success' | 'error' | 'fallback';
    provider?: string;
    function?: string;
    limit?: number;
  }): AILog[] {
    let filtered = [...this.logs];

    if (filters?.status) {
      filtered = filtered.filter((l) => l.status === filters.status);
    }
    if (filters?.provider) {
      filtered = filtered.filter((l) => l.provider === filters.provider);
    }
    if (filters?.function) {
      filtered = filtered.filter((l) => l.function === filters.function);
    }

    filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    if (filters?.limit) {
      filtered = filtered.slice(0, filters.limit);
    }

    return filtered;
  }

  clearLogs(): void {
    this.logs = [];
    this.saveLogs();
  }

  exportLogs(format: 'json' | 'csv' = 'json'): string {
    if (format === 'json') {
      return JSON.stringify(this.logs, null, 2);
    }

    const headers = ['id', 'timestamp', 'provider', 'function', 'status', 'duration', 'tokens', 'error'];
    const rows = this.logs.map((log) =>
      headers.map((h) => {
        const value = log[h as keyof AILog];
        if (value instanceof Date) return value.toISOString();
        if (typeof value === 'string' && value.includes(',')) return `"${value}"`;
        return value ?? '';
      }).join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  }

  updateFunctionStats(
    functionName: string,
    providerId: string,
    duration: number,
    success: boolean
  ): void {
    const existing = this.functionStats.get(functionName) || {
      name: functionName,
      lastCalled: null,
      providerUsed: null,
      avgResponseTime: 0,
      callCount: 0,
      successCount: 0,
      errorCount: 0,
    };

    const newCallCount = existing.callCount + 1;
    const newAvgTime =
      (existing.avgResponseTime * existing.callCount + duration) / newCallCount;

    this.functionStats.set(functionName, {
      ...existing,
      lastCalled: new Date(),
      providerUsed: providerId,
      avgResponseTime: Math.round(newAvgTime),
      callCount: newCallCount,
      successCount: success ? existing.successCount + 1 : existing.successCount,
      errorCount: success ? existing.errorCount : existing.errorCount + 1,
    });

    this.saveStats();
  }

  getFunctionStats(): AIFunctionStats[] {
    return Array.from(this.functionStats.values());
  }

  resetDailyUsage(): void {
    this.providers.forEach((p) => {
      p.usage.requestsToday = 0;
      p.usage.tokensToday = 0;
      p.usage.errorsToday = 0;
    });
    this.saveToStorage();
  }

  resetAllData(): void {
    this.providers = [...DEFAULT_PROVIDERS];
    this.logs = [];
    this.functionStats.clear();
    this.apiKeys.clear();
    this.saveToStorage();
    this.saveLogs();
    this.saveStats();
  }
}

export const aiProviderManager = new AIProviderManager();
export default aiProviderManager;
