import { BookOpen, ExternalLink } from 'lucide-react'
import {
  HUB_VERSION,
  developerSystems,
  changelog,
  ICON_INDUSTRIES,
} from '../data/developerCatalogue'
import { SystemDiagnoser } from '../components/SystemDiagnoser'
import styles from './DeveloperCatalogue.module.css'

export function DeveloperCatalogue() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <BookOpen size={28} className={styles.headerIcon} />
        <h1>Developer catalogue</h1>
        <p>
          Technical reference for Alijay Empire systems — registry, updates, and health
          checks. Hub version <strong>v{HUB_VERSION}</strong>.
        </p>
      </header>

      <section className={styles.section}>
        <h2>System registry</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Platform</th>
                <th>Category</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {developerSystems.map((sys) => (
                <tr key={sys.id}>
                  <td>
                    <code>{sys.id}</code>
                  </td>
                  <td>{sys.name}</td>
                  <td>{sys.category}</td>
                  <td>
                    <a href={sys.url} target="_blank" rel="noopener noreferrer">
                      {sys.url.replace(/^https?:\/\//, '')}
                      <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Changelog</h2>
        <div className={styles.changelog}>
          {changelog.map((entry) => (
            <article key={entry.version} className={styles.release}>
              <div className={styles.releaseHead}>
                <span className={styles.version}>v{entry.version}</span>
                <time dateTime={entry.date}>{entry.date}</time>
              </div>
              <ul>
                {entry.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SystemDiagnoser />
      </section>

      <section className={styles.credit}>
        <p>
          Designed and engineered by{' '}
          <a href={ICON_INDUSTRIES.url} target="_blank" rel="noopener noreferrer">
            {ICON_INDUSTRIES.name}
          </a>
        </p>
        <a
          href={ICON_INDUSTRIES.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.creditUrl}
        >
          {ICON_INDUSTRIES.displayUrl}
        </a>
      </section>
    </main>
  )
}
