import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Logo } from '../components/Logo'
import { StatsBar } from '../components/StatsBar'
import { IntegrationCard } from '../components/IntegrationCard'
import { integrations } from '../data/integrations'
import { getSystemIcon } from '../data/systemIcons'
import styles from './Home.module.css'

export function Home() {
  const preview = integrations

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <Logo size="lg" className={`${styles.heroLogo} ${styles.float}`} />
          <p className={styles.eyebrow}>Alijay Empire · The Fuel Legends</p>
          <h1 className={styles.title}>
            Your Empire systems,
            <em> one place</em>
          </h1>
          <p className={styles.subtitle}>
            Launch live Empire platforms from one hub — including Alijay Cloud and the
            developer catalogue. Empire AI is coming soon.
          </p>
          <div className={styles.actions}>
            <Link to="/integrations" className={styles.primaryBtn}>
              Open Empire systems
              <ArrowRight size={18} />
            </Link>
            <Link to="/integrations" className={styles.secondaryBtn}>
              View all systems
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <StatsBar />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Alijay Empire platforms</h2>
            <p>Every system in the Empire — same layout, one tap to launch when live.</p>
          </div>
          <div className={styles.features}>
            {integrations.map((system, i) => {
              const Icon = getSystemIcon(system.id)
              return (
                <article
                  key={system.id}
                  className={styles.feature}
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className={styles.featureIcon}>
                    <Icon size={24} strokeWidth={1.75} />
                  </div>
                  <h3>{system.shortName}</h3>
                  <p>{system.description}</p>
                  {system.availability === 'coming_soon' && (
                    <span className={styles.featureSoon}>Coming soon</span>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.previewSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Quick launch</h2>
            <Link to="/integrations" className={styles.viewAll}>
              All Empire systems
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className={styles.grid}>
            {preview.map((integration, i) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                style={{ animationDelay: `${i * 0.07}s` }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
