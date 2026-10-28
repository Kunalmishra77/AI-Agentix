// Run: npm test   (node:test, no extra dependencies)
import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'agx-leads-'))
process.env.LEADS_DIR = DIR
process.env.ALLOWED_ORIGINS = 'https://ai-agentix.com'
process.env.NODE_ENV = 'production'
delete process.env.OPENAI_API_KEY
delete process.env.SMTP_HOST
delete process.env.GOOGLE_SHEET_WEBHOOK_URL

const { createApp } = await import('../src/app.mjs')
const { validateLead, readLeads, sheetRow } = await import('../src/leads.mjs')

let server, base
const ORIGIN = 'https://ai-agentix.com'
let ipCounter = 1
// Each test gets its own client IP (via X-Forwarded-For, one trusted hop) so rate limits don't collide.
const post = (body, { origin = ORIGIN, ip = `10.0.0.${ipCounter++}`, json = true } = {}) =>
  fetch(`${base}/api/leads`, {
    method: 'POST',
    headers: { ...(json ? { 'Content-Type': 'application/json' } : {}), ...(origin ? { Origin: origin } : {}), 'X-Forwarded-For': ip },
    body: json ? JSON.stringify(body) : body,
  })

const future = new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10)
const audit = (fields = {}, extra = {}) => ({
  type: 'audit', consent: true, hp: '', elapsed: 12, pageUrl: 'https://ai-agentix.com/contact',
  fields: { name: 'Audit Test', phone: '+91 98765 43210', email: 'test@example.invalid', automate: ['Lead Follow-up'], ...fields },
  ...extra,
})

before(async () => {
  server = createApp().listen(0)
  await new Promise((r) => server.once('listening', r))
  base = `http://127.0.0.1:${server.address().port}`
})
after(() => { server.close(); fs.rmSync(DIR, { recursive: true, force: true }) })

test('valid audit lead is stored and returns an id', async () => {
  const res = await post(audit())
  const json = await res.json()
  assert.equal(res.status, 200)
  assert.equal(json.ok, true)
  assert.match(json.id, /^L\d{8}-[0-9a-f]{8}$/)
  const stored = readLeads().find((l) => l.id === json.id)
  assert.ok(stored, 'lead written to disk')
  assert.equal(stored.fields.phone, '+919876543210')
  assert.equal(stored.consent.given, true)
  assert.equal(stored.pageUrl, 'https://ai-agentix.com/contact')
})

test('missing required fields are rejected with field errors', async () => {
  const res = await post(audit({ name: '', email: '' }))
  const json = await res.json()
  assert.equal(res.status, 400)
  assert.equal(json.ok, false)
  assert.ok(json.errors.name && json.errors.email)
})

test('bad email and bad phone are rejected', async () => {
  let json = await (await post(audit({ email: 'not-an-email' }))).json()
  assert.ok(json.errors.email)
  json = await (await post(audit({ phone: '12ab' }))).json()
  assert.ok(json.errors.phone)
  json = await (await post(audit({ phone: '123' }))).json()
  assert.ok(json.errors.phone)
})

test('consent is mandatory', async () => {
  const res = await post(audit({}, { consent: false }))
  assert.equal(res.status, 400)
  assert.ok((await res.json()).errors.consent)
})

test('honeypot submissions get a fake ok and are not stored', async () => {
  const before = readLeads().length
  const res = await post(audit({}, { hp: 'http://spam.example' }))
  assert.equal((await res.json()).ok, true)
  assert.equal(readLeads().length, before)
})

test('select values outside the allowed list are rejected', async () => {
  const json = await (await post(audit({ industry: '<script>' }))).json()
  assert.ok(json.errors.industry)
})

test('demo date in the past is rejected, future accepted', async () => {
  const demo = (date) => ({ type: 'demo', consent: true, elapsed: 9, fields: { name: 'Audit Test', email: 'test@example.invalid', date, timeSlot: 'Morning (10 AM – 12 PM)' } })
  assert.equal((await post(demo('2020-01-01'))).status, 400)
  assert.equal((await post(demo(future))).status, 200)
})

test('foreign origin and missing origin are refused in production', async () => {
  assert.equal((await post(audit(), { origin: 'https://evil.example' })).status, 403)
  assert.equal((await post(audit(), { origin: null })).status, 403)
})

test('multipart submission from the floating lead widget is accepted', async () => {
  const fd = new FormData()
  fd.append('form_source', 'popup'); fd.append('ajax', '1'); fd.append('form_elapsed', '8')
  fd.append('name', 'Audit Test'); fd.append('phone', '9876543210'); fd.append('email', '')
  fd.append('message', 'AUDIT TEST'); fd.append('website', ''); fd.append('consent', 'yes')
  fd.append('page_url', 'https://ai-agentix.com/')
  const res = await post(fd, { json: false })
  const json = await res.json()
  assert.equal(res.status, 200, JSON.stringify(json))
  assert.equal(readLeads().find((l) => l.id === json.id).type, 'popup')
})

test('widget without consent is refused with a readable message', async () => {
  const fd = new FormData()
  fd.append('form_source', 'popup'); fd.append('form_elapsed', '8'); fd.append('name', 'Audit Test'); fd.append('phone', '9876543210')
  const res = await post(fd, { json: false })
  assert.equal(res.status, 400)
  assert.match((await res.json()).message, /consent/i)
})

test('rate limit: 6th submission in a minute from one IP gets 429', async () => {
  const ip = '10.9.9.9'
  for (let i = 0; i < 5; i++) assert.equal((await post(audit(), { ip })).status, 200)
  assert.equal((await post(audit(), { ip })).status, 429)
})

test('malformed JSON returns a generic error without a stack trace', async () => {
  const res = await fetch(`${base}/api/leads`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: ORIGIN, 'X-Forwarded-For': '10.8.8.8' }, body: '{"type":' })
  const text = await res.text()
  assert.equal(res.status, 400)
  assert.doesNotMatch(text, /at |SyntaxError|node_modules/)
})

test('health exposes nothing internal; x-powered-by is off', async () => {
  const res = await fetch(`${base}/api/health`)
  assert.deepEqual(await res.json(), { ok: true })
  assert.equal(res.headers.get('x-powered-by'), null)
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff')
})

test('chat rejects oversized messages', async () => {
  const res = await fetch(`${base}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: ORIGIN }, body: JSON.stringify({ message: 'x'.repeat(1001) }) })
  assert.equal(res.status, 400)
})

test('validateLead: names in any script are accepted; formula-looking sheet cells are neutralised', () => {
  assert.ok(validateLead('popup', { name: 'राजेश कुमार', phone: '9876543210' }).fields)
  const row = sheetRow({ id: 'L1', receivedAt: 'x', type: 'popup', fields: { name: '=HYPERLINK("x")', phone: '+91' }, pageUrl: '', utm: {}, consent: { version: 'v', at: 't' } }).row
  assert.equal(row[3], `'=HYPERLINK("x")`)
  assert.equal(row[4], `'+91`)
})
