import { useEffect, useState } from 'react'
import {
  X,
  Download,
  Terminal,
  Database,
  GitBranch,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
} from 'lucide-react'
import {
  HUB_VERSION,
  changelog,
  developerSystems,
  ICON_INDUSTRIES,
} from '../data/developerCatalogue'
import { checkForUpdates, type UpdateCheckResult } from '../utils/updates'
import { useAppModals } from '../context/AppModalsContext'
import '../styles/techPanel.css'
import '../styles/empirePanelTheme.css'
import styles from './DeveloperCatalogueModal.module.css'

type CatTab = 'updates' | 'registry' | 'releases'

export function DeveloperCatalogueModal() {
  const { catalogueOpen, closeCatalogue } = useAppModals()
  const [catTab, setCatTab] = useState<CatTab>('updates')
  const [updateResult, setUpdateResult] = useState<UpdateCheckResult | null>(null)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    if (!catalogueOpen) {
      setUpdateResult(null)
      setChecking(false)
      setCatTab('updates')
    }
  }, [catalogueOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCatalogue()
    }
    if (catalogueOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKey)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [catalogueOpen, closeCatalogue])

  const handleCheckUpdates = async () => {
    setChecking(true)
    setUpdateResult(null)
    const result = await checkForUpdates()
    setUpdateResult(result)
    setChecking(false)
  }

  if (!catalogueOpen) return null

  return (
    <div
      className={`techOverlay empirePanelTheme ${styles.overlay}`}
      onClick={closeCatalogue}
      role="presentation"
    >
      <div
        className={`techPanel ${styles.modal}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="catalogue-title"
      >
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <Terminal size={26} className={styles.headerIcon} />
            <div>
              <span className={`techBadge ${styles.headerBadge}`}>
                <span className="techBadgeLive" />
                Alijay Empire
              </span>
              <h2 id="catalogue-title">Developer Catalogue</h2>
              <p>
                Alijay Empire Hub <code>v{HUB_VERSION}</code>
              </p>
            </div>
          </div>
          <button type="button" className={styles.closeBtn} onClick={closeCatalogue} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        <nav className={styles.tabs}>
          <button
            type="button"
            className={catTab === 'updates' ? styles.tabOn : ''}
            onClick={() => setCatTab('updates')}
          >
            <Download size={15} />
            Updates
          </button>
          <button
            type="button"
            className={catTab === 'registry' ? styles.tabOn : ''}
            onClick={() => setCatTab('registry')}
          >
            <Database size={15} />
            Registry
          </button>
          <button
            type="button"
            className={catTab === 'releases' ? styles.tabOn : ''}
            onClick={() => setCatTab('releases')}
          >
            <GitBranch size={15} />
            Releases
          </button>
        </nav>

        <div className={styles.body}>
          {catTab === 'updates' && (
            <section className={styles.section}>
              <div className={styles.heroCard}>
                <Shield size={28} />
                <div>
                  <h3>System integrity</h3>
                  <p>Verify hub version and sync release manifest.</p>
                </div>
              </div>
              <button
                type="button"
                className={styles.scanBtn}
                onClick={handleCheckUpdates}
                disabled={checking}
              >
                {checking ? (
                  <>
                    <Loader2 size={18} className={styles.spin} />
                    Scanning release channel…
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    Check for updates
                  </>
                )}
              </button>
              {updateResult && (
                <div
                  className={`${styles.scanResult} ${
                    updateResult.status === 'current'
                      ? styles.scanOk
                      : updateResult.status === 'available'
                        ? styles.scanWarn
                        : styles.scanInfo
                  }`}
                >
                  {updateResult.status === 'current' ? (
                    <CheckCircle2 size={22} />
                  ) : (
                    <AlertCircle size={22} />
                  )}
                  <div>
                    <p className={styles.scanMsg}>{updateResult.message}</p>
                    <p className={styles.scanMeta}>
                      Installed <code>v{updateResult.currentVersion}</code> · Latest{' '}
                      <code>v{updateResult.latestVersion}</code>
                    </p>
                    {updateResult.releaseNotes && (
                      <ul className={styles.notes}>
                        {updateResult.releaseNotes.map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </section>
          )}

          {catTab === 'registry' && (
            <section className={styles.section}>
              <p className={styles.sectionLead}>Alijay Empire system registry — live endpoints.</p>
              <div className={styles.table}>
                <div className={styles.tableHead}>
                  <span>System</span>
                  <span>Module ID</span>
                  <span>Category</span>
                </div>
                {developerSystems.map((sys, i) => (
                  <div
                    key={sys.id}
                    className={styles.tableRow}
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <span className={styles.sysName}>{sys.name}</span>
                    <code>{sys.id}</code>
                    <span className={styles.sysCat}>{sys.category}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {catTab === 'releases' && (
            <section className={styles.section}>
              <p className={styles.sectionLead}>Release manifest — Alijay Empire Hub.</p>
              <div className={styles.timeline}>
                {changelog.map((entry) => (
                  <article key={entry.version} className={styles.release}>
                    <div className={styles.releaseMarker} />
                    <div className={styles.releaseBody}>
                      <div className={styles.releaseHead}>
                        <span className={styles.ver}>v{entry.version}</span>
                        <time dateTime={entry.date}>{entry.date}</time>
                      </div>
                      <ul>
                        {entry.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>

        <footer className={styles.footer}>
          <span>
            Engineered by{' '}
            <a href={ICON_INDUSTRIES.url} target="_blank" rel="noopener noreferrer">
              {ICON_INDUSTRIES.name}
            </a>
          </span>
          <a
            href={ICON_INDUSTRIES.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerMeta}
          >
            {ICON_INDUSTRIES.displayUrl}
          </a>
        </footer>
      </div>
    </div>
  )
}
