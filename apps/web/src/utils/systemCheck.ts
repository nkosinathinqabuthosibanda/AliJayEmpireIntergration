export type HealthStatus = 'checking' | 'online' | 'offline'

export interface HealthResult {
  status: HealthStatus
  latencyMs: number | null
  message: string
  checkedAt: string | null
}

const CHECK_TIMEOUT_MS = 12_000

function checkViaFavicon(origin: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    const timer = setTimeout(() => {
      img.src = ''
      resolve(false)
    }, CHECK_TIMEOUT_MS)

    img.onload = () => {
      clearTimeout(timer)
      resolve(true)
    }
    img.onerror = () => {
      clearTimeout(timer)
      resolve(false)
    }
    img.src = `${origin}/favicon.ico?ping=${Date.now()}`
  })
}

export async function checkSystemHealth(url: string): Promise<HealthResult> {
  const start = performance.now()
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS)

  try {
    await fetch(url, {
      mode: 'no-cors',
      signal: controller.signal,
      cache: 'no-store',
    })
    clearTimeout(timeoutId)
    const latencyMs = Math.round(performance.now() - start)
    return {
      status: 'online',
      latencyMs,
      message: `Reachable — responded in ${latencyMs}ms`,
      checkedAt: new Date().toISOString(),
    }
  } catch {
    clearTimeout(timeoutId)
    try {
      const origin = new URL(url).origin
      const viaFavicon = await checkViaFavicon(origin)
      if (viaFavicon) {
        return {
          status: 'online',
          latencyMs: null,
          message: 'Reachable — host responded (alternate check)',
          checkedAt: new Date().toISOString(),
        }
      }
    } catch {
      /* invalid URL */
    }
    return {
      status: 'offline',
      latencyMs: null,
      message: 'Unreachable — server may be down or blocked from this network',
      checkedAt: new Date().toISOString(),
    }
  }
}
