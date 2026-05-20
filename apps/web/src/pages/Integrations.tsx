import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Activity } from 'lucide-react'
import { IntegrationCard } from '../components/IntegrationCard'
import { StatsBar } from '../components/StatsBar'
import {
  integrations,
  type IntegrationStatus,
  type SystemAvailability,
} from '../data/integrations'
import styles from './Integrations.module.css'

type FilterValue = IntegrationStatus | SystemAvailability | 'all'

const filters: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'live', label: 'Live' },
  { value: 'coming_soon', label: 'Coming soon' },
  { value: 'connected', label: 'Connected' },
]

export function Integrations() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterValue>('all')

  const filtered = integrations.filter((item) => {
    const matchesQuery =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.shortName.toLowerCase().includes(query.toLowerCase())

    const matchesFilter =
      filter === 'all' ||
      (filter === 'live' && item.availability === 'live') ||
      (filter === 'coming_soon' && item.availability === 'coming_soon') ||
      item.status === filter

    return matchesQuery && matchesFilter
  })

  return (
    <main className={styles.main}>
      <header className={styles.pageHeader}>
        <h1>Alijay Empire systems</h1>
        <p>
          Launch live Empire platforms below — including{' '}
          <a href="https://cloud.alijayempire.co.za/" target="_blank" rel="noopener noreferrer">
            Alijay Cloud
          </a>
          . Open the developer catalogue from its card or the header. Empire AI is coming soon.
        </p>
      </header>

      <div className={styles.container}>
        <StatsBar />

        <div className={styles.toolbar}>
          <div className={styles.search}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="search"
              placeholder="Search systems..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search integrations"
            />
          </div>
          <div className={styles.filters} role="group" aria-label="Filter systems">
            <Filter size={16} className={styles.filterIcon} />
            {filters.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                className={`${styles.filterBtn} ${filter === value ? styles.filterActive : ''}`}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <p className={styles.resultCount}>
          {filtered.length} system{filtered.length !== 1 ? 's' : ''}
        </p>

        <div className={styles.grid}>
          {filtered.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className={styles.empty}>No systems match your search.</p>
        )}

        <Link to="/diagnostics" className={styles.diagnosticsLink}>
          <Activity size={18} />
          Check if systems are working
        </Link>
      </div>
    </main>
  )
}
