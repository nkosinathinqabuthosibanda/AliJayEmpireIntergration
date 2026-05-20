import { changelog, HUB_VERSION, LATEST_VERSION } from '../data/developerCatalogue'

const STORAGE_KEY = 'alijay-empire-hub-version'

export type UpdateStatus = 'checking' | 'current' | 'available' | 'updated'

export interface UpdateCheckResult {
  status: UpdateStatus
  message: string
  currentVersion: string
  latestVersion: string
  releaseNotes?: string[]
}

function parseVersion(v: string): number[] {
  return v.split('.').map((n) => parseInt(n, 10) || 0)
}

function compareVersions(a: string, b: string): number {
  const pa = parseVersion(a)
  const pb = parseVersion(b)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0)
    if (diff !== 0) return diff
  }
  return 0
}

export async function checkForUpdates(): Promise<UpdateCheckResult> {
  await new Promise((r) => setTimeout(r, 900))

  const latestVersion = LATEST_VERSION
  const currentVersion = HUB_VERSION
  const lastSeen = localStorage.getItem(STORAGE_KEY)
  const latestNotes = changelog[0]?.items ?? []

  if (compareVersions(latestVersion, currentVersion) > 0) {
    return {
      status: 'available',
      message: `Update available — v${latestVersion} is ready for Alijay Empire Hub.`,
      currentVersion,
      latestVersion,
      releaseNotes: latestNotes,
    }
  }

  if (lastSeen && lastSeen !== currentVersion) {
    localStorage.setItem(STORAGE_KEY, currentVersion)
    return {
      status: 'updated',
      message: `Alijay Empire Hub updated to v${currentVersion}.`,
      currentVersion,
      latestVersion,
      releaseNotes: latestNotes,
    }
  }

  localStorage.setItem(STORAGE_KEY, currentVersion)
  return {
    status: 'current',
    message: `Alijay Empire Hub v${currentVersion} — you have the latest release.`,
    currentVersion,
    latestVersion,
    releaseNotes: latestNotes,
  }
}
