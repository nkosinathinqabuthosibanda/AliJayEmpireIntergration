import {
  CheckCircle2,
  RefreshCw,
  Clock,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import type { CSSProperties } from 'react'
import type { Integration, IntegrationStatus } from '../data/integrations'
import { useAppModals } from '../context/AppModalsContext'
import styles from './IntegrationCard.module.css'

const statusConfig: Record<
  IntegrationStatus,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  connected: { label: 'Live', icon: CheckCircle2, className: styles.statusConnected },
  syncing: { label: 'Syncing', icon: RefreshCw, className: styles.statusSyncing },
  pending: { label: 'Pending', icon: Clock, className: styles.statusPending },
  error: { label: 'Offline', icon: AlertCircle, className: styles.statusError },
}

interface IntegrationCardProps {
  integration: Integration
  style?: CSSProperties
}

export function IntegrationCard({ integration, style }: IntegrationCardProps) {
  const { openAI } = useAppModals()
  const { label, icon: StatusIcon, className } = statusConfig[integration.status]
  const isAI = integration.internalAction === 'open-ai'

  return (
    <article className={`${styles.card} ${isAI ? styles.cardAi : ''}`} style={style}>
      <div className={styles.header}>
        <span className={styles.category}>{integration.category}</span>
        <span className={`${styles.status} ${className}`}>
          <StatusIcon size={14} className={integration.status === 'syncing' ? styles.spin : ''} />
          {label}
        </span>
      </div>
      <h3 className={styles.name}>{integration.name}</h3>
      <p className={styles.description}>{integration.description}</p>
      {integration.url && (
        <div className={styles.meta}>
          <span className={styles.url}>{integration.url.replace(/^https?:\/\//, '')}</span>
          <span>·</span>
          <span>{integration.lastSync}</span>
        </div>
      )}
      {isAI ? (
        <button type="button" className={`${styles.action} ${styles.actionAi}`} onClick={openAI}>
          Launch Alijay Empire AI
          <Sparkles size={16} />
        </button>
      ) : (
        <a
          href={integration.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.action}
        >
          Open {integration.shortName}
          <ExternalLink size={16} />
        </a>
      )}
    </article>
  )
}
