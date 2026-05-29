import { Router } from 'express';
import { randomUUID } from 'crypto';
import { query, queryOne, insertOne, updateOne, toCamel, toCamelAll } from '../config/database.js';
import { protect } from '../middleware/auth.js';
import slugify from 'slugify';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { industry } = req.query;
    const params = [];
    let sql = 'SELECT * FROM case_studies';
    if (industry) { params.push(industry); sql += ' WHERE industry = ?'; }
    sql += ' ORDER BY created_at DESC';
    const { rows } = await query(sql, params);
    res.json({ success: true, data: toCamelAll(rows) });
  } catch (e) { next(e); }
});

router.get('/featured', async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM case_studies WHERE is_featured = 1 ORDER BY created_at DESC LIMIT 5');
    res.json({ success: true, data: toCamelAll(rows) });
  } catch (e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const row = await queryOne('SELECT * FROM case_studies WHERE slug = ?', [req.params.slug]);
    if (!row) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { title, industry, client, challenge, solution, result, metrics, coverImage, tags, isFeatured } = req.body;
    const id = randomUUID();
    const slug = slugify(title, { lower: true, strict: true });
    const row = await insertOne('case_studies',
      `INSERT INTO case_studies (id, title, slug, industry, client, challenge, solution, result, metrics, cover_image, tags, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, slug, industry, client, challenge, solution, result,
       JSON.stringify(metrics || []), coverImage, JSON.stringify(tags || []), isFeatured ? 1 : 0],
      id
    );
    res.status(201).json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const { title, industry, client, challenge, solution, result, metrics, coverImage, tags, isFeatured } = req.body;
    const row = await updateOne('case_studies',
      `UPDATE case_studies SET title=?, industry=?, client=?, challenge=?, solution=?, result=?,
       metrics=?, cover_image=?, tags=?, is_featured=? WHERE id=?`,
      [title, industry, client, challenge, solution, result,
       JSON.stringify(metrics || []), coverImage, JSON.stringify(tags || []), isFeatured ? 1 : 0, req.params.id],
      req.params.id
    );
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await query('DELETE FROM case_studies WHERE id = ?', [req.params.id]);
    res.json({ success: true, data: {} });
  } catch (e) { next(e); }
});

export default router;
