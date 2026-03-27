import { google } from 'googleapis';

const gmail = google.gmail({
  version: 'v1',
  auth: new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GMAIL_CLIENT_EMAIL,
      private_key: process.env.GMAIL_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
  }),
});

export interface EmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  payload: any;
}

export async function getMessages(userId: string = 'me', maxResults: number = 10): Promise<EmailMessage[]> {
  try {
    const response = await gmail.users.messages.list({
      userId,
      maxResults,
    });
    return response.data.messages || [];
  } catch (error) {
    console.error('Error fetching Gmail messages:', error);
    throw error;
  }
}

export async function getMessage(userId: string = 'me', messageId: string): Promise<EmailMessage> {
  try {
    const response = await gmail.users.messages.get({
      userId,
      id: messageId,
    });
    return response.data as EmailMessage;
  } catch (error) {
    console.error('Error fetching Gmail message:', error);
    throw error;
  }
}