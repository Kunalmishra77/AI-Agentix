# AI Agentix — Website Assistant (backend)

A small Node/Express service that powers the on-site AI assistant. It answers **only
from the website's own content** (RAG) and can tell the frontend where to navigate.

- No database. The knowledge base is a JSON file built from `frontend/src/data/**`,
  and vector search runs in-memory.
- The OpenAI key lives here (server-side) only — never in the frontend bundle.

## Setup

```bash
cd server
npm install
cp .env.example .env          # then paste your OPENAI_API_KEY into .env
npm run prepare:kb            # build knowledge.json + generate embeddings
npm run start                 # serves http://localhost:5000  (Vite proxies /api here)
```

Scripts:
| Script | What it does |
|---|---|
| `npm run build:kb` | Extract `src/knowledge.json` from the frontend data (no key needed) |
| `npm run embed` | Create `src/knowledge.embeddings.json` (needs `OPENAI_API_KEY`) |
| `npm run prepare:kb` | Both of the above |
| `npm run dev` | Start with `--watch` |
| `npm run start` | Start the server |

Re-run `npm run prepare:kb` whenever the site content changes.

## Endpoints
- `GET /api/health` → `{ ok, chunks, hasEmbeddings, configured }`
- `POST /api/chat` → body `{ message, history?, context?: { route, section } }`
  → `{ reply, action: { navigate, anchor, highlight } | null, sources }`

## Notes
- Without a key the server still runs (lexical keyword fallback) so the UI can be
  developed; add the key + embeddings for accurate, generated answers.
- CORS is locked to `ALLOWED_ORIGINS`; there's a simple per-IP rate limit; AI-produced
  navigation is validated against a route allow-list.
- Deploy: run this behind nginx at `/api` (same origin as the site).
