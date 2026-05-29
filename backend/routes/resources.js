import { Router } from 'express';
import { randomUUID } from 'crypto';
import { query, queryOne, insertOne, toCamel, toCamelAll } from '../config/database.js';
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
    const row = await queryOne('SELECT * FROM resources WHERE id = ?', [req.params.id]);
    if (!row) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { title, type, description, downloadUrl, coverImage, isFeatured } = req.body;
    const id = randomUUID();
    const row = await insertOne('resources',
      `INSERT INTO resources (id, title, type, description, download_url, cover_image, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, title, type || 'guide', description, downloadUrl, coverImage, isFeatured ? 1 : 0], id
    );
    res.status(201).json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await query('DELETE FROM resources WHERE id = ?', [req.params.id]);
    res.json({ success: true, data: {} });
  } catch (e) { next(e); }
});

export default router;
