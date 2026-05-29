import { Router } from 'express';
import { randomUUID } from 'crypto';
import { query, queryOne, insertOne, updateOne, toCamel, toCamelAll } from '../config/database.js';
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
    const id = randomUUID();
    const row = await insertOne('clients',
      'INSERT INTO clients (id, name, logo_url, website, sort_order) VALUES (?, ?, ?, ?, ?)',
      [id, name, logoUrl, website, sortOrder || 0], id
    );
    res.status(201).json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const { name, logoUrl, website, sortOrder } = req.body;
    const row = await updateOne('clients',
      'UPDATE clients SET name=?, logo_url=?, website=?, sort_order=? WHERE id=?',
      [name, logoUrl, website, sortOrder || 0, req.params.id], req.params.id
    );
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await query('DELETE FROM clients WHERE id = ?', [req.params.id]);
    res.json({ success: true, data: {} });
  } catch (e) { next(e); }
});

export default router;
