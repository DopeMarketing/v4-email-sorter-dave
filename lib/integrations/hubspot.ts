import { Client } from '@hubspot/api-client';

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_API_KEY });

export interface Contact {
  id: string;
  properties: {
    email: string;
    firstname?: string;
    lastname?: string;
    company?: string;
  };
}

export interface Deal {
  id: string;
  properties: {
    dealname: string;
    amount?: string;
    dealstage?: string;
    closedate?: string;
  };
}

export async function createContact(contactData: Partial<Contact['properties']>): Promise<Contact> {
  try {
    const response = await hubspotClient.crm.contacts.basicApi.create({
      properties: contactData,
    });
    return response as Contact;
  } catch (error) {
    console.error('Error creating HubSpot contact:', error);
    throw error;
  }
}

export async function getContacts(limit: number = 10): Promise<Contact[]> {
  try {
    const response = await hubspotClient.crm.contacts.basicApi.getPage(limit);
    return response.results as Contact[];
  } catch (error) {
    console.error('Error fetching HubSpot contacts:', error);
    throw error;
  }
}