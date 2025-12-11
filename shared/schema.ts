import { pgTable, text, integer, boolean, timestamp, serial, date, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const aiProviders = pgTable('ai_providers', {
  id: varchar('id', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  enabled: boolean('enabled').default(true).notNull(),
  priority: integer('priority').default(0).notNull(),
  endpoint: varchar('endpoint', { length: 255 }),
  model: varchar('model', { length: 100 }),
  apiKeyEnvVar: varchar('api_key_env_var', { length: 100 }),
  apiKey: text('api_key'),
  requestsPerMinute: integer('requests_per_minute').default(15),
  requestsPerDay: integer('requests_per_day').default(1500),
  tokensPerMinute: integer('tokens_per_minute').default(1000000),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const aiUsage = pgTable('ai_usage', {
  id: serial('id').primaryKey(),
  providerId: varchar('provider_id', { length: 50 }).references(() => aiProviders.id),
  date: date('date').defaultNow().notNull(),
  requestsCount: integer('requests_count').default(0),
  tokensCount: integer('tokens_count').default(0),
  errorsCount: integer('errors_count').default(0),
});

export const aiLogs = pgTable('ai_logs', {
  id: serial('id').primaryKey(),
  timestamp: timestamp('timestamp').defaultNow(),
  providerId: varchar('provider_id', { length: 50 }),
  functionName: varchar('function_name', { length: 100 }),
  status: varchar('status', { length: 20 }),
  durationMs: integer('duration_ms'),
  tokensUsed: integer('tokens_used'),
  errorMessage: text('error_message'),
  requestPreview: text('request_preview'),
  responsePreview: text('response_preview'),
});

export const aiFunctionStats = pgTable('ai_function_stats', {
  id: serial('id').primaryKey(),
  functionName: varchar('function_name', { length: 100 }).notNull().unique(),
  lastCalled: timestamp('last_called'),
  providerUsed: varchar('provider_used', { length: 50 }),
  avgResponseTime: integer('avg_response_time').default(0),
  callCount: integer('call_count').default(0),
  successCount: integer('success_count').default(0),
  errorCount: integer('error_count').default(0),
});

export const aiProvidersRelations = relations(aiProviders, ({ many }) => ({
  usage: many(aiUsage),
  logs: many(aiLogs),
}));

export const aiUsageRelations = relations(aiUsage, ({ one }) => ({
  provider: one(aiProviders, {
    fields: [aiUsage.providerId],
    references: [aiProviders.id],
  }),
}));

export type AIProvider = typeof aiProviders.$inferSelect;
export type InsertAIProvider = typeof aiProviders.$inferInsert;
export type AIUsage = typeof aiUsage.$inferSelect;
export type InsertAIUsage = typeof aiUsage.$inferInsert;
export type AILog = typeof aiLogs.$inferSelect;
export type InsertAILog = typeof aiLogs.$inferInsert;
export type AIFunctionStat = typeof aiFunctionStats.$inferSelect;
export type InsertAIFunctionStat = typeof aiFunctionStats.$inferInsert;
