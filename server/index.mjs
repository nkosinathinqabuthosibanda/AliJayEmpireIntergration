import { existsSync } from 'node:fs'
import { getServerConfig } from '../config/env.mjs'
import { WEB_DIST } from '../config/paths.mjs'
import { createApp } from './app.mjs'

const config = getServerConfig()

if (!existsSync(WEB_DIST)) {
  console.error(`[alijay-empire] Missing build at ${WEB_DIST}`)
  console.error('[alijay-empire] Run: npm run build')
  process.exit(1)
}

const app = createApp(config)

app.listen(config.port, config.host, () => {
  console.log(`[alijay-empire] ${config.nodeEnv} → http://${config.host}:${config.port}`)
  if (!config.openaiApiKey) {
    console.warn('[alijay-empire] OPENAI_API_KEY not set — Empire AI disabled')
  }
})
