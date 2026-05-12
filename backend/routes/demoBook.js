// ─── Unified Demo Booking Route ───────────────────────────────────────────────
// POST /api/v1/demo/book
// Single endpoint for all booking sources: voice agent, chat agent, manual form.
// Saves to demo_bookings table and creates a Google Calendar event.

import { Router } from 'express';
import { createDemoEvent } from '../services/calendarService.js';
import pool from '../config/database.js';

const router = Router();

const VALID_SOURCES = ['voice', 'chat', 'manual'];

router.post('/book', async (req, res) => {
  try {
    const {
      source = 'manual',
      name,
      email,
      company,
      solutionNeed,
      preferredDate,
      preferredTime,
      notes,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: { message: 'name and email are required' },
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid email address' },
      });
    }

    // ── Date validation (Layer 3 — backend safety net) ────────────────────────
    let nudgeSooner = false;
    if (preferredDate) {
      const slotStr = `${preferredDate}T${preferredTime || '09:00'}`;
      const slot    = new Date(slotStr);
      const now     = new Date();

      // Tomorrow at 00:00 local
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const sevenDaysOut = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      if (!isNaN(slot.getTime())) {
        if (slot < tomorrow) {
          return res.status(400).json({
            success: false,
            error: { message: 'Demos must be booked from tomorrow onwards. Please pick a future date.' },
            pastDate: true,
          });
        }
        if (slot > sevenDaysOut) {
          return res.status(400).json({
            success: false,
            error: { message: 'Please pick a date within the next 7 days so we can confirm your slot quickly.' },
          });
        }
        const threeDaysOut = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        nudgeSooner = slot > threeDaysOut;
      }
    }

    const bookingSource = VALID_SOURCES.includes(source) ? source : 'manual';

    let calendarEventId = null;
    let calendarError   = null;

    try {
      calendarEventId = await createDemoEvent({
        name,
        email,
        company:       company      || '',
        solutionNeed:  solutionNeed || '',
        preferredDate: preferredDate || '',
        preferredTime: preferredTime || '',
      });
    } catch (err) {
      console.error('[demo/book] Calendar error:', err.message);
      calendarError = err.message;
    }

    try {
      await pool.query(
        `INSERT INTO demo_bookings
           (source, name, email, company, solution_need, preferred_date, preferred_time, calendar_event_id, notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          bookingSource,
          name,
          email,
          company      || null,
          solutionNeed || null,
          preferredDate || null,
          preferredTime || null,
          calendarEventId,
          notes        || null,
        ],
      );
    } catch (dbErr) {
      console.error('[demo/book] DB error:', dbErr.message);
    }

    return res.json({
      success: true,
      calendarEventId,
      nudgeSooner,
      calendarError: calendarError ? 'Calendar invite may be delayed.' : null,
      message: calendarEventId
        ? 'Demo booked! A calendar invite has been sent to your email.'
        : 'Demo request received! The team will send a calendar invite shortly.',
    });
  } catch (err) {
    console.error('[demo/book]', err.message);
    return res.status(500).json({
      success: false,
      error: { message: 'Booking failed. Please try again or visit agentix.ai/demo.' },
    });
  }
});

export default router;
