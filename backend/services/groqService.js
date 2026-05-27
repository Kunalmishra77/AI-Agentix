// ─── OpenRouter LLM Service ─────────────────────────────────────────────────
// Drop-in replacement for groq-sdk — same exported function names.
// Uses OpenRouter's OpenAI-compatible endpoint with meta-llama/llama-3.3-70b-instruct
import { SYSTEM_PROMPT } from '../voice-agent-config.js';
import { TEXT_SYSTEM_PROMPT } from '../text-agent-config.js';

const OR_URL   = 'https://openrouter.ai/api/v1/chat/completions';
const OR_MODEL = 'meta-llama/llama-3.3-70b-instruct';

function getHeaders() {
  return {
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'HTTP-Referer':  'https://ai-agentix.com',
    'X-Title':       'AI Agentix',
  };
}

async function callOpenRouter(messages, { temperature = 0.5, maxTokens = 300 } = {}) {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }

  const res = await fetch(OR_URL, {
    method:  'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      model:       OR_MODEL,
      messages,
      temperature,
      max_tokens:  maxTokens,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`OpenRouter ${res.status}: ${text}`);
  }

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content?.trim() ?? '';
  if (!reply) throw new Error('Empty response from OpenRouter');
  return reply;
}

// ── Voice agent ──────────────────────────────────────────────────────────────
export async function chatWithGroq(messages) {
  if (!process.env.OPENROUTER_API_KEY) {
    return "I'm sorry, my AI brain is currently disconnected. How else can I help you today?";
  }

  const now     = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toISOString().split('T')[1].substring(0, 5);
  const dateCtx = `Today's date is ${dateStr}. Current UTC time is ${timeStr}. If the user mentions a demo date that is in the past, suggest tomorrow or the day after.`;

  return callOpenRouter(
    [
      { role: 'system', content: `${SYSTEM_PROMPT}\n\n${dateCtx}` },
      ...messages,
    ],
    { temperature: 0.45, maxTokens: 200 }
  );
}

// ── Text chat agent ──────────────────────────────────────────────────────────
export async function chatWithGroqText(messages) {
  if (!process.env.OPENROUTER_API_KEY) {
    return 'The text agent is currently unavailable because the OpenRouter API key is missing.';
  }

  return callOpenRouter(
    [
      { role: 'system', content: TEXT_SYSTEM_PROMPT },
      ...messages,
    ],
    { temperature: 0.6, maxTokens: 500 }
  );
}
