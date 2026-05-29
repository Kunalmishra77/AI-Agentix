import { Router } from 'express';
import { randomUUID } from 'crypto';
import { createDemoEvent } from '../services/calendarService.js';
import { query } from '../config/database.js';

const router = Router();

router.post('/book', async (req, res) => {
  try {
    const { name, email, company, solutionNeed, preferredDate, preferredTime } = req.body;

    if (!name || !email)
      return res.status(400).json({ success: false, error: { message: 'name and email are required' } });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ success: false, error: { message: 'Invalid email address' } });

    let calendarEventId = null;
    let calendarError   = null;

    try {
      calendarEventId = await createDemoEvent({ name, email, company: company || '', solutionNeed: solutionNeed || '', preferredDate: preferredDate || '', preferredTime: preferredTime || '' });
    } catch (err) {
      console.error('[voice-agent/book] Calendar error:', err.message);
      calendarError = err.message;
    }

    try {
      const id = randomUUID();
      await query(
        `INSERT INTO voice_agent_leads (id, name, email, company, solution_need, preferred_date, preferred_time, calendar_event_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, name, email, company || null, solutionNeed || null, preferredDate || null, preferredTime || null, calendarEventId]
      );
    } catch (dbErr) {
      console.error('[voice-agent/book] DB error:', dbErr.message);
    }

    return res.json({
      success: true, calendarEventId,
      calendarError: calendarError ? 'Calendar invite may be delayed.' : null,
      message: calendarEventId ? 'Demo booked! A calendar invite has been sent to your email.' : 'Demo request received! The team will send a calendar invite shortly.',
    });
  } catch (err) {
    console.error('[voice-agent/book]', err.message);
    return res.status(500).json({ success: false, error: { message: 'Booking failed. Please try again.' } });
  }
});

export default router;
