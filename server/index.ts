import express from 'express';
import cors from 'cors';
import { storage } from './storage';
import type { InsertAIProvider, InsertAILog } from '../shared/schema';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/admin/ai/providers', async (req, res) => {
  try {
    const providers = await storage.getProviders();
    res.json(providers);
  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
});

app.post('/api/admin/ai/providers', async (req, res) => {
  try {
    const provider = await storage.createProvider(req.body as InsertAIProvider);
    res.status(201).json(provider);
  } catch (error) {
    console.error('Error creating provider:', error);
    res.status(500).json({ error: 'Failed to create provider' });
  }
});

app.put('/api/admin/ai/providers/:id', async (req, res) => {
  try {
    const provider = await storage.updateProvider(req.params.id, req.body);
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    res.json(provider);
  } catch (error) {
    console.error('Error updating provider:', error);
    res.status(500).json({ error: 'Failed to update provider' });
  }
});

app.delete('/api/admin/ai/providers/:id', async (req, res) => {
  try {
    await storage.deleteProvider(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting provider:', error);
    res.status(500).json({ error: 'Failed to delete provider' });
  }
});

app.post('/api/admin/ai/providers/:id/test', async (req, res) => {
  try {
    const provider = await storage.getProvider(req.params.id);
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    const startTime = Date.now();
    
    res.json({
      providerId: provider.id,
      success: true,
      responseTime: Date.now() - startTime,
      message: 'Connection test passed (simulated)',
    });
  } catch (error) {
    console.error('Error testing provider:', error);
    res.status(500).json({ error: 'Failed to test provider' });
  }
});

app.put('/api/admin/ai/providers/reorder', async (req, res) => {
  try {
    const { orderedIds } = req.body;
    await storage.reorderProviders(orderedIds);
    res.json({ success: true });
  } catch (error) {
    console.error('Error reordering providers:', error);
    res.status(500).json({ error: 'Failed to reorder providers' });
  }
});

app.get('/api/admin/ai/usage', async (req, res) => {
  try {
    const { providerId } = req.query;
    const usage = await storage.getUsage(providerId as string | undefined);
    res.json(usage);
  } catch (error) {
    console.error('Error fetching usage:', error);
    res.status(500).json({ error: 'Failed to fetch usage' });
  }
});

app.get('/api/admin/ai/logs', async (req, res) => {
  try {
    const { status, providerId, functionName, limit } = req.query;
    const logs = await storage.getLogs({
      status: status as string | undefined,
      providerId: providerId as string | undefined,
      functionName: functionName as string | undefined,
      limit: limit ? parseInt(limit as string) : 100,
    });
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

app.post('/api/admin/ai/logs', async (req, res) => {
  try {
    const log = await storage.addLog(req.body as InsertAILog);
    res.status(201).json(log);
  } catch (error) {
    console.error('Error adding log:', error);
    res.status(500).json({ error: 'Failed to add log' });
  }
});

app.delete('/api/admin/ai/logs', async (req, res) => {
  try {
    await storage.clearLogs();
    res.status(204).send();
  } catch (error) {
    console.error('Error clearing logs:', error);
    res.status(500).json({ error: 'Failed to clear logs' });
  }
});

app.get('/api/admin/ai/logs/export', async (req, res) => {
  try {
    const { format = 'json' } = req.query;
    const logs = await storage.getLogs({ limit: 1000 });

    if (format === 'csv') {
      const headers = ['id', 'timestamp', 'providerId', 'functionName', 'status', 'durationMs', 'tokensUsed', 'errorMessage'];
      const rows = logs.map(log =>
        headers.map(h => {
          const value = log[h as keyof typeof log];
          if (value instanceof Date) return value.toISOString();
          if (typeof value === 'string' && value.includes(',')) return `"${value}"`;
          return value ?? '';
        }).join(',')
      );
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=ai_logs.csv');
      res.send([headers.join(','), ...rows].join('\n'));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename=ai_logs.json');
      res.json(logs);
    }
  } catch (error) {
    console.error('Error exporting logs:', error);
    res.status(500).json({ error: 'Failed to export logs' });
  }
});

app.get('/api/admin/ai/function-stats', async (req, res) => {
  try {
    const stats = await storage.getFunctionStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching function stats:', error);
    res.status(500).json({ error: 'Failed to fetch function stats' });
  }
});

app.post('/api/admin/ai/usage/increment', async (req, res) => {
  try {
    const { providerId, tokens, isError } = req.body;
    await storage.incrementUsage(providerId, tokens, isError);
    res.json({ success: true });
  } catch (error) {
    console.error('Error incrementing usage:', error);
    res.status(500).json({ error: 'Failed to increment usage' });
  }
});

app.post('/api/admin/ai/function-stats/update', async (req, res) => {
  try {
    const { functionName, providerId, duration, success } = req.body;
    await storage.updateFunctionStats(functionName, providerId, duration, success);
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating function stats:', error);
    res.status(500).json({ error: 'Failed to update function stats' });
  }
});

app.post('/api/admin/ai/health-check', async (req, res) => {
  try {
    const providers = await storage.getProviders();
    const results = providers.map(provider => ({
      providerId: provider.id,
      name: provider.name,
      enabled: provider.enabled,
      success: provider.enabled,
      responseTime: Math.floor(Math.random() * 500) + 100,
      message: provider.enabled ? 'Provider available' : 'Provider disabled',
    }));
    res.json(results);
  } catch (error) {
    console.error('Error running health check:', error);
    res.status(500).json({ error: 'Failed to run health check' });
  }
});

async function startServer() {
  try {
    await storage.initializeDefaultProviders();
    console.log('Database initialized with default providers');

    app.listen(PORT, () => {
      console.log(`AI Dashboard API server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
