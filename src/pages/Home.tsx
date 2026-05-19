import { Link } from 'react-router-dom'
import { ArrowRight, Truck, FileText, Users, Package, Sparkles } from 'lucide-react'
import { Logo } from '../components/Logo'
import { StatsBar } from '../components/StatsBar'
import { IntegrationCard } from '../components/IntegrationCard'
import { integrations } from '../data/integrations'
import { useAppModals } from '../context/AppModalsContext'
import styles from './Home.module.css'

const features = [
  {
    icon: Truck,
    title: 'Alijay Empire Transport',
    description:
      'Fleet, abnormal invoicing, and transport command — built for Alijay Empire fuel operations.',
  },
  {
    icon: FileText,
    title: 'Alijay Empire Invoicing',
    description:
      'Quotes and client billing across the Empire — your finance desk in one place.',
  },
  {
    icon: Users,
    title: 'Alijay Empire HR',
    description:
      'Staff, leave, and attendance for every Alijay Empire team member.',
  },
  {
    icon: Package,
    title: 'Alijay Empire Inventory',
    description:
      'Stock and assets at every depot — Empire inventory under your control.',
  },
]

export function Home() {
  const { openAI } = useAppModals()
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
            Open Empire systems instantly — or launch Empire AI for emails, figures,
            and system usage help.
          </p>
          <div className={styles.actions}>
            <Link to="/integrations" className={styles.primaryBtn}>
              Open Empire systems
              <ArrowRight size={18} />
            </Link>
            <button type="button" className={styles.aiHeroBtn} onClick={openAI}>
              <Sparkles size={18} />
              Empire AI Console
            </button>
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
            <p>Every system branded for the Empire — tap a card to launch.</p>
          </div>
          <div className={styles.features}>
            {features.map(({ icon: Icon, title, description }, i) => (
              <article
                key={title}
                className={styles.feature}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={styles.featureIcon}>
                  <Icon size={24} strokeWidth={1.75} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
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
