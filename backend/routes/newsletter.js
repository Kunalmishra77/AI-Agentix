import { Router } from 'express';
import { randomUUID } from 'crypto';
import { query } from '../config/database.js';

const router = Router();

router.post('/subscribe', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: { message: 'Email required' } });
    const id = randomUUID();
    await query(
      'INSERT INTO subscribers (id, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE is_active = 1',
      [id, email.toLowerCase()]
    );
    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (e) { next(e); }
});

export default router;
