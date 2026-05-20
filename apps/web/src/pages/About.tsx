import { BookOpen } from 'lucide-react'
import { integrations, isSystemLive } from '../data/integrations'
import { getSystemIcon } from '../data/systemIcons'
import { useAppModals } from '../context/AppModalsContext'
import { Logo } from '../components/Logo'
import styles from './About.module.css'

export function About() {
  const { openCatalogue } = useAppModals()

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <Logo size="md" className={styles.aboutLogo} />
        <h1>About Alijay Empire Hub</h1>
        <p className={styles.lead}>
          The home for every Alijay Empire system — transport, invoicing, HR, inventory,
          cloud, and hub tools. Built for The Fuel Legends.
        </p>
      </section>

      <section className={styles.systems}>
        {integrations.map((system) => {
          const Icon = getSystemIcon(system.id)
          const live = isSystemLive(system)

          return (
            <article key={system.id} className={styles.system}>
              <Icon size={28} strokeWidth={1.75} className={styles.icon} />
              <p className={styles.category}>{system.category}</p>
              <h2>{system.name}</h2>
              <p>{system.description}</p>
              {live && system.url ? (
                <a
                  href={system.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Open {system.shortName}
                </a>
              ) : live && system.internalAction === 'open-catalogue' ? (
                <button type="button" className={styles.hubBtn} onClick={openCatalogue}>
                  <BookOpen size={16} />
                  Open {system.shortName}
                </button>
              ) : live ? null : (
                <span className={styles.soon}>Coming soon</span>
              )}
            </article>
          )
        })}
      </section>
    </main>
  )
}
