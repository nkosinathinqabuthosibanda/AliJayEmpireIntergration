import { Activity, Link2, Layers, Truck } from 'lucide-react'
import { stats } from '../data/integrations'
import styles from './StatsBar.module.css'

const items = [
  { icon: Link2, label: 'Live systems', value: stats.connectedSystems },
  { icon: Layers, label: 'Total platforms', value: stats.totalSystems },
  { icon: Activity, label: 'Coming soon', value: stats.comingSoon },
  { icon: Truck, label: 'Empire modules', value: stats.platforms },
]

export function StatsBar() {
  return (
    <div className={styles.bar}>
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className={styles.item}>
          <Icon size={20} className={styles.icon} strokeWidth={1.75} />
          <div>
            <p className={styles.value}>{value}</p>
            <p className={styles.label}>{label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
