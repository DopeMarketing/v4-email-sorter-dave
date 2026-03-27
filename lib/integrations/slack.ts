import { WebClient } from '@slack/web-api';

const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

export interface SlackMessage {
  channel: string;
  text: string;
  ts: string;
  user: string;
}

export interface SlackChannel {
  id: string;
  name: string;
  is_private: boolean;
  is_member: boolean;
}

export async function sendMessage(channel: string, text: string, blocks?: any[]): Promise<SlackMessage> {
  try {
    const response = await slackClient.chat.postMessage({
      channel,
      text,
      blocks,
    });
    return response.message as SlackMessage;
  } catch (error) {
    console.error('Error sending Slack message:', error);
    throw error;
  }
}

export async function getChannels(): Promise<SlackChannel[]> {
  try {
    const response = await slackClient.conversations.list({
      types: 'public_channel,private_channel',
    });
    return response.channels as SlackChannel[];
  } catch (error) {
    console.error('Error fetching Slack channels:', error);
    throw error;
  }
}