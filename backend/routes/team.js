import { Router } from 'express';
import { randomUUID } from 'crypto';
import { query, queryOne, insertOne, updateOne, toCamel, toCamelAll } from '../config/database.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM team_members ORDER BY sort_order ASC, created_at ASC');
    res.json({ success: true, data: toCamelAll(rows) });
  } catch (e) { next(e); }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { name, role, bio, photoUrl, linkedin, sortOrder } = req.body;
    const id = randomUUID();
    const row = await insertOne('team_members',
      'INSERT INTO team_members (id, name, role, bio, photo_url, linkedin, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, name, role, bio, photoUrl, linkedin, sortOrder || 0], id
    );
    res.status(201).json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const { name, role, bio, photoUrl, linkedin, sortOrder } = req.body;
    const row = await updateOne('team_members',
      'UPDATE team_members SET name=?, role=?, bio=?, photo_url=?, linkedin=?, sort_order=? WHERE id=?',
      [name, role, bio, photoUrl, linkedin, sortOrder || 0, req.params.id], req.params.id
    );
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await query('DELETE FROM team_members WHERE id = ?', [req.params.id]);
    res.json({ success: true, data: {} });
  } catch (e) { next(e); }
});

export default router;
