export interface ZapierWebhook {
  id: string;
  url: string;
  event: string;
  status: 'active' | 'inactive';
}

export interface ZapierTrigger {
  data: Record<string, any>;
  meta: {
    id: string;
    timestamp: string;
  };
}

const ZAPIER_API_BASE = 'https://hooks.zapier.com/hooks/catch';

export async function triggerZap(hookId: string, data: Record<string, any>): Promise<boolean> {
  try {
    const response = await fetch(`${ZAPIER_API_BASE}/${hookId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Zapier webhook failed: ${response.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error triggering Zapier webhook:', error);
    throw error;
  }
}

export async function sendWebhookData(webhookUrl: string, payload: Record<string, any>): Promise<any> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ZAPIER_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error sending webhook data:', error);
    throw error;
  }
}