import { Router } from 'express';
import { randomUUID } from 'crypto';
import { query, insertOne, toCamel, toCamelAll } from '../config/database.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM awards ORDER BY sort_order ASC, year DESC');
    res.json({ success: true, data: toCamelAll(rows) });
  } catch (e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { title, issuer, year, badgeUrl, sortOrder } = req.body;
    const id = randomUUID();
    const row = await insertOne('awards',
      'INSERT INTO awards (id, title, issuer, year, badge_url, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
      [id, title, issuer, year, badgeUrl, sortOrder || 0], id
    );
    res.status(201).json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await query('DELETE FROM awards WHERE id = ?', [req.params.id]);
    res.json({ success: true, data: {} });
  } catch (e) { next(e); }
});

export default router;
