import jwt from 'jsonwebtoken';
import { queryOne } from '../config/database.js';

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null;
  if (!token) return res.status(401).json({ success: false, error: { message: 'Not authorized' } });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await queryOne('SELECT id, email, name FROM admins WHERE id = $1', [decoded.id]);
    if (!admin) return res.status(401).json({ success: false, error: { message: 'Admin not found' } });
    req.admin = admin;
    next();
  } catch {
    res.status(401).json({ success: false, error: { message: 'Token invalid' } });
  }
};
