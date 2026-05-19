import { Link } from 'react-router-dom'
import { Truck, FileText, Users, Package, Sparkles } from 'lucide-react'
import { Logo } from '../components/Logo'
import { integrations } from '../data/integrations'
import { useAppModals } from '../context/AppModalsContext'
import styles from './About.module.css'

const systemIcons = {
  'alijay-transport': Truck,
  'alijay-invoicing': FileText,
  'alijay-hr': Users,
  'alijay-inventory': Package,
  'alijay-empire-ai': Sparkles,
} as const

export function About() {
  const { openAI } = useAppModals()
  const displaySystems = integrations.filter((s) => s.id !== 'alijay-empire-ai')

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <Logo size="md" className={styles.aboutLogo} />
        <h1>About Alijay Empire Hub</h1>
        <p className={styles.lead}>
          The home for every Alijay Empire system — transport, invoicing, HR, inventory,
          and Empire intelligence. Built for The Fuel Legends.
        </p>
      </section>

      <section className={styles.systems}>
        {displaySystems.map((system) => {
          const Icon = systemIcons[system.id as keyof typeof systemIcons] ?? Truck
          return (
            <article key={system.id} className={styles.system}>
              <Icon size={28} strokeWidth={1.75} className={styles.icon} />
              <h2>{system.name}</h2>
              <p className={styles.category}>{system.category}</p>
              <p>{system.description}</p>
              <a
                href={system.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Open {system.shortName}
              </a>
            </article>
          )
        })}
        <article className={`${styles.system} ${styles.systemAi}`}>
          <Sparkles size={28} strokeWidth={1.75} className={styles.icon} />
          <h2>Alijay Empire AI</h2>
          <p className={styles.category}>Alijay Empire · Intelligence</p>
          <p>Empire command layer — health checks, catalogue, and system launch.</p>
          <button type="button" className={styles.aiOpen} onClick={openAI}>
            Launch Alijay Empire AI
          </button>
        </article>
      </section>

      <section className={styles.cta}>
        <h2>Open your Empire systems</h2>
        <p>Every platform in one hub — ready when you are.</p>
        <Link to="/integrations" className={styles.btn}>
          Go to Empire systems
        </Link>
      </section>
    </main>
  )
}
