export type IntegrationStatus = 'connected' | 'syncing' | 'pending' | 'error'
export type SystemAvailability = 'live' | 'coming_soon'
export type InternalAction = 'open-ai' | 'open-catalogue'

export interface Integration {
  id: string
  name: string
  shortName: string
  category: string
  description: string
  url: string
  status: IntegrationStatus
  availability: SystemAvailability
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
    availability: 'live',
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
    availability: 'live',
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
    availability: 'live',
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
    availability: 'live',
    lastSync: 'Live',
  },
  {
    id: 'alijay-cloud',
    name: 'Alijay Empire Cloud',
    shortName: 'Empire Cloud',
    category: 'Alijay Empire · Cloud',
    description:
      'Central cloud workspace for Empire files, backups, and shared operational resources.',
    url: 'https://cloud.alijayempire.co.za/',
    status: 'connected',
    availability: 'live',
    lastSync: 'Live',
  },
  {
    id: 'developer-catalogue',
    name: 'Developer Catalogue',
    shortName: 'Catalogue',
    category: 'Alijay Empire · Hub',
    description:
      'Release notes, system registry, and update checks for the Alijay Empire integration hub.',
    url: '',
    status: 'connected',
    availability: 'live',
    lastSync: 'Live',
    internalAction: 'open-catalogue',
  },
  {
    id: 'alijay-empire-ai',
    name: 'Alijay Empire AI',
    shortName: 'Empire AI',
    category: 'Alijay Empire · Intelligence',
    description:
      'Email drafting, figures, and systems help — Empire intelligence built into the hub.',
    url: '',
    status: 'pending',
    availability: 'coming_soon',
    lastSync: 'Coming soon',
    internalAction: 'open-ai',
  },
]

export const liveIntegrations = integrations.filter((i) => i.availability === 'live')
export const comingSoonIntegrations = integrations.filter(
  (i) => i.availability === 'coming_soon'
)

export function isSystemLive(integration: Integration): boolean {
  return integration.availability === 'live'
}

export const stats = {
  connectedSystems: liveIntegrations.length,
  totalSystems: integrations.length,
  comingSoon: comingSoonIntegrations.length,
  uptime: '99.97%',
  platforms: 'Transport · Invoicing · HR · Inventory · Cloud · Catalogue · AI',
}
