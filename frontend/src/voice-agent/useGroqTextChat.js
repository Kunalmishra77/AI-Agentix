import { useCallback, useRef } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function useGroqTextChat() {
  const historyRef = useRef([]);

  const resetHistory = useCallback(() => {
    historyRef.current = [];
  }, []);

  const sendMessage = useCallback(async (userMessage) => {
    historyRef.current.push({ role: 'user', content: userMessage });

    const response = await fetch(`${API_BASE}/api/v1/text-agent/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: historyRef.current }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || 'Assistant unavailable.');
    }

    const data = await response.json();
    const assistantMessage = data.message;
    historyRef.current.push({ role: 'assistant', content: assistantMessage });

    // Keep last 30 turns for text chat
    if (historyRef.current.length > 30) {
      historyRef.current = historyRef.current.slice(-30);
    }

    return assistantMessage;
  }, []);

  return { sendMessage, resetHistory, history: historyRef };
}
