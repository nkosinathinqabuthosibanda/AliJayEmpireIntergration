import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { ICON_INDUSTRIES } from '../data/developerCatalogue'
import { useAppModals } from '../context/AppModalsContext'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()
  const { openCatalogue } = useAppModals()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo size="md" linkToHome />
          <p className={styles.tagline}>The Fuel Legends</p>
          <p className={styles.copy}>© {year} Alijay Empire. All rights reserved.</p>
          <p className={styles.engineering}>
            Designed and engineered by{' '}
            <a href={ICON_INDUSTRIES.url} target="_blank" rel="noopener noreferrer">
              {ICON_INDUSTRIES.name}
            </a>
          </p>
          <a
            href={ICON_INDUSTRIES.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.engineeringUrl}
          >
            {ICON_INDUSTRIES.displayUrl}
          </a>
        </div>
        <nav className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/integrations">Empire systems</Link>
          <Link to="/diagnostics">Health check</Link>
          <Link to="/about">About</Link>
          <button type="button" className={styles.catalogueLink} onClick={openCatalogue}>
            Developer catalogue
          </button>
        </nav>
      </div>
    </footer>
  )
}
