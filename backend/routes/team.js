import { Router } from 'express';
import { query, queryOne, toCamel, toCamelAll } from '../config/database.js';
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
    const row = await queryOne(
      'INSERT INTO team_members (name, role, bio, photo_url, linkedin, sort_order) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [name, role, bio, photoUrl, linkedin, sortOrder || 0]
    );
    res.status(201).json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const { name, role, bio, photoUrl, linkedin, sortOrder } = req.body;
    const row = await queryOne(
      'UPDATE team_members SET name=$1, role=$2, bio=$3, photo_url=$4, linkedin=$5, sort_order=$6 WHERE id=$7 RETURNING *',
      [name, role, bio, photoUrl, linkedin, sortOrder || 0, req.params.id]
    );
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await query('DELETE FROM team_members WHERE id = $1', [req.params.id]);
    res.json({ success: true, data: {} });
  } catch (e) { next(e); }
});

export default router;
