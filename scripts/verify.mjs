import { existsSync } from 'node:fs'
import { getServerConfig } from '../config/env.mjs'
import { WEB_DIST, WEB_ROOT } from '../config/paths.mjs'

const config = getServerConfig()
let failed = false

function check(label, ok) {
  if (!ok) {
    console.error(`✗ ${label}`)
    failed = true
  } else {
    console.log(`✓ ${label}`)
  }
}

check('Web app source', existsSync(WEB_ROOT))
check('Production build (apps/web/dist)', existsSync(WEB_DIST))
check('OPENAI_API_KEY set', Boolean(config.openaiApiKey))

if (failed) {
  console.error('\nRun: npm run build')
  if (!config.openaiApiKey) {
    console.error('Copy .env.example → .env and set OPENAI_API_KEY')
  }
  process.exit(1)
}

console.log('\nReady for VPS deploy: npm start')
