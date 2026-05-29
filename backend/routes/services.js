import { Router } from 'express';
import { randomUUID } from 'crypto';
import { query, queryOne, insertOne, updateOne, toCamel, toCamelAll } from '../config/database.js';
import { protect } from '../middleware/auth.js';
import slugify from 'slugify';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM services ORDER BY sort_order ASC, created_at ASC');
    res.json({ success: true, data: toCamelAll(rows) });
  } catch (e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const row = await queryOne('SELECT * FROM services WHERE slug = ?', [req.params.slug]);
    if (!row) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { title, tagline, description, icon, features, isFeatured, sortOrder } = req.body;
    const id = randomUUID();
    const slug = slugify(title, { lower: true, strict: true });
    const row = await insertOne('services',
      `INSERT INTO services (id, title, slug, tagline, description, icon, features, is_featured, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, slug, tagline, description, icon, JSON.stringify(features || []), isFeatured ? 1 : 0, sortOrder || 0],
      id
    );
    res.status(201).json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const { title, tagline, description, icon, features, isFeatured, sortOrder } = req.body;
    const row = await updateOne('services',
      `UPDATE services SET title=?, tagline=?, description=?, icon=?, features=?, is_featured=?, sort_order=? WHERE id=?`,
      [title, tagline, description, icon, JSON.stringify(features || []), isFeatured ? 1 : 0, sortOrder || 0, req.params.id],
      req.params.id
    );
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await query('DELETE FROM services WHERE id = ?', [req.params.id]);
    res.json({ success: true, data: {} });
  } catch (e) { next(e); }
});

export default router;
