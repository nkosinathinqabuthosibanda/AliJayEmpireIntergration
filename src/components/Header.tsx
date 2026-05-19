import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, BookOpen, Sparkles } from 'lucide-react'
import { Logo } from './Logo'
import { useAppModals } from '../context/AppModalsContext'
import styles from './Header.module.css'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/integrations', label: 'Empire systems' },
  { to: '/diagnostics', label: 'Health check' },
  { to: '/about', label: 'About' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { openCatalogue, openAI } = useAppModals()

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo size="sm" linkToHome />

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
          <button
            type="button"
            className={styles.toolBtn}
            onClick={() => {
              openCatalogue()
              closeMenu()
            }}
          >
            <BookOpen size={18} />
            Catalogue
          </button>
          <button
            type="button"
            className={`${styles.toolBtn} ${styles.aiBtn}`}
            onClick={() => {
              openAI()
              closeMenu()
            }}
          >
            <Sparkles size={18} />
            Empire AI
          </button>
          <Link to="/integrations" className={styles.cta} onClick={closeMenu}>
            Open systems
          </Link>
        </nav>

        <button
          type="button"
          className={styles.menuBtn}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}
