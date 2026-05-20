import { existsSync } from 'node:fs'
import { WEB_DIST } from '../config/paths.mjs'

export function registerHealthRoute(app, config) {
  app.get('/api/health', (_req, res) => {
    const distReady = existsSync(WEB_DIST)
    const aiReady = Boolean(config.openaiApiKey)

    res.json({
      status: distReady ? 'ok' : 'degraded',
      service: 'alijay-empire-hub',
      environment: config.nodeEnv,
      dist: distReady,
      empireAI: aiReady,
      timestamp: new Date().toISOString(),
    })
  })
}
