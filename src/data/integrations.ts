export type IntegrationStatus = 'connected' | 'syncing' | 'pending' | 'error'
export type InternalAction = 'open-ai' | 'open-catalogue'

export interface Integration {
  id: string
  name: string
  shortName: string
  category: string
  description: string
  url: string
  status: IntegrationStatus
  lastSync: string
  internalAction?: InternalAction
}

export const integrations: Integration[] = [
  {
    id: 'alijay-transport',
    name: 'Alijay Empire Transport & Abnormal Invoicing',
    shortName: 'Empire Transport',
    category: 'Alijay Empire · Logistics',
    description:
      'Fleet runs, abnormal billing, and transport command for Alijay Empire fuel operations.',
    url: 'https://abnormal.alijayempire.co.za/',
    status: 'connected',
    lastSync: 'Live',
  },
  {
    id: 'alijay-invoicing',
    name: 'Alijay Empire Invoicing',
    shortName: 'Empire Invoicing',
    category: 'Alijay Empire · Finance',
    description:
      'Quotes, client invoices, and billing across the Alijay Empire network.',
    url: 'https://www.invoice.alijayempire.co.za/',
    status: 'connected',
    lastSync: 'Live',
  },
  {
    id: 'alijay-hr',
    name: 'Alijay Empire HR',
    shortName: 'Empire HR',
    category: 'Alijay Empire · People',
    description:
      'Staff records, leave, attendance, and workforce administration for Alijay Empire.',
    url: 'https://alijayempire.com/',
    status: 'connected',
    lastSync: 'Live',
  },
  {
    id: 'alijay-inventory',
    name: 'Alijay Empire Inventory',
    shortName: 'Empire Inventory',
    category: 'Alijay Empire · Assets',
    description:
      'Stock, assets, and inventory control for Alijay Empire depots and operations.',
    url: 'https://inventory.alijayempire.co.za/login',
    status: 'connected',
    lastSync: 'Live',
  },
  {
    id: 'alijay-empire-ai',
    name: 'Alijay Empire AI',
    shortName: 'Empire AI',
    category: 'Alijay Empire · Intelligence',
    description:
      'Empire intelligence hub — system status, updates, and connected operations in one panel.',
    url: '',
    status: 'connected',
    lastSync: 'Ready',
    internalAction: 'open-ai',
  },
]

export const stats = {
  connectedSystems: integrations.filter((i) => i.status === 'connected').length,
  totalSystems: integrations.length,
  uptime: '99.97%',
  platforms: 'Transport · Invoicing · HR · Inventory · AI',
}
