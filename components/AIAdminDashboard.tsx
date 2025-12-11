import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../types';

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
  createdAt: string | null;
  updatedAt: string | null;
}

interface AILog {
  id: number;
  timestamp: string;
  providerId: string | null;
  functionName: string | null;
  status: string | null;
  durationMs: number | null;
  tokensUsed: number | null;
  errorMessage: string | null;
}

interface AIFunctionStat {
  id: number;
  functionName: string;
  lastCalled: string | null;
  providerUsed: string | null;
  avgResponseTime: number | null;
  callCount: number | null;
  successCount: number | null;
  errorCount: number | null;
}

interface AIUsage {
  id: number;
  providerId: string | null;
  date: string;
  requestsCount: number | null;
  tokensCount: number | null;
  errorsCount: number | null;
}

interface Props {
  setPage: (page: string) => void;
}

const API_BASE = '/api/admin/ai';

const AIAdminDashboard: React.FC<Props> = ({ setPage }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'providers' | 'usage' | 'logs' | 'functions' | 'debug'>('providers');
  const [providers, setProviders] = useState<AIProvider[]>([]);
  const [logs, setLogs] = useState<AILog[]>([]);
  const [functionStats, setFunctionStats] = useState<AIFunctionStat[]>([]);
  const [usage, setUsage] = useState<AIUsage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; responseTime: number; error?: string }>>({});
  const [logFilter, setLogFilter] = useState<{ status?: string; provider?: string }>({});
  const [editingProvider, setEditingProvider] = useState<AIProvider | null>(null);
  const [newApiKey, setNewApiKey] = useState<Record<string, string>>({});

  const fetchProviders = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/providers`);
      if (res.ok) {
        const data = await res.json();
        setProviders(data);
      }
    } catch (err) {
      console.error('Failed to fetch providers:', err);
    }
  }, []);

  const fetchLogs = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (logFilter.status) params.append('status', logFilter.status);
      if (logFilter.provider) params.append('providerId', logFilter.provider);
      params.append('limit', '100');

      const res = await fetch(`${API_BASE}/logs?${params}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    }
  }, [logFilter]);

  const fetchFunctionStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/function-stats`);
      if (res.ok) {
        const data = await res.json();
        setFunctionStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch function stats:', err);
    }
  }, []);

  const fetchUsage = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/usage`);
      if (res.ok) {
        const data = await res.json();
        setUsage(data);
      }
    } catch (err) {
      console.error('Failed to fetch usage:', err);
    }
  }, []);

  useEffect(() => {
    fetchProviders();
    fetchUsage();
  }, [fetchProviders, fetchUsage]);

  useEffect(() => {
    if (activeTab === 'logs') fetchLogs();
    if (activeTab === 'functions') fetchFunctionStats();
  }, [activeTab, fetchLogs, fetchFunctionStats]);

  const toggleProvider = async (id: string, enabled: boolean) => {
    try {
      await fetch(`${API_BASE}/providers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled }),
      });
      fetchProviders();
    } catch (err) {
      setError('Failed to update provider');
    }
  };

  const testProvider = async (id: string) => {
    setTestResults(prev => ({ ...prev, [id]: { success: false, responseTime: 0 } }));
    try {
      const res = await fetch(`${API_BASE}/providers/${id}/test`, { method: 'POST' });
      const data = await res.json();
      setTestResults(prev => ({ ...prev, [id]: data }));
    } catch (err) {
      setTestResults(prev => ({ ...prev, [id]: { success: false, responseTime: 0, error: 'Test failed' } }));
    }
  };

  const testAllProviders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/health-check`, { method: 'POST' });
      const data = await res.json();
      const results: Record<string, { success: boolean; responseTime: number; error?: string }> = {};
      data.forEach((r: any) => {
        results[r.providerId] = { success: r.success, responseTime: r.responseTime, error: r.message };
      });
      setTestResults(results);
    } catch (err) {
      setError('Health check failed');
    } finally {
      setLoading(false);
    }
  };

  const updateApiKey = async (providerId: string) => {
    const apiKey = newApiKey[providerId];
    if (!apiKey) return;

    try {
      await fetch(`${API_BASE}/providers/${providerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });
      setNewApiKey(prev => ({ ...prev, [providerId]: '' }));
      fetchProviders();
    } catch (err) {
      setError('Failed to update API key');
    }
  };

  const clearLogs = async () => {
    if (!confirm('Are you sure you want to clear all logs?')) return;
    try {
      await fetch(`${API_BASE}/logs`, { method: 'DELETE' });
      fetchLogs();
    } catch (err) {
      setError('Failed to clear logs');
    }
  };

  const exportLogs = async (format: 'json' | 'csv') => {
    try {
      const res = await fetch(`${API_BASE}/logs/export?format=${format}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai_logs.${format}`;
      a.click();
    } catch (err) {
      setError('Failed to export logs');
    }
  };

  const getUsageForProvider = (providerId: string): AIUsage | undefined => {
    return usage.find(u => u.providerId === providerId);
  };

  const getUsagePercentage = (provider: AIProvider): number => {
    const providerUsage = getUsageForProvider(provider.id);
    if (!providerUsage || !provider.requestsPerDay) return 0;
    return Math.min(100, ((providerUsage.requestsCount || 0) / provider.requestsPerDay) * 100);
  };

  const formatTime = (date: string | null): string => {
    if (!date) return 'Never';
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hr ago`;
    return d.toLocaleDateString();
  };

  const TabButton: React.FC<{ tab: typeof activeTab; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
        activeTab === tab
          ? 'bg-emerald-600 text-white'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-emerald-400">AI Dashboard</h1>
            <p className="text-gray-400 mt-1">Manage AI providers, monitor usage, and debug issues</p>
          </div>
          <button
            onClick={() => setPage('home')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            {error}
            <button onClick={() => setError(null)} className="ml-4 text-red-400 hover:text-red-300">
              Dismiss
            </button>
          </div>
        )}

        <div className="flex gap-1 mb-0">
          <TabButton tab="providers" label="Providers" />
          <TabButton tab="usage" label="Usage & Limits" />
          <TabButton tab="logs" label="Logs" />
          <TabButton tab="functions" label="Functions" />
          <TabButton tab="debug" label="Debug" />
        </div>

        <div className="bg-gray-800 rounded-b-lg rounded-tr-lg p-6 border border-gray-700">
          {activeTab === 'providers' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">AI Providers</h2>
                <button
                  onClick={testAllProviders}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Testing...' : 'Test All Providers'}
                </button>
              </div>

              <div className="space-y-4">
                {providers.map((provider, index) => (
                  <div
                    key={provider.id}
                    className={`p-4 rounded-lg border ${
                      provider.enabled ? 'bg-gray-700 border-gray-600' : 'bg-gray-800 border-gray-700 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500 font-mono w-6">#{index + 1}</span>
                        <div>
                          <h3 className="font-semibold text-lg">{provider.name}</h3>
                          <p className="text-sm text-gray-400">
                            Model: {provider.model} | Endpoint: {provider.endpoint?.substring(0, 40)}...
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {testResults[provider.id] && (
                          <div className={`text-sm ${testResults[provider.id].success ? 'text-green-400' : 'text-red-400'}`}>
                            {testResults[provider.id].success
                              ? `OK (${testResults[provider.id].responseTime}ms)`
                              : testResults[provider.id].error}
                          </div>
                        )}

                        <button
                          onClick={() => testProvider(provider.id)}
                          className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 rounded transition-colors"
                        >
                          Test
                        </button>

                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={provider.enabled}
                            onChange={(e) => toggleProvider(provider.id, e.target.checked)}
                            className="sr-only"
                          />
                          <div
                            className={`w-11 h-6 rounded-full transition-colors ${
                              provider.enabled ? 'bg-emerald-500' : 'bg-gray-600'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                                provider.enabled ? 'translate-x-5' : 'translate-x-0.5'
                              } mt-0.5`}
                            />
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">API Key</label>
                        <div className="flex gap-2">
                          <input
                            type="password"
                            placeholder={provider.apiKey ? '••••••••' + provider.apiKey.slice(-4) : 'Enter API key'}
                            value={newApiKey[provider.id] || ''}
                            onChange={(e) => setNewApiKey(prev => ({ ...prev, [provider.id]: e.target.value }))}
                            className="flex-1 px-3 py-2 bg-gray-900 border border-gray-600 rounded text-sm"
                          />
                          <button
                            onClick={() => updateApiKey(provider.id)}
                            disabled={!newApiKey[provider.id]}
                            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 rounded text-sm disabled:opacity-50"
                          >
                            Save
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Limits</label>
                        <p className="text-sm">
                          {provider.requestsPerMinute}/min | {provider.requestsPerDay}/day | {provider.tokensPerMinute?.toLocaleString()} tokens/min
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Usage & Limits</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Provider</th>
                      <th className="text-left py-3 px-4">Requests Today</th>
                      <th className="text-left py-3 px-4">Daily Limit</th>
                      <th className="text-left py-3 px-4">Tokens Used</th>
                      <th className="text-left py-3 px-4">Errors</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {providers.map(provider => {
                      const providerUsage = getUsageForProvider(provider.id);
                      const percentage = getUsagePercentage(provider);
                      return (
                        <tr key={provider.id} className="border-b border-gray-700/50">
                          <td className="py-3 px-4 font-medium">{provider.name}</td>
                          <td className="py-3 px-4">{providerUsage?.requestsCount || 0}</td>
                          <td className="py-3 px-4">{provider.requestsPerDay?.toLocaleString()}</td>
                          <td className="py-3 px-4">{(providerUsage?.tokensCount || 0).toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className={providerUsage?.errorsCount ? 'text-red-400' : 'text-gray-400'}>
                              {providerUsage?.errorsCount || 0}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                provider.enabled
                                  ? 'bg-emerald-900 text-emerald-300'
                                  : 'bg-gray-700 text-gray-400'
                              }`}
                            >
                              {provider.enabled ? 'Active' : 'Standby'}
                            </span>
                          </td>
                          <td className="py-3 px-4 w-40">
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  percentage > 95
                                    ? 'bg-red-500'
                                    : percentage > 80
                                    ? 'bg-yellow-500'
                                    : 'bg-emerald-500'
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400">{percentage.toFixed(1)}%</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {providers.some(p => getUsagePercentage(p) > 80) && (
                <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg">
                  <p className="text-yellow-300">
                    Warning: Some providers are approaching their daily limits. Consider enabling backup providers.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'logs' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">AI Logs</h2>
                <div className="flex gap-2">
                  <select
                    value={logFilter.status || ''}
                    onChange={(e) => setLogFilter(prev => ({ ...prev, status: e.target.value || undefined }))}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                  >
                    <option value="">All Status</option>
                    <option value="success">Success</option>
                    <option value="error">Error</option>
                    <option value="fallback">Fallback</option>
                  </select>
                  <select
                    value={logFilter.provider || ''}
                    onChange={(e) => setLogFilter(prev => ({ ...prev, provider: e.target.value || undefined }))}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                  >
                    <option value="">All Providers</option>
                    {providers.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={fetchLogs}
                    className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded"
                  >
                    Refresh
                  </button>
                  <button
                    onClick={() => exportLogs('csv')}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    Export CSV
                  </button>
                  <button
                    onClick={clearLogs}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto font-mono text-sm">
                {logs.length === 0 ? (
                  <p className="text-gray-500">No logs found</p>
                ) : (
                  logs.map(log => (
                    <div
                      key={log.id}
                      className={`py-1 border-b border-gray-800 ${
                        log.status === 'error'
                          ? 'text-red-400'
                          : log.status === 'fallback'
                          ? 'text-yellow-400'
                          : 'text-green-400'
                      }`}
                    >
                      <span className="text-gray-500">
                        [{new Date(log.timestamp).toLocaleString()}]
                      </span>{' '}
                      <span className="text-blue-400">[{log.providerId}]</span>{' '}
                      <span className="text-purple-400">{log.functionName}</span> -{' '}
                      {log.status === 'success' ? (
                        <span>Success ({log.durationMs}ms, {log.tokensUsed} tokens)</span>
                      ) : log.status === 'fallback' ? (
                        <span>Fallback ({log.durationMs}ms)</span>
                      ) : (
                        <span>{log.errorMessage}</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'functions' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">AI Function Registry</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Function Name</th>
                      <th className="text-left py-3 px-4">Last Called</th>
                      <th className="text-left py-3 px-4">Provider Used</th>
                      <th className="text-left py-3 px-4">Avg Response Time</th>
                      <th className="text-left py-3 px-4">Calls</th>
                      <th className="text-left py-3 px-4">Success Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {functionStats.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-500">
                          No function stats yet. Start using AI features to see data here.
                        </td>
                      </tr>
                    ) : (
                      functionStats.map(stat => {
                        const successRate = stat.callCount
                          ? ((stat.successCount || 0) / stat.callCount) * 100
                          : 0;
                        return (
                          <tr key={stat.id} className="border-b border-gray-700/50">
                            <td className="py-3 px-4 font-mono text-emerald-400">{stat.functionName}</td>
                            <td className="py-3 px-4">{formatTime(stat.lastCalled)}</td>
                            <td className="py-3 px-4">{stat.providerUsed || '-'}</td>
                            <td className="py-3 px-4">{stat.avgResponseTime}ms</td>
                            <td className="py-3 px-4">{stat.callCount}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`${
                                  successRate > 90
                                    ? 'text-green-400'
                                    : successRate > 70
                                    ? 'text-yellow-400'
                                    : 'text-red-400'
                                }`}
                              >
                                {successRate.toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'debug' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Debug & Diagnostics</h2>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Health Check</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Test all configured AI providers to verify connectivity and API key validity.
                  </p>
                  <button
                    onClick={testAllProviders}
                    disabled={loading}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Running...' : 'Run Health Check'}
                  </button>

                  {Object.keys(testResults).length > 0 && (
                    <div className="mt-4 space-y-2">
                      {providers.map(p => (
                        testResults[p.id] && (
                          <div
                            key={p.id}
                            className={`p-2 rounded text-sm ${
                              testResults[p.id].success
                                ? 'bg-green-900/30 text-green-300'
                                : 'bg-red-900/30 text-red-300'
                            }`}
                          >
                            {p.name}: {testResults[p.id].success ? 'OK' : 'Failed'}{' '}
                            ({testResults[p.id].responseTime}ms)
                            {testResults[p.id].error && ` - ${testResults[p.id].error}`}
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={fetchProviders}
                      className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-left transition-colors"
                    >
                      Refresh Provider List
                    </button>
                    <button
                      onClick={fetchUsage}
                      className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-left transition-colors"
                    >
                      Refresh Usage Stats
                    </button>
                    <button
                      onClick={() => exportLogs('json')}
                      className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-left transition-colors"
                    >
                      Export All Logs (JSON)
                    </button>
                  </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg col-span-2">
                  <h3 className="font-semibold mb-3">Provider Priority Order</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    When a provider fails, the system automatically falls back to the next provider in this order:
                  </p>
                  <div className="flex gap-2 items-center">
                    {providers
                      .filter(p => p.enabled)
                      .sort((a, b) => a.priority - b.priority)
                      .map((p, i, arr) => (
                        <React.Fragment key={p.id}>
                          <div className="px-4 py-2 bg-emerald-900/50 border border-emerald-700 rounded">
                            <span className="font-medium">{p.name}</span>
                            <span className="text-xs text-gray-400 ml-2">#{p.priority}</span>
                          </div>
                          {i < arr.length - 1 && (
                            <span className="text-gray-500">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    {providers.filter(p => p.enabled).length === 0 && (
                      <p className="text-red-400">No providers enabled!</p>
                    )}
                  </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg col-span-2">
                  <h3 className="font-semibold mb-3">Environment Variables</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Required environment variables for each provider:
                  </p>
                  <div className="grid grid-cols-2 gap-4 font-mono text-sm">
                    {providers.map(p => (
                      <div key={p.id} className="flex items-center gap-2">
                        <span className={p.enabled ? 'text-emerald-400' : 'text-gray-500'}>
                          {p.apiKeyEnvVar}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          p.apiKey ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'
                        }`}>
                          {p.apiKey ? 'Set' : 'Not set'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAdminDashboard;
