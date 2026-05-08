-- ─── Voice Agent Leads Table ─────────────────────────────────────────────────
-- Run this once in your Supabase SQL editor:
-- https://supabase.com/dashboard → SQL Editor → New Query → paste & run

CREATE TABLE IF NOT EXISTS voice_agent_leads (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  email             TEXT NOT NULL,
  company           TEXT,
  solution_need     TEXT,
  preferred_date    TEXT,
  preferred_time    TEXT,
  calendar_event_id TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for quick lookup by email
CREATE INDEX IF NOT EXISTS idx_voice_leads_email ON voice_agent_leads(email);

-- Index for time-based reporting
CREATE INDEX IF NOT EXISTS idx_voice_leads_created ON voice_agent_leads(created_at DESC);

-- Optional: enable Row Level Security
ALTER TABLE voice_agent_leads ENABLE ROW LEVEL SECURITY;

-- Allow your service role (backend) to insert/select
-- (adjust if you use a specific role)
CREATE POLICY "service_role_all" ON voice_agent_leads
  FOR ALL USING (true);
