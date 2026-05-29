import { Router } from 'express';
import { randomUUID } from 'crypto';
import { query, queryOne, insertOne, updateOne, toCamel, toCamelAll } from '../config/database.js';
import { protect } from '../middleware/auth.js';
import slugify from 'slugify';

const router = Router();

const COLS = 'id, title, slug, excerpt, cover_image, categories, tags, author_name, author_role, read_time, published_at, is_published, created_at';

router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 9, category, search } = req.query;
    const offset = (+page - 1) * +limit;
    const params = [];
    let where = 'WHERE is_published = 1';
    if (category) { params.push(category); where += ` AND JSON_CONTAINS(categories, JSON_QUOTE(?))`; }
    if (search) { params.push(`%${search}%`, `%${search}%`); where += ` AND (title LIKE ? OR excerpt LIKE ?)`; }

    const { rows: [cr] } = await query(`SELECT COUNT(*) AS count FROM posts ${where}`, params);
    const total = Number(cr.count);
    params.push(+limit, offset);
    const { rows } = await query(`SELECT ${COLS} FROM posts ${where} ORDER BY published_at DESC LIMIT ? OFFSET ?`, params);
    res.json({ success: true, data: toCamelAll(rows), meta: { page: +page, limit: +limit, total, pages: Math.ceil(total / +limit) } });
  } catch (e) { next(e); }
});

router.get('/featured', async (_req, res, next) => {
  try {
    const { rows } = await query(`SELECT ${COLS} FROM posts WHERE is_published = 1 ORDER BY published_at DESC LIMIT 5`);
    res.json({ success: true, data: toCamelAll(rows) });
  } catch (e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const row = await queryOne('SELECT * FROM posts WHERE slug = ? AND is_published = 1', [req.params.slug]);
    if (!row) return res.status(404).json({ success: false, error: { message: 'Post not found' } });
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { title, excerpt, content, coverImage, categories, tags, authorName, authorRole, readTime, isPublished } = req.body;
    const id = randomUUID();
    const slug = slugify(title, { lower: true, strict: true });
    const row = await insertOne('posts',
      `INSERT INTO posts (id, title, slug, excerpt, content, cover_image, categories, tags, author_name, author_role, read_time, is_published, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, slug, excerpt, content, coverImage,
       JSON.stringify(categories || []), JSON.stringify(tags || []),
       authorName, authorRole, readTime || 5, isPublished ? 1 : 0, isPublished ? new Date() : null],
      id
    );
    res.status(201).json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const { title, excerpt, content, coverImage, categories, tags, authorName, authorRole, readTime, isPublished } = req.body;
    const row = await updateOne('posts',
      `UPDATE posts SET title=?, excerpt=?, content=?, cover_image=?, categories=?, tags=?,
       author_name=?, author_role=?, read_time=?, is_published=?,
       published_at=COALESCE(published_at, ?) WHERE id=?`,
      [title, excerpt, content, coverImage,
       JSON.stringify(categories || []), JSON.stringify(tags || []),
       authorName, authorRole, readTime || 5, isPublished ? 1 : 0,
       isPublished ? new Date() : null, req.params.id],
      req.params.id
    );
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.json({ success: true, data: {} });
  } catch (e) { next(e); }
});

export default router;
