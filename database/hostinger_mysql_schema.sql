-- ============================================================
-- AI Agentix — MySQL Schema for Hostinger
-- Paste this entire file into phpMyAdmin → SQL tab → Go
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';

-- ─── admins ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `admins` (
  `id`         CHAR(36)     NOT NULL PRIMARY KEY,
  `email`      VARCHAR(255) NOT NULL UNIQUE,
  `password`   TEXT         NOT NULL,
  `name`       VARCHAR(255) NOT NULL DEFAULT 'Admin',
  `created_at` DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── posts ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `posts` (
  `id`           CHAR(36)     NOT NULL PRIMARY KEY,
  `title`        TEXT         NOT NULL,
  `slug`         VARCHAR(500) NOT NULL UNIQUE,
  `excerpt`      TEXT,
  `content`      LONGTEXT,
  `cover_image`  TEXT,
  `categories`   JSON,
  `tags`         JSON,
  `author_name`  VARCHAR(255) DEFAULT 'AI Agentix Team',
  `author_role`  VARCHAR(255) DEFAULT 'Editorial',
  `read_time`    INT          DEFAULT 5,
  `published_at` DATETIME(6)  NULL,
  `is_published` TINYINT(1)   NOT NULL DEFAULT 0,
  `created_at`   DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at`   DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  INDEX `idx_posts_published` (`is_published`),
  INDEX `idx_posts_created`   (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── case_studies ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `case_studies` (
  `id`          CHAR(36)     NOT NULL PRIMARY KEY,
  `title`       TEXT         NOT NULL,
  `slug`        VARCHAR(500) NOT NULL UNIQUE,
  `industry`    VARCHAR(255),
  `client`      VARCHAR(255),
  `challenge`   TEXT,
  `solution`    TEXT,
  `result`      TEXT,
  `metrics`     JSON,
  `cover_image` TEXT,
  `tags`        JSON,
  `is_featured` TINYINT(1)   NOT NULL DEFAULT 0,
  `published_at` DATETIME(6) NULL,
  `created_at`  DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at`  DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── services ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `services` (
  `id`          CHAR(36)     NOT NULL PRIMARY KEY,
  `title`       TEXT         NOT NULL,
  `slug`        VARCHAR(500) NOT NULL UNIQUE,
  `tagline`     TEXT,
  `description` LONGTEXT,
  `icon`        VARCHAR(255),
  `features`    JSON,
  `is_featured` TINYINT(1)   NOT NULL DEFAULT 0,
  `sort_order`  INT          DEFAULT 0,
  `created_at`  DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at`  DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── clients ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `clients` (
  `id`         CHAR(36)     NOT NULL PRIMARY KEY,
  `name`       VARCHAR(255) NOT NULL,
  `logo_url`   TEXT,
  `website`    TEXT,
  `sort_order` INT          DEFAULT 0,
  `created_at` DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── resources ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `resources` (
  `id`           CHAR(36)     NOT NULL PRIMARY KEY,
  `title`        TEXT         NOT NULL,
  `type`         VARCHAR(100) DEFAULT 'guide',
  `description`  TEXT,
  `download_url` TEXT,
  `cover_image`  TEXT,
  `is_featured`  TINYINT(1)   NOT NULL DEFAULT 0,
  `created_at`   DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at`   DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── team_members ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `team_members` (
  `id`         CHAR(36)     NOT NULL PRIMARY KEY,
  `name`       VARCHAR(255) NOT NULL,
  `role`       VARCHAR(255),
  `bio`        TEXT,
  `photo_url`  TEXT,
  `linkedin`   TEXT,
  `sort_order` INT          DEFAULT 0,
  `created_at` DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── awards ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `awards` (
  `id`         CHAR(36)     NOT NULL PRIMARY KEY,
  `title`      TEXT         NOT NULL,
  `issuer`     VARCHAR(255),
  `year`       INT,
  `badge_url`  TEXT,
  `sort_order` INT          DEFAULT 0,
  `created_at` DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── contacts ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `contacts` (
  `id`         CHAR(36)     NOT NULL PRIMARY KEY,
  `name`       VARCHAR(255) NOT NULL,
  `email`      VARCHAR(255) NOT NULL,
  `company`    VARCHAR(255),
  `phone`      VARCHAR(50),
  `service`    VARCHAR(255),
  `message`    TEXT         NOT NULL,
  `budget`     VARCHAR(100),
  `source`     VARCHAR(100) DEFAULT 'website',
  `status`     VARCHAR(50)  NOT NULL DEFAULT 'new',
  `created_at` DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  INDEX `idx_contacts_status`  (`status`),
  INDEX `idx_contacts_email`   (`email`),
  INDEX `idx_contacts_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── subscribers ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `subscribers` (
  `id`         CHAR(36)     NOT NULL PRIMARY KEY,
  `email`      VARCHAR(255) NOT NULL UNIQUE,
  `is_active`  TINYINT(1)   NOT NULL DEFAULT 1,
  `created_at` DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── voice_agent_leads ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS `voice_agent_leads` (
  `id`                CHAR(36)     NOT NULL PRIMARY KEY,
  `name`              VARCHAR(255) NOT NULL,
  `email`             VARCHAR(255) NOT NULL,
  `company`           VARCHAR(255),
  `solution_need`     TEXT,
  `preferred_date`    VARCHAR(50),
  `preferred_time`    VARCHAR(50),
  `calendar_event_id` VARCHAR(255),
  `created_at`        DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  INDEX `idx_voice_leads_email`   (`email`),
  INDEX `idx_voice_leads_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── demo_bookings ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `demo_bookings` (
  `id`                CHAR(36)     NOT NULL PRIMARY KEY,
  `source`            VARCHAR(50)  NOT NULL DEFAULT 'manual',
  `name`              VARCHAR(255) NOT NULL,
  `email`             VARCHAR(255) NOT NULL,
  `company`           VARCHAR(255),
  `solution_need`     TEXT,
  `preferred_date`    VARCHAR(50),
  `preferred_time`    VARCHAR(50),
  `calendar_event_id` VARCHAR(255),
  `notes`             TEXT,
  `created_at`        DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  INDEX `idx_demo_email`   (`email`),
  INDEX `idx_demo_source`  (`source`),
  INDEX `idx_demo_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
