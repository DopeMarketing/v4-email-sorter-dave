export interface MakeScenario {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface MakeWebhookResponse {
  success: boolean;
  executionId?: string;
  message?: string;
}

const MAKE_API_BASE = 'https://hook.eu1.make.com';

export async function triggerWebhook(webhookId: string, data: Record<string, any>): Promise<MakeWebhookResponse> {
  try {
    const response = await fetch(`${MAKE_API_BASE}/${webhookId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Make webhook failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    return { success: true, ...result };
  } catch (error) {
    console.error('Error triggering Make webhook:', error);
    throw error;
  }
}

export async function executeScenario(scenarioId: string, inputData: Record<string, any>): Promise<any> {
  try {
    const response = await fetch(`https://eu1.make.com/api/v2/scenarios/${scenarioId}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${process.env.MAKE_API_KEY}`,
      },
      body: JSON.stringify({ data: inputData }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error executing Make scenario:', error);
    throw error;
  }
}