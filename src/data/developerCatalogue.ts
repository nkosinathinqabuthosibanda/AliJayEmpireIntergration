import { integrations } from './integrations'

export const HUB_VERSION = '1.4.0'

export const developerSystems = integrations
  .filter((s) => !s.internalAction)
  .map((system) => ({
    id: system.id,
    name: system.name,
    category: system.category,
    url: system.url,
    description: system.description,
  }))

export const changelog = [
  {
    version: '1.4.0',
    date: '2026-05-20',
    items: [
      'Enterprise AI console — Email, Figures, Systems modules only',
      'Premium tech Developer Catalogue redesign',
      'OpenAI via secure proxy',
    ],
  },
  {
    version: '1.3.0',
    date: '2026-05-20',
    items: [
      'Alijay Empire AI intelligence panel',
      'Developer catalogue popup with check for updates',
      'All systems renamed to Alijay Empire branding',
      'Hub animations and refreshed light interface',
    ],
  },
  {
    version: '1.2.0',
    date: '2026-05-19',
    items: [
      'Alijay Empire Inventory system added',
      'System health check for all platforms',
      'Icon Industries engineering credit',
    ],
  },
  {
    version: '1.1.0',
    date: '2026-05-19',
    items: ['Alijay Empire logo and brand colours', 'Live platform connections'],
  },
  {
    version: '1.0.0',
    date: '2026-05-19',
    items: ['Alijay Empire Integration Hub launch'],
  },
]

export const LATEST_VERSION = changelog[0].version

export const ICON_INDUSTRIES = {
  name: 'Icon Industries',
  url: 'https://www.iconindustries.co.za',
  displayUrl: 'www.iconindustries.co.za',
}
