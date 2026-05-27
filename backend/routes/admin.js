// ─── Admin API Routes ────────────────────────────────────────────────────────
// All routes protected by JWT `protect` middleware.
// Provides dashboard stats, leads, bookings, and activity feed.

import { Router } from 'express';
import { query, queryOne, toCamel, toCamelAll } from '../config/database.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// All admin routes require auth
router.use(protect);

// ── GET /api/v1/admin/stats ───────────────────────────────────────────────────
// Dashboard KPI counts from the database
router.get('/stats', async (_req, res, next) => {
  try {
    const [contacts, bookings, voiceLeads, newToday] = await Promise.all([
      query(`SELECT COUNT(*) AS count FROM contacts`),
      query(`SELECT COUNT(*) AS count FROM demo_bookings`).catch(() => ({ rows: [{ count: 0 }] })),
      query(`SELECT COUNT(*) AS count FROM voice_agent_leads`).catch(() => ({ rows: [{ count: 0 }] })),
      query(`SELECT COUNT(*) AS count FROM contacts WHERE created_at >= NOW() - INTERVAL '24 hours'`),
    ]);

    const contactCount  = parseInt(contacts.rows[0].count, 10);
    const bookingCount  = parseInt(bookings.rows[0].count, 10);
    const voiceCount    = parseInt(voiceLeads.rows[0].count, 10);
    const todayCount    = parseInt(newToday.rows[0].count, 10);

    res.json({
      success: true,
      data: {
        totalLeads:    contactCount,
        totalBookings: bookingCount + voiceCount,
        todayLeads:    todayCount,
        totalInquiries: contactCount + bookingCount + voiceCount,
      },
    });
  } catch (e) { next(e); }
});

// ── GET /api/v1/admin/leads ───────────────────────────────────────────────────
// All contact form submissions, paginated + filterable
router.get('/leads', async (req, res, next) => {
  try {
    const { page = 1, limit = 25, status, q } = req.query;
    const offset = (+page - 1) * +limit;
    const params = [];
    const where  = [];

    if (status && status !== 'all') {
      params.push(status);
      where.push(`status = $${params.length}`);
    }
    if (q) {
      params.push(`%${q.toLowerCase()}%`);
      where.push(`(LOWER(name) LIKE $${params.length} OR LOWER(email) LIKE $${params.length} OR LOWER(company) LIKE $${params.length})`);
    }

    const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const { rows: [{ count }] } = await query(`SELECT COUNT(*) FROM contacts ${whereClause}`, params);

    params.push(+limit, offset);
    const { rows } = await query(
      `SELECT * FROM contacts ${whereClause} ORDER BY created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    );

    res.json({
      success: true,
      data:  toCamelAll(rows),
      meta:  { page: +page, limit: +limit, total: +count, pages: Math.ceil(+count / +limit) },
    });
  } catch (e) { next(e); }
});

// ── PUT /api/v1/admin/leads/:id/status ───────────────────────────────────────
router.put('/leads/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'contacted', 'qualified', 'closed', 'spam'];
    if (!allowed.includes(status))
      return res.status(400).json({ success: false, error: { message: 'Invalid status' } });

    const row = await queryOne(
      'UPDATE contacts SET status=$1 WHERE id=$2 RETURNING *',
      [status, req.params.id]
    );
    if (!row) return res.status(404).json({ success: false, error: { message: 'Lead not found' } });
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

// ── DELETE /api/v1/admin/leads/:id ───────────────────────────────────────────
router.delete('/leads/:id', async (req, res, next) => {
  try {
    await query('DELETE FROM contacts WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (e) { next(e); }
});

// ── GET /api/v1/admin/bookings ────────────────────────────────────────────────
// Demo bookings from both demo_bookings and voice_agent_leads tables
router.get('/bookings', async (req, res, next) => {
  try {
    const { page = 1, limit = 25 } = req.query;
    const offset = (+page - 1) * +limit;

    // Try demo_bookings first, fall back to voice_agent_leads
    let rows = [];
    let total = 0;
    try {
      const { rows: [{ count }] } = await query('SELECT COUNT(*) FROM demo_bookings');
      total = +count;
      const res2 = await query(
        'SELECT * FROM demo_bookings ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [+limit, offset]
      );
      rows = res2.rows;
    } catch {
      // demo_bookings table may not exist yet — fall back
      const { rows: [{ count }] } = await query('SELECT COUNT(*) FROM voice_agent_leads').catch(() => ({ rows: [{ count: '0' }] }));
      total = +count;
      const res2 = await query(
        'SELECT * FROM voice_agent_leads ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [+limit, offset]
      ).catch(() => ({ rows: [] }));
      rows = res2.rows;
    }

    res.json({
      success: true,
      data:  toCamelAll(rows),
      meta:  { page: +page, limit: +limit, total, pages: Math.ceil(total / +limit) },
    });
  } catch (e) { next(e); }
});

// ── GET /api/v1/admin/activity ────────────────────────────────────────────────
// Recent combined activity (latest contacts + bookings)
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
    } catch { /* table may not exist */ }

    const combined = [...contacts, ...bookingRows]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 15)
      .map(r => toCamel(r));

    res.json({ success: true, data: combined });
  } catch (e) { next(e); }
});

// ── GET /api/v1/admin/subscribers ─────────────────────────────────────────────
router.get('/subscribers', async (req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM subscribers ORDER BY created_at DESC');
    const total = rows.length;
    const active = rows.filter(r => r.is_active).length;
    res.json({ success: true, data: toCamelAll(rows), meta: { total, active } });
  } catch (e) { next(e); }
});

export default router;
