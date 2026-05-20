import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.png'
import styles from './Logo.module.css'

interface LogoProps {
  /** sm = header, md = footer, lg = hero */
  size?: 'sm' | 'md' | 'lg'
  /** Wrap in home link */
  linkToHome?: boolean
  className?: string
}

const sizeClass = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
} as const

export function Logo({ size = 'sm', linkToHome = false, className = '' }: LogoProps) {
  const img = (
    <img
      src={logoImg}
      alt="Alijay Empire — The Fuel Legends"
      className={`${styles.img} ${sizeClass[size]} ${className}`}
    />
  )

  if (linkToHome) {
    return (
      <Link to="/" className={styles.link} aria-label="Alijay Empire home">
        {img}
      </Link>
    )
  }

  return img
}
