import { useCallback, useState } from 'react'
import {
  Activity,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react'
import { integrations } from '../data/integrations'

const checkableSystems = integrations.filter((i) => i.url)
import { checkSystemHealth, type HealthResult, type HealthStatus } from '../utils/systemCheck'
import styles from './SystemDiagnoser.module.css'

type ResultsMap = Record<string, HealthResult>

const initialResult = (): HealthResult => ({
  status: 'checking',
  latencyMs: null,
  message: 'Waiting to run…',
  checkedAt: null,
})

export function SystemDiagnoser({ compact = false }: { compact?: boolean }) {
  const [results, setResults] = useState<ResultsMap>(() =>
    Object.fromEntries(checkableSystems.map((i) => [i.id, initialResult()]))
  )
  const [running, setRunning] = useState(false)
  const [lastRun, setLastRun] = useState<string | null>(null)

  const runDiagnostics = useCallback(async () => {
    setRunning(true)
    setResults(Object.fromEntries(integrations.map((i) => [i.id, initialResult()])))

    const checks = checkableSystems.map(async (system) => {
      const result = await checkSystemHealth(system.url)
      setResults((prev) => ({ ...prev, [system.id]: result }))
      return { id: system.id, result }
    })

    await Promise.all(checks)
    setLastRun(new Date().toLocaleString())
    setRunning(false)
  }, [])

  const onlineCount = checkableSystems.filter((i) => results[i.id]?.status === 'online').length
  const offlineCount = checkableSystems.filter((i) => results[i.id]?.status === 'offline').length
  const allOnline = !running && onlineCount === checkableSystems.length
  const anyOffline = !running && offlineCount > 0

  return (
    <section className={`${styles.panel} ${compact ? styles.compact : ''}`}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <Activity size={22} className={styles.titleIcon} />
          <div>
            <h2 className={styles.title}>System health check</h2>
            <p className={styles.subtitle}>
              See if each platform is online and ready to use. Tap the button below to
              check all systems at once.
            </p>
          </div>
        </div>
        <button
          type="button"
          className={styles.runBtn}
          onClick={runDiagnostics}
          disabled={running}
        >
          {running ? (
            <>
              <Loader2 size={18} className={styles.spin} />
              Checking…
            </>
          ) : (
            <>
              <RefreshCw size={18} />
              Check all systems
            </>
          )}
        </button>
      </div>

      {!running && lastRun && (
        <div
          className={`${styles.summary} ${allOnline ? styles.summaryOk : anyOffline ? styles.summaryWarn : ''}`}
          role="status"
        >
          {allOnline ? (
            <CheckCircle2 size={20} />
          ) : anyOffline ? (
            <AlertTriangle size={20} />
          ) : (
            <Activity size={20} />
          )}
          <span>
            {allOnline
              ? `All ${checkableSystems.length} Empire systems online`
              : anyOffline
                ? `${onlineCount} online · ${offlineCount} offline`
                : `Last run: ${lastRun}`}
            {lastRun && ` — ${lastRun}`}
          </span>
        </div>
      )}

      <ul className={styles.list}>
        {checkableSystems.map((system) => {
          const health = results[system.id]
          return (
            <li key={system.id} className={styles.row}>
              <StatusBadge status={health?.status ?? 'checking'} />
              <div className={styles.rowBody}>
                <p className={styles.systemName}>{system.name}</p>
                <p className={styles.systemUrl}>{system.url}</p>
                <p className={styles.message}>{health?.message}</p>
              </div>
              {health?.latencyMs != null && (
                <span className={styles.latency}>{health.latencyMs}ms</span>
              )}
            </li>
          )
        })}
      </ul>

      <p className={styles.note}>
        This check tells you if each website is reachable. You may still need your username
        and password to sign in after opening a system.
      </p>
    </section>
  )
}

function StatusBadge({ status }: { status: HealthStatus }) {
  if (status === 'checking') {
    return (
      <span className={`${styles.badge} ${styles.badgeChecking}`} aria-label="Checking">
        <Loader2 size={16} className={styles.spin} />
      </span>
    )
  }
  if (status === 'online') {
    return (
      <span className={`${styles.badge} ${styles.badgeOnline}`} aria-label="Online">
        <CheckCircle2 size={16} />
      </span>
    )
  }
  return (
    <span className={`${styles.badge} ${styles.badgeOffline}`} aria-label="Offline">
      <XCircle size={16} />
    </span>
  )
}
