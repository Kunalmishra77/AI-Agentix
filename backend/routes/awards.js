import { Router } from 'express';
import { query, queryOne, toCamel, toCamelAll } from '../config/database.js';
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
    const row = await queryOne(
      'INSERT INTO awards (title, issuer, year, badge_url, sort_order) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [title, issuer, year, badgeUrl, sortOrder || 0]
    );
    res.status(201).json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await query('DELETE FROM awards WHERE id = $1', [req.params.id]);
    res.json({ success: true, data: {} });
  } catch (e) { next(e); }
});

export default router;
