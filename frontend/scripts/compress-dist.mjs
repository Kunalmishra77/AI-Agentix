// Post-build step: writes .gz and .br next to every text asset in dist/ so nginx can
// serve them directly (gzip_static / brotli_static) — JS/CSS were going out
// uncompressed (AGX-009). Uses only Node's built-in zlib.
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', process.env.OUT_DIR || 'dist')
const EXT = new Set(['.js', '.css', '.html', '.svg', '.json', '.xml', '.txt', '.ico'])
let files = 0, before = 0, afterBr = 0

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) { walk(p); continue }
    if (!EXT.has(path.extname(p)) || entry.name.endsWith('.gz') || entry.name.endsWith('.br')) continue
    const buf = fs.readFileSync(p)
    if (buf.length < 1024) continue
    const gz = zlib.gzipSync(buf, { level: 9 })
    const br = zlib.brotliCompressSync(buf, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11, [zlib.constants.BROTLI_PARAM_SIZE_HINT]: buf.length } })
    fs.writeFileSync(p + '.gz', gz)
    fs.writeFileSync(p + '.br', br)
    files++; before += buf.length; afterBr += br.length
  }
}
walk(dist)
console.log(`[compress-dist] ${files} files · ${(before / 1024).toFixed(0)} kB → ${(afterBr / 1024).toFixed(0)} kB brotli`)
