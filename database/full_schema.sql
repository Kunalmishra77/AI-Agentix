-- AI Agentix Full Schema — run once in Supabase SQL Editor
-- (safe to re-run: all CREATE TABLE/INDEX use IF NOT EXISTS)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── admins ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  password    TEXT NOT NULL,
  name        TEXT NOT NULL DEFAULT 'Admin',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── posts ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  excerpt       TEXT,
  content       TEXT,
  cover_image   TEXT,
  categories    TEXT[] DEFAULT '{}',
  tags          TEXT[] DEFAULT '{}',
  author_name   TEXT DEFAULT 'AI Agentix Team',
  author_role   TEXT DEFAULT 'Editorial',
  read_time     INTEGER DEFAULT 5,
  published_at  TIMESTAMPTZ,
  is_published  BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── case_studies ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS case_studies (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  industry     TEXT,
  client       TEXT,
  challenge    TEXT,
  solution     TEXT,
  result       TEXT,
  metrics      JSONB DEFAULT '[]',
  cover_image  TEXT,
  tags         TEXT[] DEFAULT '{}',
  is_featured  BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── services ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  tagline      TEXT,
  description  TEXT,
  icon         TEXT,
  features     TEXT[] DEFAULT '{}',
  is_featured  BOOLEAN NOT NULL DEFAULT false,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── clients ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clients (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  logo_url    TEXT,
  website     TEXT,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── resources ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS resources (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  type          TEXT DEFAULT 'guide',
  description   TEXT,
  download_url  TEXT,
  cover_image   TEXT,
  is_featured   BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── team_members ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS team_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  role        TEXT,
  bio         TEXT,
  photo_url   TEXT,
  linkedin    TEXT,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── awards ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS awards (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  issuer       TEXT,
  year         INTEGER,
  badge_url    TEXT,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── contacts ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  company     TEXT,
  phone       TEXT,
  service     TEXT,
  message     TEXT NOT NULL,
  budget      TEXT,
  source      TEXT DEFAULT 'website',
  status      TEXT NOT NULL DEFAULT 'new',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_contacts_status     ON contacts (status);
CREATE INDEX IF NOT EXISTS idx_contacts_created    ON contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email      ON contacts (email);

-- ─── subscribers ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscribers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── voice_agent_leads ─────────────────────────────────────────────────────
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
CREATE INDEX IF NOT EXISTS idx_voice_leads_email   ON voice_agent_leads (email);
CREATE INDEX IF NOT EXISTS idx_voice_leads_created ON voice_agent_leads (created_at DESC);

-- ─── demo_bookings ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS demo_bookings (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  source            TEXT        NOT NULL DEFAULT 'manual',
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
CREATE INDEX IF NOT EXISTS idx_demo_bookings_email   ON demo_bookings (email);
CREATE INDEX IF NOT EXISTS idx_demo_bookings_source  ON demo_bookings (source);
CREATE INDEX IF NOT EXISTS idx_demo_bookings_created ON demo_bookings (created_at DESC);

-- ─── updated_at triggers ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['admins','posts','case_studies','services','resources'] LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS trg_%1$s_updated_at ON %1$s;
       CREATE TRIGGER trg_%1$s_updated_at
         BEFORE UPDATE ON %1$s
         FOR EACH ROW EXECUTE FUNCTION set_updated_at();',
      tbl
    );
  END LOOP;
END;
$$;
