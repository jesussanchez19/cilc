import { promises as fs } from 'fs';
import path from 'path';

export interface Lead {
  id: string;
  type: 'contact' | 'quote';
  name: string;
  email: string;
  phone?: string;
  program?: string;
  subject?: string;
  message: string;
  createdAt: string;
}

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

async function readLeads(): Promise<Lead[]> {
  try {
    const content = await fs.readFile(LEADS_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export async function saveLead(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
  const leads = await readLeads();
  const newLead: Lead = {
    ...lead,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  leads.push(newLead);
  await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
  return newLead;
}
