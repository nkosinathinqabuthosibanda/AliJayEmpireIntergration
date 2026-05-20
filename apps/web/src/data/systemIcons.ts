import {
  Truck,
  FileText,
  Users,
  Package,
  Cloud,
  Sparkles,
  BookOpen,
  type LucideIcon,
} from 'lucide-react'

export const systemIcons: Record<string, LucideIcon> = {
  'alijay-transport': Truck,
  'alijay-invoicing': FileText,
  'alijay-hr': Users,
  'alijay-inventory': Package,
  'alijay-cloud': Cloud,
  'alijay-empire-ai': Sparkles,
  'developer-catalogue': BookOpen,
}

export function getSystemIcon(id: string): LucideIcon {
  return systemIcons[id] ?? Truck
}
