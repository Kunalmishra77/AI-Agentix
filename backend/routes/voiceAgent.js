// ─── Voice Agent Chat Route ────────────────────────────────────────────────
// POST /api/v1/voice-agent/chat
// Receives conversation history, sends to Groq, returns assistant reply.

import { Router } from 'express';
import { chatWithGroq } from '../services/groqService.js';

const router = Router();

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        error: { message: 'messages array is required' },
      });
    }

    // Validate each message
    const valid = messages.every(
      (m) => m && typeof m.role === 'string' && typeof m.content === 'string'
    );
    if (!valid) {
      return res.status(400).json({
        success: false,
        error: { message: 'Each message must have role and content strings' },
      });
    }

    // Cap history to last 20 turns to prevent abuse
    const trimmed = messages.slice(-20);

    const reply = await chatWithGroq(trimmed);

    return res.json({ success: true, message: reply });
  } catch (err) {
    console.error('[voice-agent/chat]', err.message);
    return res.status(500).json({
      success: false,
      error: { message: 'Voice advisor is temporarily unavailable. Please try again.' },
    });
  }
});

export default router;
