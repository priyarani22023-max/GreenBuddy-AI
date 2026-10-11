import { useState, useEffect, useCallback } from 'react';
import { HealthResponse } from '../types/quest';

export function useAIHealth() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/health');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data: HealthResponse = await res.json();
      setHealth(data);
    } catch (err: any) {
      setError(err.message || 'Could not reach backend');
      setHealth({
        status: 'offline',
        backend: false,
        activeProvider: 'builtin',
        ollama: {
          configuredUrl: 'http://127.0.0.1:11434',
          model: 'gemma3:1b',
          reachable: false,
          error: 'Backend unreachable or in offline PWA cache mode',
        },
        hosted: {
          reachable: false,
          error: 'Backend unreachable',
        },
        builtinCount: 24,
        version: '1.0.0-offline',
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
    // Poll every 30 seconds quietly in background
    const timer = setInterval(fetchHealth, 30000);
    return () => clearInterval(timer);
  }, [fetchHealth]);

  return {
    health,
    loading,
    error,
    refreshHealth: fetchHealth,
  };
}
