import { Activity, Link2, Layers, Truck } from 'lucide-react'
import { stats } from '../data/integrations'
import styles from './StatsBar.module.css'

const items = [
  { icon: Link2, label: 'Connected systems', value: stats.connectedSystems },
  { icon: Layers, label: 'Alijay platforms', value: stats.totalSystems },
  { icon: Activity, label: 'Platform uptime', value: stats.uptime },
  { icon: Truck, label: 'Integrated modules', value: stats.platforms },
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
