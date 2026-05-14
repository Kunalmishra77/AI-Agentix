-- ─── Unified Demo Bookings Table ─────────────────────────────────────────────
-- Captures all demo bookings regardless of source: voice agent, chat agent, or
-- manual calendar picker on /demo. Replaces scattered writes to voice_agent_leads.

CREATE TABLE IF NOT EXISTS demo_bookings (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  source            TEXT        NOT NULL CHECK (source IN ('voice', 'chat', 'manual')),
  name              TEXT        NOT NULL,
  email             TEXT        NOT NULL,
  company           TEXT,
  solution_need     TEXT,
  preferred_date    TEXT,
  preferred_time    TEXT,
  calendar_event_id TEXT,
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_demo_bookings_email      ON demo_bookings (email);
CREATE INDEX IF NOT EXISTS idx_demo_bookings_source     ON demo_bookings (source);
CREATE INDEX IF NOT EXISTS idx_demo_bookings_created    ON demo_bookings (created_at DESC);

-- Enable Row Level Security (access via service role key only)
ALTER TABLE demo_bookings ENABLE ROW LEVEL SECURITY;
