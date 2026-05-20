import {
  CheckCircle2,
  RefreshCw,
  Clock,
  AlertCircle,
  ExternalLink,
  Sparkles,
  BookOpen,
} from 'lucide-react'
import type { CSSProperties } from 'react'
import type { Integration, IntegrationStatus } from '../data/integrations'
import { isSystemLive } from '../data/integrations'
import { useAppModals } from '../context/AppModalsContext'
import styles from './IntegrationCard.module.css'

const statusConfig: Record<
  IntegrationStatus,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  connected: { label: 'Live', icon: CheckCircle2, className: styles.statusConnected },
  syncing: { label: 'Syncing', icon: RefreshCw, className: styles.statusSyncing },
  pending: { label: 'Coming soon', icon: Clock, className: styles.statusPending },
  error: { label: 'Offline', icon: AlertCircle, className: styles.statusError },
}

interface IntegrationCardProps {
  integration: Integration
  style?: CSSProperties
}

export function IntegrationCard({ integration, style }: IntegrationCardProps) {
  const { openAI, openCatalogue } = useAppModals()
  const live = isSystemLive(integration)
  const { label, icon: StatusIcon, className } = statusConfig[integration.status]
  const displayUrl = integration.url
    ? integration.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : 'Alijay Empire Hub'

  const handleInternal = () => {
    if (!live) return
    if (integration.internalAction === 'open-ai') openAI()
    if (integration.internalAction === 'open-catalogue') openCatalogue()
  }

  return (
    <article className={styles.card} style={style}>
      <div className={styles.header}>
        <span className={styles.category}>{integration.category}</span>
        <span className={`${styles.status} ${className}`}>
          <StatusIcon
            size={14}
            className={integration.status === 'syncing' ? styles.spin : ''}
          />
          {live ? label : 'Coming soon'}
        </span>
      </div>
      <h3 className={styles.name}>{integration.name}</h3>
      <p className={styles.description}>{integration.description}</p>
      <div className={styles.meta}>
        <span className={styles.url}>{displayUrl}</span>
        <span aria-hidden="true">·</span>
        <span>{integration.lastSync}</span>
      </div>
      {live && integration.url && !integration.internalAction ? (
        <a
          href={integration.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.action}
        >
          Open {integration.shortName}
          <ExternalLink size={16} />
        </a>
      ) : live && integration.internalAction ? (
        <button type="button" className={styles.action} onClick={handleInternal}>
          Open {integration.shortName}
          {integration.internalAction === 'open-ai' ? (
            <Sparkles size={16} />
          ) : (
            <BookOpen size={16} />
          )}
        </button>
      ) : (
        <span className={styles.actionSoon} aria-disabled="true">
          Coming soon
          {integration.internalAction === 'open-ai' ? (
            <Sparkles size={16} />
          ) : integration.internalAction === 'open-catalogue' ? (
            <BookOpen size={16} />
          ) : (
            <Clock size={16} />
          )}
        </span>
      )}
    </article>
  )
}
