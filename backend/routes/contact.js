import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import { query, queryOne, toCamel, toCamelAll } from '../config/database.js';
import { protect } from '../middleware/auth.js';

const router = Router();

const validate = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('message').optional({ nullable: true, checkFalsy: true }).trim(),
];

// POST /api/v1/contact
router.post('/', validate, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: errors.array()[0].msg, details: errors.array() }
    });
  }
  try {
    const { name, email, company, phone, service, message, budget, source,
            // Audit fields
            industry, teamSize, goals,
            // Demo fields
            preferredDate, timeSlot, demoFocus, attendees,
            // Partner fields
            website, partnerType, clientBase,
          } = req.body;

    const msgText = message || [
      industry && `Industry: ${industry}`,
      teamSize && `Team size: ${teamSize}`,
      goals && `Goals: ${goals}`,
      preferredDate && `Preferred date: ${preferredDate}`,
      timeSlot && `Time slot: ${timeSlot}`,
      demoFocus && `Demo focus: ${demoFocus}`,
      attendees && `Attendees: ${attendees}`,
      website && `Website: ${website}`,
      partnerType && `Partner type: ${partnerType}`,
      clientBase && `Client base: ${clientBase}`,
    ].filter(Boolean).join(' | ') || '—';

    // Save to DB
    const submission = await queryOne(
      `INSERT INTO contacts (name, email, company, phone, service, message, budget)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [name, email, company || null, phone || null, service || source || null, msgText, budget || null]
    );

    // Send notification email
    const transporter = nodemailer.createTransport({
      host:   process.env.EMAIL_HOST,
      port:   Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      requireTLS: true,
      auth:   { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      tls:    { rejectUnauthorized: false },
    });

    const extraRows = [
      industry    && `<tr><td style="padding:6px 0;font-weight:600;width:130px">Industry:</td><td>${industry}</td></tr>`,
      teamSize    && `<tr><td style="padding:6px 0;font-weight:600">Team Size:</td><td>${teamSize}</td></tr>`,
      goals       && `<tr><td style="padding:6px 0;font-weight:600">Goals:</td><td>${goals}</td></tr>`,
      preferredDate && `<tr><td style="padding:6px 0;font-weight:600">Demo Date:</td><td>${preferredDate} ${timeSlot || ''}</td></tr>`,
      demoFocus   && `<tr><td style="padding:6px 0;font-weight:600">Demo Focus:</td><td>${demoFocus}</td></tr>`,
      attendees   && `<tr><td style="padding:6px 0;font-weight:600">Attendees:</td><td>${attendees}</td></tr>`,
      website     && `<tr><td style="padding:6px 0;font-weight:600">Website:</td><td><a href="${website}">${website}</a></td></tr>`,
      partnerType && `<tr><td style="padding:6px 0;font-weight:600">Partner Type:</td><td>${partnerType}</td></tr>`,
      clientBase  && `<tr><td style="padding:6px 0;font-weight:600">Client Base:</td><td>${clientBase}</td></tr>`,
    ].filter(Boolean).join('');

    const adminMailOptions = {
      from:    process.env.EMAIL_FROM,
      to:      process.env.EMAIL_TO,
      subject: `🚀 New ${source || 'Contact'}: ${name} — ${company || email}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#e84d1c;padding:24px;text-align:center">
            <h2 style="color:#fff;margin:0;font-size:20px">New ${source || 'Contact'} Submission</h2>
          </div>
          <div style="padding:32px;background:#f7f7f5;border:1px solid #e5e5e5">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;font-weight:600;width:130px">Source:</td><td><strong style="color:#e84d1c">${source || '—'}</strong></td></tr>
              <tr><td style="padding:8px 0;font-weight:600">Name:</td><td>${name}</td></tr>
              <tr><td style="padding:8px 0;font-weight:600">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;font-weight:600">Phone:</td><td>${phone || '—'}</td></tr>
              <tr><td style="padding:8px 0;font-weight:600">Company:</td><td>${company || '—'}</td></tr>
              ${extraRows}
            </table>
            ${msgText !== '—' ? `<hr style="margin:20px 0;border-color:#e5e5e5"/>
            <p style="font-weight:600;margin-bottom:8px">Details / Message:</p>
            <p style="white-space:pre-wrap;background:#fff;padding:16px;border-left:3px solid #e84d1c">${msgText}</p>` : ''}
            <p style="color:#999;font-size:12px;margin-top:20px">ID: ${submission.id} · ${new Date().toLocaleString('en-IN', {timeZone:'Asia/Kolkata'})}</p>
          </div>
        </div>
      `,
    };

    // Auto-reply to sender
    const autoReplyOptions = {
      from:    process.env.EMAIL_FROM,
      to:      email,
      subject: `Thanks for reaching out, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#000;padding:32px;text-align:center">
            <h1 style="color:#fff;margin:0;font-family:sans-serif;font-size:24px">AI<span style="color:#e84d1c">Agentix</span></h1>
          </div>
          <div style="padding:40px;background:#f7f7f5">
            <h2 style="color:#0d0d0d;margin-bottom:16px">Hey ${name.split(' ')[0]}, we got your message!</h2>
            <p style="color:#555;line-height:1.7">
              Thanks for reaching out to AI Agentix. We've received your inquiry and our team
              will review it and get back to you within <strong>1-2 business days</strong>.
            </p>
            <p style="color:#555;line-height:1.7;margin-top:16px">
              In the meantime, feel free to explore our case studies to see how we've helped
              businesses like yours.
            </p>
            <div style="margin:32px 0;text-align:center">
              <a href="https://ai-agentix.com/case-studies"
                 style="background:#e84d1c;color:#fff;padding:14px 32px;
                        text-decoration:none;font-weight:700;font-family:sans-serif">
                View Case Studies →
              </a>
            </div>
            <p style="color:#999;font-size:13px">
              — The AI Agentix Team<br/>
              <a href="https://ai-agentix.com" style="color:#e84d1c">ai-agentix.com</a>
            </p>
          </div>
        </div>
      `,
    };

    // Fire both emails — log full error if either fails
    Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(autoReplyOptions),
    ]).then(() => {
      console.log(`Emails sent for contact ${submission.id}`);
    }).catch(err => {
      console.error('Email send failed:', err.message, err.code, err.responseCode);
    });

    res.status(201).json({
      success: true,
      data: { id: submission.id },
      message: "Your message has been sent! We'll be in touch soon.",
    });
  } catch(e) { next(e); }
});

// GET submissions (Admin only)
router.get('/submissions', protect, async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const offset = (+page - 1) * +limit;
    const params = [];
    let where = '';
    if (status) { params.push(status); where = 'WHERE status = $1'; }

    const { rows: [{ count }] } = await query(`SELECT COUNT(*) FROM contacts ${where}`, params);
    params.push(+limit, offset);
    const { rows } = await query(
      `SELECT * FROM contacts ${where} ORDER BY created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    );
    const total = +count;
    res.json({ success: true, data: toCamelAll(rows), meta: { page: +page, limit: +limit, total, pages: Math.ceil(total / +limit) } });
  } catch (e) { next(e); }
});

// PUT /api/v1/contact/:id/status
router.put('/:id/status', protect, async (req, res, next) => {
  try {
    const row = await queryOne(
      'UPDATE contacts SET status=$1 WHERE id=$2 RETURNING *',
      [req.body.status, req.params.id]
    );
    res.json({ success: true, data: toCamel(row) });
  } catch (e) { next(e); }
});

export default router;
