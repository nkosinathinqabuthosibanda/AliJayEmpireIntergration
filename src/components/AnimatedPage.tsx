import type { ReactNode } from 'react'
import styles from './AnimatedPage.module.css'

export function AnimatedPage({ children }: { children: ReactNode }) {
  return <div className={styles.page}>{children}</div>
}
