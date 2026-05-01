import { Router } from 'express';
import { query, queryOne, toCamel, toCamelAll } from '../config/database.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM clients ORDER BY sort_order ASC, created_at ASC');
    res.json({ success: true, data: toCamelAll(rows) });
  } catch (e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { name, logoUrl, website, sortOrder } = req.body;
    const row = await queryOne(
      'INSERT INTO clients (name, logo_url, website, sort_order) VALUES ($1,$2,$3,$4) RETURNING *',
      [name, logoUrl, website, sortOrder || 0]
    );
    res.status(201).json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const { name, logoUrl, website, sortOrder } = req.body;
    const row = await queryOne(
      'UPDATE clients SET name=$1, logo_url=$2, website=$3, sort_order=$4 WHERE id=$5 RETURNING *',
      [name, logoUrl, website, sortOrder || 0, req.params.id]
    );
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await query('DELETE FROM clients WHERE id = $1', [req.params.id]);
    res.json({ success: true, data: {} });
  } catch (e) { next(e); }
});

export default router;
