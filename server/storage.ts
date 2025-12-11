import { db } from './db';
import { aiProviders, aiUsage, aiLogs, aiFunctionStats } from '../shared/schema';
import type { AIProvider, InsertAIProvider, AILog, InsertAILog, AIUsage, AIFunctionStat } from '../shared/schema';
import { eq, desc, and, sql } from 'drizzle-orm';

const DEFAULT_PROVIDERS: InsertAIProvider[] = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    enabled: true,
    priority: 1,
    apiKeyEnvVar: 'GEMINI_API_KEY',
    endpoint: 'https://generativelanguage.googleapis.com',
    model: 'gemini-2.5-flash',
    requestsPerMinute: 15,
    requestsPerDay: 1500,
    tokensPerMinute: 1000000,
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    enabled: true,
    priority: 2,
    apiKeyEnvVar: 'OPENROUTER_API_KEY',
    endpoint: 'https://openrouter.ai/api/v1',
    model: 'google/gemini-2.0-flash-001',
    requestsPerMinute: 20,
    requestsPerDay: 1000,
    tokensPerMinute: 500000,
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Workers AI',
    enabled: false,
    priority: 3,
    apiKeyEnvVar: 'CLOUDFLARE_API_TOKEN',
    endpoint: 'https://api.cloudflare.com/client/v4/accounts',
    model: '@cf/meta/llama-3.2-3b-instruct',
    requestsPerMinute: 50,
    requestsPerDay: 10000,
    tokensPerMinute: 100000,
  },
  {
    id: 'openai',
    name: 'OpenAI',
    enabled: false,
    priority: 4,
    apiKeyEnvVar: 'OPENAI_API_KEY',
    endpoint: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini',
    requestsPerMinute: 60,
    requestsPerDay: 10000,
    tokensPerMinute: 150000,
  },
];

export class DatabaseStorage {
  async initializeDefaultProviders(): Promise<void> {
    const existingProviders = await db.select().from(aiProviders);
    if (existingProviders.length === 0) {
      for (const provider of DEFAULT_PROVIDERS) {
        await db.insert(aiProviders).values(provider).onConflictDoNothing();
      }
    }
  }

  async getProviders(): Promise<AIProvider[]> {
    return db.select().from(aiProviders).orderBy(aiProviders.priority);
  }

  async getProvider(id: string): Promise<AIProvider | undefined> {
    const [provider] = await db.select().from(aiProviders).where(eq(aiProviders.id, id));
    return provider;
  }

  async createProvider(provider: InsertAIProvider): Promise<AIProvider> {
    const [created] = await db.insert(aiProviders).values(provider).returning();
    return created;
  }

  async updateProvider(id: string, updates: Partial<InsertAIProvider>): Promise<AIProvider | undefined> {
    const [updated] = await db
      .update(aiProviders)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(aiProviders.id, id))
      .returning();
    return updated;
  }

  async deleteProvider(id: string): Promise<boolean> {
    const result = await db.delete(aiProviders).where(eq(aiProviders.id, id));
    return true;
  }

  async reorderProviders(orderedIds: string[]): Promise<void> {
    for (let i = 0; i < orderedIds.length; i++) {
      await db
        .update(aiProviders)
        .set({ priority: i + 1, updatedAt: new Date() })
        .where(eq(aiProviders.id, orderedIds[i]));
    }
  }

  async getUsage(providerId?: string): Promise<AIUsage[]> {
    if (providerId) {
      return db.select().from(aiUsage).where(eq(aiUsage.providerId, providerId));
    }
    return db.select().from(aiUsage);
  }

  async getTodayUsage(providerId: string): Promise<AIUsage | undefined> {
    const today = new Date().toISOString().split('T')[0];
    const [usage] = await db
      .select()
      .from(aiUsage)
      .where(and(eq(aiUsage.providerId, providerId), sql`date(${aiUsage.date}) = ${today}`));
    return usage;
  }

  async incrementUsage(providerId: string, tokens: number = 0, isError: boolean = false): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    const existing = await this.getTodayUsage(providerId);

    if (existing) {
      await db
        .update(aiUsage)
        .set({
          requestsCount: sql`${aiUsage.requestsCount} + 1`,
          tokensCount: sql`${aiUsage.tokensCount} + ${tokens}`,
          errorsCount: isError ? sql`${aiUsage.errorsCount} + 1` : aiUsage.errorsCount,
        })
        .where(eq(aiUsage.id, existing.id));
    } else {
      await db.insert(aiUsage).values({
        providerId,
        requestsCount: 1,
        tokensCount: tokens,
        errorsCount: isError ? 1 : 0,
      });
    }
  }

  async getLogs(filters?: {
    status?: string;
    providerId?: string;
    functionName?: string;
    limit?: number;
  }): Promise<AILog[]> {
    let query = db.select().from(aiLogs);

    const conditions = [];
    if (filters?.status) {
      conditions.push(eq(aiLogs.status, filters.status));
    }
    if (filters?.providerId) {
      conditions.push(eq(aiLogs.providerId, filters.providerId));
    }
    if (filters?.functionName) {
      conditions.push(eq(aiLogs.functionName, filters.functionName));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as typeof query;
    }

    query = query.orderBy(desc(aiLogs.timestamp)) as typeof query;

    if (filters?.limit) {
      query = query.limit(filters.limit) as typeof query;
    }

    return query;
  }

  async addLog(log: InsertAILog): Promise<AILog> {
    const [created] = await db.insert(aiLogs).values(log).returning();
    return created;
  }

  async clearLogs(): Promise<void> {
    await db.delete(aiLogs);
  }

  async getFunctionStats(): Promise<AIFunctionStat[]> {
    return db.select().from(aiFunctionStats);
  }

  async updateFunctionStats(
    functionName: string,
    providerId: string,
    duration: number,
    success: boolean
  ): Promise<void> {
    const [existing] = await db
      .select()
      .from(aiFunctionStats)
      .where(eq(aiFunctionStats.functionName, functionName));

    if (existing) {
      const newCallCount = existing.callCount! + 1;
      const newAvgTime = Math.round(
        (existing.avgResponseTime! * existing.callCount! + duration) / newCallCount
      );

      await db
        .update(aiFunctionStats)
        .set({
          lastCalled: new Date(),
          providerUsed: providerId,
          avgResponseTime: newAvgTime,
          callCount: newCallCount,
          successCount: success ? existing.successCount! + 1 : existing.successCount,
          errorCount: success ? existing.errorCount : existing.errorCount! + 1,
        })
        .where(eq(aiFunctionStats.functionName, functionName));
    } else {
      await db.insert(aiFunctionStats).values({
        functionName,
        lastCalled: new Date(),
        providerUsed: providerId,
        avgResponseTime: duration,
        callCount: 1,
        successCount: success ? 1 : 0,
        errorCount: success ? 0 : 1,
      });
    }
  }

  async resetDailyUsage(): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    await db.delete(aiUsage).where(sql`date(${aiUsage.date}) < ${today}`);
  }
}

export const storage = new DatabaseStorage();
