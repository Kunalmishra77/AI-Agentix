import { Router } from 'express';
import { query, queryOne, toCamel, toCamelAll } from '../config/database.js';
import { protect } from '../middleware/auth.js';
import slugify from 'slugify';

const router = Router();

const COLS = 'id, title, slug, excerpt, cover_image, categories, tags, author_name, author_role, read_time, published_at, is_published, created_at';

router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 9, category, search } = req.query;
    const offset = (+page - 1) * +limit;
    const params = [];
    let where = 'WHERE is_published = true';
    if (category) { params.push(category); where += ` AND $${params.length} = ANY(categories)`; }
    if (search) { params.push(`%${search}%`); where += ` AND (title ILIKE $${params.length} OR excerpt ILIKE $${params.length})`; }

    const { rows: [{ count }] } = await query(`SELECT COUNT(*) FROM posts ${where}`, params);
    params.push(+limit, offset);
    const { rows } = await query(`SELECT ${COLS} FROM posts ${where} ORDER BY published_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`, params);
    const total = +count;
    res.json({ success: true, data: toCamelAll(rows), meta: { page: +page, limit: +limit, total, pages: Math.ceil(total / +limit) } });
  } catch (e) { next(e); }
});

router.get('/featured', async (_req, res, next) => {
  try {
    const { rows } = await query(`SELECT ${COLS} FROM posts WHERE is_published = true ORDER BY published_at DESC LIMIT 5`);
    res.json({ success: true, data: toCamelAll(rows) });
  } catch (e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const row = await queryOne('SELECT * FROM posts WHERE slug = $1 AND is_published = true', [req.params.slug]);
    if (!row) return res.status(404).json({ success: false, error: { message: 'Post not found' } });
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { title, excerpt, content, coverImage, categories, tags, authorName, authorRole, readTime, isPublished } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    const row = await queryOne(
      `INSERT INTO posts (title, slug, excerpt, content, cover_image, categories, tags, author_name, author_role, read_time, is_published, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [title, slug, excerpt, content, coverImage, categories || [], tags || [], authorName, authorRole, readTime || 5, !!isPublished, isPublished ? new Date() : null]
    );
    res.status(201).json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const { title, excerpt, content, coverImage, categories, tags, authorName, authorRole, readTime, isPublished } = req.body;
    const row = await queryOne(
      `UPDATE posts SET title=$1, excerpt=$2, content=$3, cover_image=$4, categories=$5, tags=$6,
       author_name=$7, author_role=$8, read_time=$9, is_published=$10, published_at=COALESCE(published_at,$11)
       WHERE id=$12 RETURNING *`,
      [title, excerpt, content, coverImage, categories || [], tags || [], authorName, authorRole, readTime || 5, !!isPublished, isPublished ? new Date() : null, req.params.id]
    );
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await query('DELETE FROM posts WHERE id = $1', [req.params.id]);
    res.json({ success: true, data: {} });
  } catch (e) { next(e); }
});

export default router;
