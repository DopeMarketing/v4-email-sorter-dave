export interface User {
  id: string;
  created_at: Date;
  updated_at: Date;
  email: string;
  name: string;
  phone_number: string | null;
  timezone: string;
  preferences: Record<string, any>;
}

export interface EmailAccount {
  id: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  email_address: string;
  provider: string;
  access_token: string | null;
  refresh_token: string | null;
  is_active: boolean;
  last_sync_at: Date | null;
}

export interface Email {
  id: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  email_account_id: string;
  external_id: string;
  thread_id: string | null;
  subject: string;
  sender_email: string;
  sender_name: string | null;
  body_text: string | null;
  body_html: string | null;
  received_at: Date;
  priority: string | null;
  category: string | null;
  classification_confidence: number | null;
  needs_response: boolean;
  is_processed: boolean;
  metadata: Record<string, any>;
}

export interface Contact {
  id: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  email_address: string;
  name: string | null;
  company: string | null;
  hubspot_contact_id: string | null;
  interaction_history: Record<string, any>;
  preferences: Record<string, any>;
  last_interaction_at: Date | null;
}

export interface DraftResponse {
  id: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  email_id: string;
  subject: string;
  body_text: string;
  body_html: string | null;
  tone: string | null;
  confidence_score: number | null;
  status: string;
  approved_at: Date | null;
  sent_at: Date | null;
  generation_metadata: Record<string, any>;
}

export interface SmsNotification {
  id: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  draft_response_id: string | null;
  phone_number: string;
  message_text: string;
  twilio_sid: string | null;
  status: string;
  sent_at: Date | null;
  approval_token: string | null;
}

export interface ApprovalAction {
  id: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  draft_response_id: string;
  action: string;
  source: string;
  edited_content: string | null;
  voice_message_url: string | null;
  transcribed_text: string | null;
  approval_token: string | null;
}

export interface Database {
  users: User;
  email_accounts: EmailAccount;
  emails: Email;
  contacts: Contact;
  draft_responses: DraftResponse;
  sms_notifications: SmsNotification;
  approval_actions: ApprovalAction;
}