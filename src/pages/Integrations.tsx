import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Activity } from 'lucide-react'
import { IntegrationCard } from '../components/IntegrationCard'
import { StatsBar } from '../components/StatsBar'
import { integrations, type IntegrationStatus } from '../data/integrations'
import styles from './Integrations.module.css'

const filters: { value: IntegrationStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'connected', label: 'Connected' },
  { value: 'syncing', label: 'Syncing' },
  { value: 'pending', label: 'Pending' },
  { value: 'error', label: 'Error' },
]

export function Integrations() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<IntegrationStatus | 'all'>('all')

  const filtered = integrations.filter((item) => {
    const matchesQuery =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesQuery && matchesStatus
  })

  return (
    <main className={styles.main}>
      <header className={styles.pageHeader}>
        <h1>Alijay Empire systems</h1>
        <p>Launch any Empire platform below — transport, invoicing, HR, inventory, or Empire AI.</p>
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
          <div className={styles.filters} role="group" aria-label="Filter by status">
            <Filter size={16} className={styles.filterIcon} />
            {filters.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                className={`${styles.filterBtn} ${statusFilter === value ? styles.filterActive : ''}`}
                onClick={() => setStatusFilter(value)}
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
          <p className={styles.empty}>No integrations match your search.</p>
        )}

        <Link to="/diagnostics" className={styles.diagnosticsLink}>
          <Activity size={18} />
          Check if systems are working
        </Link>
      </div>
    </main>
  )
}
