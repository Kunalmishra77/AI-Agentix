import { Router } from 'express';
import { queryOne } from '../config/database.js';

const router = Router();

router.post('/subscribe', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: { message: 'Email required' } });
    await queryOne(
      'INSERT INTO subscribers (email) VALUES ($1) ON CONFLICT (email) DO UPDATE SET is_active = true RETURNING id',
      [email.toLowerCase()]
    );
    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (e) { next(e); }
});

export default router;
