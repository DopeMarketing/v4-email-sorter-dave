import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletion {
  id: string;
  choices: {
    message: ChatMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function createChatCompletion(messages: ChatMessage[], model: string = 'gpt-3.5-turbo'): Promise<ChatCompletion> {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages,
      max_tokens: 1000,
    });
    return response as ChatCompletion;
  } catch (error) {
    console.error('Error creating chat completion:', error);
    throw error;
  }
}

export async function generateText(prompt: string, model: string = 'gpt-3.5-turbo'): Promise<string> {
  try {
    const completion = await createChatCompletion([
      { role: 'user', content: prompt }
    ], model);
    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
}