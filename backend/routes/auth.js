import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { queryOne } from '../config/database.js';
import { protect } from '../middleware/auth.js';

const router = Router();

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, error: { message: 'Email and password required' } });
    const admin = await queryOne('SELECT * FROM admins WHERE email = $1', [email.toLowerCase()]);
    if (!admin || !(await bcrypt.compare(password, admin.password)))
      return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
    res.json({ success: true, data: { token: signToken(admin.id), admin: { id: admin.id, name: admin.name, email: admin.email } } });
  } catch(e) { next(e); }
});

router.get('/me', protect, (req, res) => {
  res.json({ success: true, data: req.admin });
});

router.post('/logout', (_req, res) => {
  res.json({ success: true, message: 'Logged out' });
});

export default router;
