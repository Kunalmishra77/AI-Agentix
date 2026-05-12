// ─── Groq LLM Service ──────────────────────────────────────────────────────
import Groq from 'groq-sdk';
import { SYSTEM_PROMPT } from '../voice-agent-config.js';
import { TEXT_SYSTEM_PROMPT } from '../text-agent-config.js';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Send a multi-turn conversation to Groq and return the assistant's reply.
 * @param {Array<{role: string, content: string}>} messages - conversation history
 * @returns {Promise<string>} assistant message
 */
export async function chatWithGroq(messages) {
  const now = new Date();
  // Use ISO format — works on every Node.js build regardless of ICU/locale support
  const dateStr = now.toISOString().split('T')[0]; // e.g. 2026-05-12
  const timeStr = now.toISOString().split('T')[1].substring(0, 5); // e.g. 15:35 UTC
  const dateCtx = `Today's date is ${dateStr} (YYYY-MM-DD). Current UTC time is ${timeStr}. If the user mentions a demo date or time that is already in the past, tell them that slot has passed and suggest booking for tomorrow or the day after instead.`;

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: `${SYSTEM_PROMPT}\n\n${dateCtx}` },
      ...messages,
    ],
    temperature: 0.45,
    max_tokens: 120,
    stream: false,
  });

  const reply = completion.choices?.[0]?.message?.content ?? '';
  if (!reply) throw new Error('Empty response from Groq');
  return reply;
}

/**
 * Send a multi-turn conversation to Groq and return the assistant's reply for text chat.
 * @param {Array<{role: string, content: string}>} messages - conversation history
 * @returns {Promise<string>} assistant message
 */
export async function chatWithGroqText(messages) {
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: TEXT_SYSTEM_PROMPT },
      ...messages,
    ],
    temperature: 0.6,
    max_tokens: 500, // allow longer responses for text
    stream: false,
  });

  const reply = completion.choices?.[0]?.message?.content ?? '';
  if (!reply) throw new Error('Empty response from Groq');
  return reply;
}

