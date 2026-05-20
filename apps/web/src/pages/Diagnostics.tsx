import { SystemDiagnoser } from '../components/SystemDiagnoser'
import styles from './Diagnostics.module.css'

export function Diagnostics() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Are my systems working?</h1>
        <p>
          This page checks whether each Alijay Empire website is online. Run the check
          if something will not load or you want peace of mind before you start work.
        </p>
      </header>
      <div className={styles.content}>
        <SystemDiagnoser />
      </div>
    </main>
  )
}
