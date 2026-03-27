import twilio from 'twilio';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export interface SMSMessage {
  sid: string;
  body: string;
  from: string;
  to: string;
  status: string;
  dateCreated: Date;
}

export interface CallDetails {
  sid: string;
  from: string;
  to: string;
  status: string;
  duration?: string;
}

export async function sendSMS(to: string, body: string, from?: string): Promise<SMSMessage> {
  try {
    const message = await twilioClient.messages.create({
      body,
      from: from || process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    return message as SMSMessage;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
}

export async function makeCall(to: string, url: string, from?: string): Promise<CallDetails> {
  try {
    const call = await twilioClient.calls.create({
      url,
      from: from || process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    return call as CallDetails;
  } catch (error) {
    console.error('Error making call:', error);
    throw error;
  }
}