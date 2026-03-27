import { createClient } from '@supabase/supabase-js'
import { Database, User, EmailAccount, Email, Contact, DraftResponse, SmsNotification, ApprovalAction } from '@/types'

const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// Users
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false })
  if (error) throw new Error(`Failed to fetch users: ${error.message}`)
  return data
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single()
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch user: ${error.message}`)
  return data
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase.from('users').insert(user).select().single()
  if (error) throw new Error(`Failed to create user: ${error.message}`)
  return data
}

export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>): Promise<User> {
  const { data, error } = await supabase.from('users').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) throw new Error(`Failed to update user: ${error.message}`)
  return data
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase.from('users').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete user: ${error.message}`)
}

// Email Accounts
export async function getAllEmailAccounts(userId: string): Promise<EmailAccount[]> {
  const { data, error } = await supabase.from('email_accounts').select('*').eq('user_id', userId).order('created_at', { ascending: false })
  if (error) throw new Error(`Failed to fetch email accounts: ${error.message}`)
  return data
}

export async function getEmailAccountById(id: string): Promise<EmailAccount | null> {
  const { data, error } = await supabase.from('email_accounts').select('*').eq('id', id).single()
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch email account: ${error.message}`)
  return data
}

export async function createEmailAccount(emailAccount: Omit<EmailAccount, 'id' | 'created_at' | 'updated_at'>): Promise<EmailAccount> {
  const { data, error } = await supabase.from('email_accounts').insert(emailAccount).select().single()
  if (error) throw new Error(`Failed to create email account: ${error.message}`)
  return data
}

export async function updateEmailAccount(id: string, updates: Partial<Omit<EmailAccount, 'id' | 'created_at' | 'updated_at'>>): Promise<EmailAccount> {
  const { data, error } = await supabase.from('email_accounts').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) throw new Error(`Failed to update email account: ${error.message}`)
  return data
}

export async function deleteEmailAccount(id: string): Promise<void> {
  const { error } = await supabase.from('email_accounts').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete email account: ${error.message}`)
}

// Emails
export async function getAllEmails(userId: string, limit = 50): Promise<Email[]> {
  const { data, error } = await supabase.from('emails').select('*').eq('user_id', userId).order('received_at', { ascending: false }).limit(limit)
  if (error) throw new Error(`Failed to fetch emails: ${error.message}`)
  return data
}

export async function getEmailById(id: string): Promise<Email | null> {
  const { data, error } = await supabase.from('emails').select('*').eq('id', id).single()
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch email: ${error.message}`)
  return data
}

export async function createEmail(email: Omit<Email, 'id' | 'created_at' | 'updated_at'>): Promise<Email> {
  const { data, error } = await supabase.from('emails').insert(email).select().single()
  if (error) throw new Error(`Failed to create email: ${error.message}`)
  return data
}

export async function updateEmail(id: string, updates: Partial<Omit<Email, 'id' | 'created_at' | 'updated_at'>>): Promise<Email> {
  const { data, error } = await supabase.from('emails').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) throw new Error(`Failed to update email: ${error.message}`)
  return data
}

export async function deleteEmail(id: string): Promise<void> {
  const { error } = await supabase.from('emails').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete email: ${error.message}`)
}

// Contacts
export async function getAllContacts(userId: string): Promise<Contact[]> {
  const { data, error } = await supabase.from('contacts').select('*').eq('user_id', userId).order('last_interaction_at', { ascending: false, nullsLast: true })
  if (error) throw new Error(`Failed to fetch contacts: ${error.message}`)
  return data
}

export async function getContactById(id: string): Promise<Contact | null> {
  const { data, error } = await supabase.from('contacts').select('*').eq('id', id).single()
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch contact: ${error.message}`)
  return data
}

export async function createContact(contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>): Promise<Contact> {
  const { data, error } = await supabase.from('contacts').insert(contact).select().single()
  if (error) throw new Error(`Failed to create contact: ${error.message}`)
  return data
}

export async function updateContact(id: string, updates: Partial<Omit<Contact, 'id' | 'created_at' | 'updated_at'>>): Promise<Contact> {
  const { data, error } = await supabase.from('contacts').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) throw new Error(`Failed to update contact: ${error.message}`)
  return data
}

export async function deleteContact(id: string): Promise<void> {
  const { error } = await supabase.from('contacts').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete contact: ${error.message}`)
}

// Draft Responses
export async function getAllDraftResponses(userId: string): Promise<DraftResponse[]> {
  const { data, error } = await supabase.from('draft_responses').select('*').eq('user_id', userId).order('created_at', { ascending: false })
  if (error) throw new Error(`Failed to fetch draft responses: ${error.message}`)
  return data
}

export async function getDraftResponseById(id: string): Promise<DraftResponse | null> {
  const { data, error } = await supabase.from('draft_responses').select('*').eq('id', id).single()
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch draft response: ${error.message}`)
  return data
}

export async function createDraftResponse(draftResponse: Omit<DraftResponse, 'id' | 'created_at' | 'updated_at'>): Promise<DraftResponse> {
  const { data, error } = await supabase.from('draft_responses').insert(draftResponse).select().single()
  if (error) throw new Error(`Failed to create draft response: ${error.message}`)
  return data
}

export async function updateDraftResponse(id: string, updates: Partial<Omit<DraftResponse, 'id' | 'created_at' | 'updated_at'>>): Promise<DraftResponse> {
  const { data, error } = await supabase.from('draft_responses').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) throw new Error(`Failed to update draft response: ${error.message}`)
  return data
}

export async function deleteDraftResponse(id: string): Promise<void> {
  const { error } = await supabase.from('draft_responses').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete draft response: ${error.message}`)
}

// SMS Notifications
export async function getAllSmsNotifications(userId: string): Promise<SmsNotification[]> {
  const { data, error } = await supabase.from('sms_notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false })
  if (error) throw new Error(`Failed to fetch SMS notifications: ${error.message}`)
  return data
}

export async function getSmsNotificationById(id: string): Promise<SmsNotification | null> {
  const { data, error } = await supabase.from('sms_notifications').select('*').eq('id', id).single()
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch SMS notification: ${error.message}`)
  return data
}

export async function createSmsNotification(smsNotification: Omit<SmsNotification, 'id' | 'created_at' | 'updated_at'>): Promise<SmsNotification> {
  const { data, error } = await supabase.from('sms_notifications').insert(smsNotification).select().single()
  if (error) throw new Error(`Failed to create SMS notification: ${error.message}`)
  return data
}

export async function updateSmsNotification(id: string, updates: Partial<Omit<SmsNotification, 'id' | 'created_at' | 'updated_at'>>): Promise<SmsNotification> {
  const { data, error } = await supabase.from('sms_notifications').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) throw new Error(`Failed to update SMS notification: ${error.message}`)
  return data
}

export async function deleteSmsNotification(id: string): Promise<void> {
  const { error } = await supabase.from('sms_notifications').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete SMS notification: ${error.message}`)
}

// Approval Actions
export async function getAllApprovalActions(userId: string): Promise<ApprovalAction[]> {
  const { data, error } = await supabase.from('approval_actions').select('*').eq('user_id', userId).order('created_at', { ascending: false })
  if (error) throw new Error(`Failed to fetch approval actions: ${error.message}`)
  return data
}

export async function getApprovalActionById(id: string): Promise<ApprovalAction | null> {
  const { data, error } = await supabase.from('approval_actions').select('*').eq('id', id).single()
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch approval action: ${error.message}`)
  return data
}

export async function createApprovalAction(approvalAction: Omit<ApprovalAction, 'id' | 'created_at' | 'updated_at'>): Promise<ApprovalAction> {
  const { data, error } = await supabase.from('approval_actions').insert(approvalAction).select().single()
  if (error) throw new Error(`Failed to create approval action: ${error.message}`)
  return data
}

export async function updateApprovalAction(id: string, updates: Partial<Omit<ApprovalAction, 'id' | 'created_at' | 'updated_at'>>): Promise<ApprovalAction> {
  const { data, error } = await supabase.from('approval_actions').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) throw new Error(`Failed to update approval action: ${error.message}`)
  return data
}

export async function deleteApprovalAction(id: string): Promise<void> {
  const { error } = await supabase.from('approval_actions').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete approval action: ${error.message}`)
}