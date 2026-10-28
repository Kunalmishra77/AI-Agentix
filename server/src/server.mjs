import 'dotenv/config'
import { createApp } from './app.mjs'
import { getStats } from './rag.mjs'
import { channelStatus, retryPendingNotifications, leadsPaths } from './leads.mjs'

const PORT = process.env.PORT || 5000

const app = createApp()
const kb = getStats()
console.log(`[assistant] knowledge: ${kb.chunks} chunks · embeddings: ${kb.hasEmbeddings ? 'yes' : 'no (lexical fallback)'} · LLM: ${process.env.OPENAI_API_KEY ? 'configured' : 'not configured'}`)
console.log(`[leads] storing in ${leadsPaths.DATA_DIR} · ${channelStatus()}`)

// Re-deliver any lead whose email / Google Sheet delivery failed earlier (outage, restart, …).
setInterval(() => { retryPendingNotifications().catch(() => {}) }, 5 * 60_000).unref()
setTimeout(() => { retryPendingNotifications().catch(() => {}) }, 10_000).unref()

// HOST unset = Node default (all interfaces), as before. Set HOST=127.0.0.1 when nginx is on the same machine.
app.listen(PORT, process.env.HOST || undefined, () => console.log(`[api] listening on port ${PORT}`))
