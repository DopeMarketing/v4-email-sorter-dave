BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  email text NOT NULL,
  name text NOT NULL,
  phone_number text,
  timezone text NOT NULL,
  preferences jsonb NOT NULL DEFAULT '{}'
);

CREATE UNIQUE INDEX users_email_idx ON users(email);
CREATE INDEX users_created_at_idx ON users(created_at);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_all" ON users FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

-- Email accounts table
CREATE TABLE email_accounts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email_address text NOT NULL,
  provider text NOT NULL,
  access_token text,
  refresh_token text,
  is_active boolean NOT NULL DEFAULT true,
  last_sync_at timestamptz
);

CREATE INDEX email_accounts_user_id_idx ON email_accounts(user_id);
CREATE UNIQUE INDEX email_accounts_email_address_idx ON email_accounts(email_address);
CREATE INDEX email_accounts_created_at_idx ON email_accounts(created_at);

ALTER TABLE email_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_all" ON email_accounts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

-- Emails table
CREATE TABLE emails (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email_account_id uuid NOT NULL REFERENCES email_accounts(id) ON DELETE CASCADE,
  external_id text NOT NULL,
  thread_id text,
  subject text NOT NULL,
  sender_email text NOT NULL,
  sender_name text,
  body_text text,
  body_html text,
  received_at timestamptz NOT NULL,
  priority text,
  category text,
  classification_confidence numeric,
  needs_response boolean NOT NULL DEFAULT false,
  is_processed boolean NOT NULL DEFAULT false,
  metadata jsonb NOT NULL DEFAULT '{}'
);

CREATE INDEX emails_user_id_idx ON emails(user_id);
CREATE INDEX emails_email_account_id_idx ON emails(email_account_id);
CREATE INDEX emails_external_id_idx ON emails(external_id);
CREATE INDEX emails_priority_idx ON emails(priority);
CREATE INDEX emails_category_idx ON emails(category);
CREATE INDEX emails_received_at_idx ON emails(received_at);
CREATE INDEX emails_created_at_idx ON emails(created_at);

ALTER TABLE emails ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_all" ON emails FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

-- Contacts table
CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email_address text NOT NULL,
  name text,
  company text,
  hubspot_contact_id text,
  interaction_history jsonb NOT NULL DEFAULT '{}',
  preferences jsonb NOT NULL DEFAULT '{}',
  last_interaction_at timestamptz
);

CREATE INDEX contacts_user_id_idx ON contacts(user_id);
CREATE INDEX contacts_email_address_idx ON contacts(email_address);
CREATE INDEX contacts_hubspot_contact_id_idx ON contacts(hubspot_contact_id);
CREATE INDEX contacts_created_at_idx ON contacts(created_at);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_all" ON contacts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

-- Draft responses table
CREATE TABLE draft_responses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email_id uuid NOT NULL REFERENCES emails(id) ON DELETE CASCADE,
  subject text NOT NULL,
  body_text text NOT NULL,
  body_html text,
  tone text,
  confidence_score numeric,
  status text NOT NULL DEFAULT 'pending',
  approved_at timestamptz,
  sent_at timestamptz,
  generation_metadata jsonb NOT NULL DEFAULT '{}'
);

CREATE INDEX draft_responses_user_id_idx ON draft_responses(user_id);
CREATE INDEX draft_responses_email_id_idx ON draft_responses(email_id);
CREATE INDEX draft_responses_status_idx ON draft_responses(status);
CREATE INDEX draft_responses_created_at_idx ON draft_responses(created_at);

ALTER TABLE draft_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_all" ON draft_responses FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

-- SMS notifications table
CREATE TABLE sms_notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  draft_response_id uuid REFERENCES draft_responses(id) ON DELETE SET NULL,
  phone_number text NOT NULL,
  message_text text NOT NULL,
  twilio_sid text,
  status text NOT NULL DEFAULT 'queued',
  sent_at timestamptz,
  approval_token text
);

CREATE INDEX sms_notifications_user_id_idx ON sms_notifications(user_id);
CREATE INDEX sms_notifications_draft_response_id_idx ON sms_notifications(draft_response_id);
CREATE INDEX sms_notifications_approval_token_idx ON sms_notifications(approval_token);
CREATE INDEX sms_notifications_status_idx ON sms_notifications(status);
CREATE INDEX sms_notifications_created_at_idx ON sms_notifications(created_at);

ALTER TABLE sms_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_all" ON sms_notifications FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

-- Approval actions table
CREATE TABLE approval_actions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  draft_response_id uuid NOT NULL REFERENCES draft_responses(id) ON DELETE CASCADE,
  action text NOT NULL,
  source text NOT NULL,
  edited_content text,
  voice_message_url text,
  transcribed_text text,
  approval_token text
);

CREATE INDEX approval_actions_user_id_idx ON approval_actions(user_id);
CREATE INDEX approval_actions_draft_response_id_idx ON approval_actions(draft_response_id);
CREATE INDEX approval_actions_approval_token_idx ON approval_actions(approval_token);
CREATE INDEX approval_actions_created_at_idx ON approval_actions(created_at);

ALTER TABLE approval_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_all" ON approval_actions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

COMMIT;