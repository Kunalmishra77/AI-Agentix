import { Router } from 'express';
import { query, queryOne, toCamel, toCamelAll } from '../config/database.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM resources ORDER BY created_at DESC');
    res.json({ success: true, data: toCamelAll(rows) });
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const row = await queryOne('SELECT * FROM resources WHERE id = $1', [req.params.id]);
    if (!row) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { title, type, description, downloadUrl, coverImage, isFeatured } = req.body;
    const row = await queryOne(
      `INSERT INTO resources (title, type, description, download_url, cover_image, is_featured)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [title, type || 'guide', description, downloadUrl, coverImage, !!isFeatured]
    );
    res.status(201).json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await query('DELETE FROM resources WHERE id = $1', [req.params.id]);
    res.json({ success: true, data: {} });
  } catch (e) { next(e); }
});

export default router;
