import { Router } from 'express';
import { query, queryOne, toCamel, toCamelAll } from '../config/database.js';
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
    const row = await queryOne('SELECT * FROM services WHERE slug = $1', [req.params.slug]);
    if (!row) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { title, tagline, description, icon, features, isFeatured, sortOrder } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    const row = await queryOne(
      `INSERT INTO services (title, slug, tagline, description, icon, features, is_featured, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [title, slug, tagline, description, icon, features || [], !!isFeatured, sortOrder || 0]
    );
    res.status(201).json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const { title, tagline, description, icon, features, isFeatured, sortOrder } = req.body;
    const row = await queryOne(
      `UPDATE services SET title=$1, tagline=$2, description=$3, icon=$4, features=$5, is_featured=$6, sort_order=$7
       WHERE id=$8 RETURNING *`,
      [title, tagline, description, icon, features || [], !!isFeatured, sortOrder || 0, req.params.id]
    );
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await query('DELETE FROM services WHERE id = $1', [req.params.id]);
    res.json({ success: true, data: {} });
  } catch (e) { next(e); }
});

export default router;
