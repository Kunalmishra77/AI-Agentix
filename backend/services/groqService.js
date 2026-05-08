// ─── Groq LLM Service ──────────────────────────────────────────────────────
import Groq from 'groq-sdk';
import { SYSTEM_PROMPT } from '../voice-agent-config.js';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Send a multi-turn conversation to Groq and return the assistant's reply.
 * @param {Array<{role: string, content: string}>} messages - conversation history
 * @returns {Promise<string>} assistant message
 */
export async function chatWithGroq(messages) {
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',  // current Groq recommended model (May 2025)
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ],
    temperature: 0.5,
    max_tokens: 300,             // keep responses short for voice
    stream: false,
  });

  const reply = completion.choices?.[0]?.message?.content ?? '';
  if (!reply) throw new Error('Empty response from Groq');
  return reply;
}
