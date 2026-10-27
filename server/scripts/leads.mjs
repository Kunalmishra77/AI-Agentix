// View or export stored website leads on the server.
//   npm run leads              → last 20 leads (summary)
//   npm run leads -- --csv > leads.csv   → every lead as CSV
//   npm run leads -- --pending → leads not yet delivered by email / Google Sheet
import 'dotenv/config'
import fs from 'node:fs'
import { readLeads, leadsPaths } from '../src/leads.mjs'

const args = process.argv.slice(2)
const leads = readLeads()

if (args.includes('--csv')) {
  const cols = ['receivedAt', 'id', 'type', 'name', 'phone', 'email', 'company', 'details', 'pageUrl', 'consentAt']
  const cell = (v) => {
    let s = String(v ?? '')
    if (/^[=+\-@]/.test(s)) s = `'${s}`
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  console.log(cols.join(','))
  for (const l of leads) {
    const { name, phone, email, company, agency, ...rest } = l.fields
    const details = Object.entries(rest).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join('; ') : v}`).join(' | ')
    console.log([l.receivedAt, l.id, l.type, name, phone, email, company || agency, details, l.pageUrl, l.consent?.at].map(cell).join(','))
  }
} else if (args.includes('--pending')) {
  let log = []
  try { log = fs.readFileSync(leadsPaths.NOTIFY_FILE, 'utf8').split('\n').filter(Boolean).map((x) => JSON.parse(x)) } catch {}
  for (const ch of ['email', 'sheet']) {
    const done = new Set(log.filter((n) => n.status === 'sent' && (n.channel || 'email') === ch).map((n) => n.id))
    const pending = leads.filter((l) => !done.has(l.id))
    console.log(`${ch}: ${pending.length} not delivered${pending.length ? ' → ' + pending.slice(-10).map((l) => l.id).join(', ') : ''}`)
  }
} else {
  console.log(`${leads.length} leads in ${leadsPaths.LEADS_FILE}\n`)
  for (const l of leads.slice(-20)) {
    console.log(`${l.receivedAt}  ${l.id}  ${l.type.padEnd(10)} ${l.fields.name || ''} · ${l.fields.phone || ''} · ${l.fields.email || ''}`)
  }
}
