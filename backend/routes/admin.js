import { Router } from 'express';
import { query, queryOne, updateOne, toCamel, toCamelAll } from '../config/database.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.use(protect);

router.get('/stats', async (_req, res, next) => {
  try {
    const [contacts, bookings, voiceLeads, newToday] = await Promise.all([
      query(`SELECT COUNT(*) AS count FROM contacts`),
      query(`SELECT COUNT(*) AS count FROM demo_bookings`).catch(() => ({ rows: [{ count: 0 }] })),
      query(`SELECT COUNT(*) AS count FROM voice_agent_leads`).catch(() => ({ rows: [{ count: 0 }] })),
      query(`SELECT COUNT(*) AS count FROM contacts WHERE created_at >= NOW() - INTERVAL 24 HOUR`),
    ]);
    res.json({
      success: true,
      data: {
        totalLeads:     Number(contacts.rows[0].count),
        totalBookings:  Number(bookings.rows[0].count) + Number(voiceLeads.rows[0].count),
        todayLeads:     Number(newToday.rows[0].count),
        totalInquiries: Number(contacts.rows[0].count) + Number(bookings.rows[0].count) + Number(voiceLeads.rows[0].count),
      },
    });
  } catch (e) { next(e); }
});

router.get('/leads', async (req, res, next) => {
  try {
    const { page = 1, limit = 25, status, q } = req.query;
    const offset = (+page - 1) * +limit;
    const params = [];
    const where  = [];
    if (status && status !== 'all') { params.push(status); where.push(`status = ?`); }
    if (q) { params.push(`%${q}%`, `%${q}%`, `%${q}%`); where.push(`(name LIKE ? OR email LIKE ? OR company LIKE ?)`); }

    const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const { rows: [cr] } = await query(`SELECT COUNT(*) AS count FROM contacts ${whereClause}`, params);
    const total = Number(cr.count);
    params.push(+limit, offset);
    const { rows } = await query(`SELECT * FROM contacts ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`, params);
    res.json({ success: true, data: toCamelAll(rows), meta: { page: +page, limit: +limit, total, pages: Math.ceil(total / +limit) } });
  } catch (e) { next(e); }
});

router.put('/leads/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'contacted', 'qualified', 'closed', 'spam'];
    if (!allowed.includes(status))
      return res.status(400).json({ success: false, error: { message: 'Invalid status' } });
    const row = await updateOne('contacts', 'UPDATE contacts SET status=? WHERE id=?', [status, req.params.id], req.params.id);
    if (!row) return res.status(404).json({ success: false, error: { message: 'Lead not found' } });
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

router.delete('/leads/:id', async (req, res, next) => {
  try {
    await query('DELETE FROM contacts WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { next(e); }
});

router.get('/bookings', async (req, res, next) => {
  try {
    const { page = 1, limit = 25 } = req.query;
    const offset = (+page - 1) * +limit;
    let rows = [], total = 0;
    try {
      const { rows: [cr] } = await query('SELECT COUNT(*) AS count FROM demo_bookings');
      total = Number(cr.count);
      const r2 = await query('SELECT * FROM demo_bookings ORDER BY created_at DESC LIMIT ? OFFSET ?', [+limit, offset]);
      rows = r2.rows;
    } catch {
      const { rows: [cr] } = await query('SELECT COUNT(*) AS count FROM voice_agent_leads').catch(() => ({ rows: [{ count: '0' }] }));
      total = Number(cr.count);
      const r2 = await query('SELECT * FROM voice_agent_leads ORDER BY created_at DESC LIMIT ? OFFSET ?', [+limit, offset]).catch(() => ({ rows: [] }));
      rows = r2.rows;
    }
    res.json({ success: true, data: toCamelAll(rows), meta: { page: +page, limit: +limit, total, pages: Math.ceil(total / +limit) } });
  } catch (e) { next(e); }
});

router.get('/activity', async (req, res, next) => {
  try {
    const { rows: contacts } = await query(
      `SELECT id, name, email, company, service, status, created_at, 'contact' AS type FROM contacts ORDER BY created_at DESC LIMIT 10`
    );
    let bookingRows = [];
    try {
      const { rows } = await query(
        `SELECT id, name, email, company, solution_need AS service, 'booked' AS status, created_at, 'booking' AS type FROM demo_bookings ORDER BY created_at DESC LIMIT 10`
      );
      bookingRows = rows;
    } catch {}
    const combined = [...contacts, ...bookingRows]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 15).map(r => toCamel(r));
    res.json({ success: true, data: combined });
  } catch (e) { next(e); }
});

router.get('/subscribers', async (req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM subscribers ORDER BY created_at DESC');
    res.json({ success: true, data: toCamelAll(rows), meta: { total: rows.length, active: rows.filter(r => r.is_active).length } });
  } catch (e) { next(e); }
});

export default router;
