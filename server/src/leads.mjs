// Website lead capture: validates enquiries from the contact page, the floating
// lead widget and the footer newsletter, stores every lead on disk FIRST (so no
// lead is lost if email or Google is down), then emails the team and appends a
// row to the leads Google Sheet. Failed deliveries are retried in the background.

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import nodemailer from 'nodemailer'

// ---------------------------------------------------------------- config

export const CONSENT_VERSION = '2026-10-27'

const SMTP = {
  host: process.env.SMTP_HOST || '',
  port: Number(process.env.SMTP_PORT || 465),
  secure: (process.env.SMTP_SECURE || 'true') !== 'false',
  user: process.env.SMTP_USER || '',
  pass: process.env.SMTP_PASS || '',
}
const FROM = process.env.LEAD_FROM || SMTP.user
const NOTIFY_TO = (process.env.LEAD_NOTIFY_TO || '').split(',').map((s) => s.trim()).filter(Boolean)

// ---------------------------------------------------------------- field rules

const FORM_LABELS = {
  audit: 'Free AI Audit (contact page)',
  demo: 'Book a Demo (contact page)',
  partner: 'Partnership (contact page)',
  popup: 'Book a Consultation (floating form)',
  newsletter: 'Newsletter (footer)',
}

const OPTIONS = {
  industry: ['Real Estate', 'Healthcare', 'Education', 'Retail & E-commerce', 'Logistics', 'Hospitality', 'Manufacturing', 'Other'],
  teamSize: ['1–10 people', '11–50 people', '51–200 people', '200+ people'],
  automate: ['Lead Follow-up', 'Appointment Booking', 'Customer Support Bot', 'Invoice Processing', 'HR Onboarding', 'WhatsApp Campaigns'],
  timeSlot: ['Morning (10 AM – 12 PM)', 'Afternoon (12 PM – 3 PM)', 'Evening (3 PM – 6 PM)'],
  focus: ['Sales & Lead Automation', 'HR & Hiring Workflows', 'Customer Support Bot', 'Finance & Invoicing', 'Full Platform Overview', 'Industry-Specific Workflows'],
  attendees: ['Just me', '2–3 people', '4–6 people', '7+ people'],
  partnershipType: ['Digital Agency', 'Business Consultant', 'Tech / SaaS Partner', 'White-label Reseller'],
  clientBase: ['1–5 clients', '6–20 clients', '21–50 clients', '50+ clients'],
}

// kind: text | email | phone | url | date | select | multi ; max = max length
const SCHEMAS = {
  audit: {
    name: { kind: 'text', required: true, max: 100 },
    phone: { kind: 'phone', required: true },
    email: { kind: 'email', required: true },
    company: { kind: 'text', max: 150 },
    industry: { kind: 'select' },
    teamSize: { kind: 'select' },
    automate: { kind: 'multi' },
  },
  demo: {
    name: { kind: 'text', required: true, max: 100 },
    email: { kind: 'email', required: true },
    phone: { kind: 'phone' },
    company: { kind: 'text', max: 150 },
    date: { kind: 'date', required: true },
    timeSlot: { kind: 'select', required: true },
    focus: { kind: 'select' },
    attendees: { kind: 'select' },
  },
  partner: {
    name: { kind: 'text', required: true, max: 100 },
    email: { kind: 'email', required: true },
    agency: { kind: 'text', required: true, max: 150 },
    website: { kind: 'url' },
    partnershipType: { kind: 'multi' },
    phone: { kind: 'phone' },
    clientBase: { kind: 'select' },
    lookingFor: { kind: 'text', max: 2000 },
  },
  popup: {
    name: { kind: 'text', required: true, max: 100 },
    phone: { kind: 'phone', required: true },
    email: { kind: 'email' },
    message: { kind: 'text', max: 1000 },
  },
  newsletter: {
    email: { kind: 'email', required: true },
  },
}

const LABELS = {
  name: 'Name', phone: 'Phone', email: 'Email', company: 'Company', industry: 'Industry', teamSize: 'Team size',
  automate: 'Wants to automate', date: 'Preferred date', timeSlot: 'Time slot', focus: 'Demo focus', attendees: 'Attendees',
  agency: 'Company / agency', website: 'Website', partnershipType: 'Partnership type', clientBase: 'Client base',
  lookingFor: 'Looking for', message: 'Message',
}

export const isEmail = (v) => /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(v) && v.length <= 254
// India and international: optional +, then 7–15 digits once spaces, dashes, dots and brackets are removed.
export const normalisePhone = (v) => String(v).replace(/[\s\-().]/g, '')
export const isPhone = (v) => /^\+?[0-9]{7,15}$/.test(normalisePhone(v))

function todayIST() {
  return new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10)
}

/**
 * Validates a submission. Returns { errors } (field -> message) or { fields } (clean values).
 */
export function validateLead(type, raw = {}) {
  const schema = SCHEMAS[type]
  if (!schema) return { errors: { type: 'Unknown form.' } }
  const errors = {}
  const fields = {}

  for (const [key, rule] of Object.entries(schema)) {
    let v = raw[key]
    if (rule.kind === 'multi') {
      if (v == null || v === '') v = []
      if (!Array.isArray(v)) v = [v]
      v = v.map(String)
      if (v.some((x) => !OPTIONS[key].includes(x))) { errors[key] = 'Invalid selection.'; continue }
      if (v.length) fields[key] = [...new Set(v)]
      continue
    }
    v = typeof v === 'string' ? v.trim() : v == null ? '' : null
    if (v === null) { errors[key] = 'Invalid value.'; continue }
    if (!v) {
      if (rule.required) errors[key] = 'This field is required.'
      continue
    }
    switch (rule.kind) {
      case 'text':
        if (v.length > rule.max) errors[key] = `Please keep this under ${rule.max} characters.`
        else if (key === 'name' && !/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]{1,}$/u.test(v)) errors[key] = 'Please enter your name (letters only).'
        break
      case 'email':
        if (!isEmail(v)) errors[key] = 'Please enter a valid email address.'
        break
      case 'phone':
        if (!isPhone(v)) errors[key] = 'Please enter a valid phone number (7–15 digits, e.g. +91 98XXX XXXXX).'
        else v = normalisePhone(v)
        break
      case 'url':
        try {
          const u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`)
          if (!/^https?:$/.test(u.protocol) || !u.hostname.includes('.') || v.length > 300) throw new Error()
        } catch { errors[key] = 'Please enter a valid website address.' }
        break
      case 'date':
        if (!/^\d{4}-\d{2}-\d{2}$/.test(v) || Number.isNaN(Date.parse(v))) errors[key] = 'Please pick a valid date.'
        else if (v < todayIST()) errors[key] = 'Please pick today or a future date.'
        break
      case 'select':
        if (!OPTIONS[key].includes(v)) errors[key] = 'Invalid selection.'
        break
    }
    if (!errors[key]) fields[key] = v
  }
  return Object.keys(errors).length ? { errors } : { fields }
}

// ---------------------------------------------------------------- storage

const DATA_DIR = path.resolve(process.env.LEADS_DIR || path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data'))
const LEADS_FILE = path.join(DATA_DIR, 'leads.jsonl')
const NOTIFY_FILE = path.join(DATA_DIR, 'notifications.jsonl')

function ensureDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true, mode: 0o700 })
}

async function appendLine(file, obj) {
  ensureDir()
  const fh = await fs.promises.open(file, 'a', 0o600)
  try {
    await fh.appendFile(JSON.stringify(obj) + '\n', 'utf8')
    await fh.sync()
  } finally {
    await fh.close()
  }
}

function readLines(file) {
  try {
    return fs.readFileSync(file, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l) } catch { return null } }).filter(Boolean)
  } catch { return [] }
}

export const leadsPaths = { DATA_DIR, LEADS_FILE, NOTIFY_FILE }
export const readLeads = () => readLines(LEADS_FILE)

// ---------------------------------------------------------------- email

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

let transporter = null
export const emailConfigured = () => !!(SMTP.host && SMTP.user && SMTP.pass && NOTIFY_TO.length)
function getTransport() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP.host, port: SMTP.port, secure: SMTP.secure,
      auth: { user: SMTP.user, pass: SMTP.pass },
      connectionTimeout: 15_000, greetingTimeout: 15_000, socketTimeout: 20_000,
    })
  }
  return transporter
}

function buildEmail(lead) {
  const rows = Object.entries(lead.fields).map(([k, v]) => [LABELS[k] || k, Array.isArray(v) ? v.join(', ') : v])
  rows.push(['Form', FORM_LABELS[lead.type] || lead.type])
  if (lead.pageUrl) rows.push(['Page', lead.pageUrl])
  if (lead.utm && Object.keys(lead.utm).length) rows.push(['Campaign', Object.entries(lead.utm).map(([k, v]) => `${k}=${v}`).join(' · ')])
  rows.push(['Consent', `Given at ${lead.consent.at} (notice v${lead.consent.version})${lead.consent.marketing ? ' · also opted in to marketing updates' : ' · enquiry only (no marketing)'}`])
  rows.push(['Lead ID', lead.id])

  const who = lead.fields.name || lead.fields.email || 'website visitor'
  const subject = `New lead: ${FORM_LABELS[lead.type] || lead.type} — ${who}`.replace(/[\r\n]+/g, ' ').slice(0, 180)
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')
  const html = '<div style="font-family:Arial,sans-serif;max-width:620px;border:1px solid #eee;border-radius:8px;overflow:hidden">'
    + `<div style="background:#C2410C;color:#fff;padding:14px 18px;font-size:17px;font-weight:bold">${escapeHtml(subject)}</div>`
    + '<table style="width:100%;border-collapse:collapse;font-size:14px;color:#222">'
    + rows.map(([k, v]) => `<tr><td style="padding:9px 18px;border-bottom:1px solid #f2f2f2;width:150px;font-weight:bold;vertical-align:top">${escapeHtml(k)}</td><td style="padding:9px 18px;border-bottom:1px solid #f2f2f2;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`).join('')
    + '</table></div>'
  return { subject, text, html }
}

async function sendEmail(lead) {
  const { subject, text, html } = buildEmail(lead)
  await getTransport().sendMail({
    from: { name: 'AI Agentix Website', address: FROM },
    to: NOTIFY_TO,
    replyTo: lead.fields.email || undefined,
    subject, text, html,
  })
}

// ---------------------------------------------------------------- Google Sheet

// A Google Apps Script web app bound to the leads spreadsheet (see
// server/docs/google-sheet-apps-script.gs). It checks the shared token and appends one row.
const SHEET_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL || ''
const SHEET_TOKEN = process.env.GOOGLE_SHEET_WEBHOOK_TOKEN || ''
export const sheetConfigured = () => !!(SHEET_URL && SHEET_TOKEN)

// Spreadsheet apps treat cells starting with = + - @ as formulas; neutralise them.
const sheetSafe = (v) => {
  const s = Array.isArray(v) ? v.join(', ') : String(v ?? '')
  return /^[=+\-@\t\r]/.test(s) ? `'${s}` : s
}

export function sheetRow(lead) {
  const f = lead.fields
  const details = Object.entries(f)
    .filter(([k]) => !['name', 'phone', 'email', 'company', 'agency'].includes(k))
    .map(([k, v]) => `${LABELS[k] || k}: ${Array.isArray(v) ? v.join(', ') : v}`)
    .join(' | ')
  return {
    token: SHEET_TOKEN,
    row: [
      lead.receivedAt, lead.id, FORM_LABELS[lead.type] || lead.type,
      f.name, f.phone, f.email, f.company || f.agency, details,
      lead.pageUrl, Object.entries(lead.utm || {}).map(([k, v]) => `${k}=${v}`).join(' '),
      `Yes (v${lead.consent.version}, ${lead.consent.at})${lead.consent.marketing ? ' + marketing' : ''}`,
    ].map(sheetSafe),
  }
}

async function sendSheet(lead) {
  const res = await fetch(SHEET_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sheetRow(lead)),
    redirect: 'follow', // Apps Script answers through a googleusercontent.com redirect
    signal: AbortSignal.timeout(15_000),
  })
  const body = await res.text()
  let json = null
  try { json = JSON.parse(body) } catch { /* HTML error page */ }
  if (!res.ok || !json?.ok) throw new Error(`sheet responded ${res.status}${json?.error ? `: ${json.error}` : ''}`)
}

// ---------------------------------------------------------------- delivery channels

const CHANNELS = [
  { name: 'email', enabled: emailConfigured, send: sendEmail },
  { name: 'sheet', enabled: sheetConfigured, send: sendSheet },
]

export const channelStatus = () => CHANNELS.map((c) => `${c.name}: ${c.enabled() ? 'on' : 'OFF'}`).join(' · ')

async function deliver(lead, channel) {
  await channel.send(lead)
  await appendLine(NOTIFY_FILE, { id: lead.id, channel: channel.name, status: 'sent', at: new Date().toISOString() })
  console.log(`[leads] ${channel.name} delivered ${lead.id}`)
}

function deliverAll(lead) {
  for (const c of CHANNELS) {
    if (!c.enabled()) continue
    deliver(lead, c).catch((err) => console.error(`[leads] ${c.name} pending ${lead.id}: ${err.message}`))
  }
}

// Background retry: any stored lead without a "sent" record for an enabled channel is re-sent.
let retrying = false
export async function retryPendingNotifications() {
  if (retrying) return 0
  retrying = true
  let sent = 0
  try {
    const log = readLines(NOTIFY_FILE).filter((n) => n.status === 'sent')
    const leads = readLeads()
    for (const c of CHANNELS) {
      if (!c.enabled()) continue
      // records written before channels existed have no `channel` and were emails
      const done = new Set(log.filter((n) => (n.channel || 'email') === c.name).map((n) => n.id))
      for (const lead of leads.filter((l) => !done.has(l.id)).slice(0, 20)) {
        try {
          await deliver(lead, c)
          sent++
        } catch (err) {
          console.error(`[leads] ${c.name} retry failed for ${lead.id}: ${err.message}`)
          break // the channel is probably still down; try again next cycle
        }
      }
    }
  } finally {
    retrying = false
  }
  return sent
}

// ---------------------------------------------------------------- rate limiting

function makeLimiter(limits) {
  const hits = new Map()
  setInterval(() => {
    const now = Date.now()
    const longest = Math.max(...limits.map((l) => l.window))
    for (const [k, arr] of hits) {
      const kept = arr.filter((t) => now - t < longest)
      if (kept.length) hits.set(k, kept); else hits.delete(k)
    }
  }, 10 * 60_000).unref()
  return (key) => {
    const now = Date.now()
    const arr = hits.get(key) || []
    for (const l of limits) {
      if (arr.filter((t) => now - t < l.window).length >= l.max) return false
    }
    arr.push(now)
    hits.set(key, arr)
    return true
  }
}
const leadLimiter = makeLimiter([{ window: 60_000, max: 5 }, { window: 24 * 3600_000, max: 30 }])

// ---------------------------------------------------------------- request handler

const fail = (res, status, message, errors) => res.status(status).json({ ok: false, message, ...(errors ? { errors } : {}) })

// Normalises the two body shapes we accept:
//  - JSON from the contact page / footer: { type, fields, consent, hp, elapsed, pageUrl, utm }
//  - multipart FormData from the floating lead widget (lead-widget.js): flat fields,
//    form_source=popup, website=<honeypot>, form_elapsed, page_url, consent=yes
function normaliseBody(body = {}) {
  if (body.form_source !== undefined || body.ajax !== undefined) {
    const { name, phone, email, message } = body
    return {
      type: body.form_source === 'popup' ? 'popup' : String(body.form_source || ''),
      fields: { name, phone, email, message },
      consent: body.consent === 'yes' || body.consent === 'on' || body.consent === 'true',
      marketing: body.marketing_consent === 'yes' || body.marketing_consent === 'on',
      hp: body.website || '',
      elapsed: Number(body.form_elapsed),
      pageUrl: body.page_url,
      utm: {},
    }
  }
  return {
    type: body.type,
    fields: body.fields && typeof body.fields === 'object' ? body.fields : {},
    consent: body.consent === true,
    marketing: body.marketingConsent === true || body.type === 'newsletter',
    hp: body.hp || '',
    elapsed: Number(body.elapsed),
    pageUrl: body.pageUrl,
    utm: body.utm,
  }
}

function cleanUtm(utm) {
  if (!utm || typeof utm !== 'object') return {}
  const out = {}
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid']) {
    if (typeof utm[k] === 'string' && utm[k]) out[k] = utm[k].slice(0, 120)
  }
  return out
}

function cleanPageUrl(u, origins) {
  if (typeof u !== 'string') return ''
  try {
    const url = new URL(u)
    return origins.includes(url.origin) ? (url.origin + url.pathname).slice(0, 300) : ''
  } catch { return '' }
}

export function leadHandler({ origins }) {
  return async (req, res) => {
    const ip = req.ip || 'unknown'
    if (!leadLimiter(ip)) return fail(res, 429, 'Too many submissions. Please wait a minute and try again, or WhatsApp us.')

    const b = normaliseBody(req.body)

    // Bots: honeypot filled or submitted faster than a human can type. Answer OK so
    // they don't retry, but record nothing.
    if (b.hp || (Number.isFinite(b.elapsed) && b.elapsed < 2)) {
      return res.json({ ok: true, id: 'ok' })
    }

    if (!SCHEMAS[b.type]) return fail(res, 400, 'Unknown form.')
    if (!b.consent) {
      return fail(res, 400, 'Please tick the consent box so we can contact you about your enquiry.', { consent: 'Consent is required.' })
    }
    const { errors, fields } = validateLead(b.type, b.fields)
    if (errors) {
      const first = Object.values(errors)[0]
      return fail(res, 400, first, errors)
    }

    const now = new Date()
    const lead = {
      id: `L${now.toISOString().slice(0, 10).replace(/-/g, '')}-${crypto.randomBytes(4).toString('hex')}`,
      receivedAt: now.toISOString(),
      type: b.type,
      fields,
      consent: { given: true, marketing: !!b.marketing, version: CONSENT_VERSION, at: now.toISOString() },
      pageUrl: cleanPageUrl(b.pageUrl, origins),
      utm: cleanUtm(b.utm),
      ip,
      userAgent: String(req.get('user-agent') || '').slice(0, 200),
    }

    try {
      await appendLine(LEADS_FILE, lead)
    } catch (err) {
      console.error(`[leads] STORE FAILED ${lead.id}: ${err.message}`)
      return fail(res, 500, 'Sorry, we could not save your request right now. Please WhatsApp or call us.')
    }
    console.log(`[leads] stored ${lead.id} type=${lead.type}`)

    // The lead is safe on disk; email + Google Sheet delivery is retried in the background.
    deliverAll(lead)

    res.json({ ok: true, id: lead.id })
  }
}
