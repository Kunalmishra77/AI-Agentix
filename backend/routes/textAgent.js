import { Router } from 'express';
import { chatWithGroqText } from '../services/groqService.js';

const router = Router();

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ success: false, error: 'Messages array required' });
    }

    const reply = await chatWithGroqText(messages);
    return res.json({ success: true, message: reply });
  } catch (err) {
    console.error('[text-agent/chat]', err.message);
    return res.status(500).json({
      success: false,
      error: { message: 'Text assistant is temporarily unavailable. Please try again.' },
    });
  }
});

export default router;
