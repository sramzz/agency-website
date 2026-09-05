ALTER TABLE leads
  ADD COLUMN business_website TEXT NOT NULL DEFAULT ''
  CHECK (length(business_website) <= 2048);
