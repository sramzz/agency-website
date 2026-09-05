CREATE TABLE leads_optional_fields (
  submission_id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL CHECK (length(first_name) BETWEEN 0 AND 80),
  last_name TEXT NOT NULL CHECK (length(last_name) BETWEEN 0 AND 80),
  company_name TEXT NOT NULL CHECK (length(company_name) BETWEEN 0 AND 120),
  business_website TEXT NOT NULL DEFAULT '' CHECK (length(business_website) <= 2048),
  email TEXT NOT NULL CHECK (
    email = '' OR (length(email) BETWEEN 3 AND 254 AND email = lower(email))
  ),
  phone TEXT NOT NULL CHECK (
    length(phone) BETWEEN 9 AND 16
    AND substr(phone, 1, 1) = '+'
    AND substr(phone, 2) NOT GLOB '*[^0-9]*'
  ),
  source_path TEXT NOT NULL CHECK (length(source_path) BETWEEN 1 AND 512),
  cta_label TEXT NOT NULL CHECK (length(cta_label) BETWEEN 1 AND 120),
  market TEXT NOT NULL CHECK (market IN ('Australia', 'Netherlands', 'LATAM', 'Not specified')),
  services_json TEXT NOT NULL CHECK (json_valid(services_json)),
  notice_version TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  notification_status TEXT NOT NULL DEFAULT 'pending' CHECK (
    notification_status IN ('pending', 'sending', 'sent', 'failed')
  ),
  notification_attempts INTEGER NOT NULL DEFAULT 0 CHECK (notification_attempts >= 0),
  notification_updated_at TEXT,
  notified_at TEXT
);

INSERT INTO leads_optional_fields (
  submission_id, first_name, last_name, company_name, business_website, email, phone,
  source_path, cta_label, market, services_json, notice_version, created_at, expires_at,
  notification_status, notification_attempts, notification_updated_at, notified_at
)
SELECT
  submission_id, first_name, last_name, company_name, business_website, email, phone,
  source_path, cta_label, market, services_json, notice_version, created_at, expires_at,
  notification_status, notification_attempts, notification_updated_at, notified_at
FROM leads;

DROP TABLE leads;
ALTER TABLE leads_optional_fields RENAME TO leads;

CREATE INDEX leads_expires_at_idx ON leads (expires_at);
CREATE INDEX leads_notification_status_updated_at_idx
  ON leads (notification_status, notification_updated_at);
