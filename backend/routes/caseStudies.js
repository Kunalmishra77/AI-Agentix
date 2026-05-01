import { Router } from 'express';
import { query, queryOne, toCamel, toCamelAll } from '../config/database.js';
import { protect } from '../middleware/auth.js';
import slugify from 'slugify';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { industry } = req.query;
    const params = [];
    let where = 'WHERE is_featured IS NOT NULL OR is_featured IS NULL';
    if (industry) { params.push(industry); where = `WHERE industry = $1`; }
    const { rows } = await query(`SELECT * FROM case_studies ${industry ? where : ''} ORDER BY created_at DESC`, industry ? params : []);
    res.json({ success: true, data: toCamelAll(rows) });
  } catch (e) { next(e); }
});

router.get('/featured', async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM case_studies WHERE is_featured = true ORDER BY created_at DESC LIMIT 5');
    res.json({ success: true, data: toCamelAll(rows) });
  } catch (e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const row = await queryOne('SELECT * FROM case_studies WHERE slug = $1', [req.params.slug]);
    if (!row) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { title, industry, client, challenge, solution, result, metrics, coverImage, tags, isFeatured } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    const row = await queryOne(
      `INSERT INTO case_studies (title, slug, industry, client, challenge, solution, result, metrics, cover_image, tags, is_featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [title, slug, industry, client, challenge, solution, result, JSON.stringify(metrics || []), coverImage, tags || [], !!isFeatured]
    );
    res.status(201).json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const { title, industry, client, challenge, solution, result, metrics, coverImage, tags, isFeatured } = req.body;
    const row = await queryOne(
      `UPDATE case_studies SET title=$1, industry=$2, client=$3, challenge=$4, solution=$5, result=$6,
       metrics=$7, cover_image=$8, tags=$9, is_featured=$10 WHERE id=$11 RETURNING *`,
      [title, industry, client, challenge, solution, result, JSON.stringify(metrics || []), coverImage, tags || [], !!isFeatured, req.params.id]
    );
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await query('DELETE FROM case_studies WHERE id = $1', [req.params.id]);
    res.json({ success: true, data: {} });
  } catch (e) { next(e); }
});

export default router;
