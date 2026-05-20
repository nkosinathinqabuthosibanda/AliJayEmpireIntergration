import fs from 'node:fs'
import path from 'node:path'
import { ROOT } from './paths.mjs'

const ENV_FILES = ['.env', '.env.local']

/**
 * Load .env then .env.local from repo root (local overrides).
 * Does not overwrite variables already set in the process environment.
 */
export function loadEnv() {
  for (const file of ENV_FILES) {
    const filePath = path.join(ROOT, file)
    if (!fs.existsSync(filePath)) continue

    const lines = fs.readFileSync(filePath, 'utf8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      const eq = trimmed.indexOf('=')
      if (eq === -1) continue

      const key = trimmed.slice(0, eq).trim()
      let value = trimmed.slice(eq + 1).trim()

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }

      if (!(key in process.env)) {
        process.env[key] = value
      }
    }
  }
}

export function getServerConfig() {
  loadEnv()

  const nodeEnv = process.env.NODE_ENV || 'development'
  const isProduction = nodeEnv === 'production'

  return {
    nodeEnv,
    isProduction,
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || '127.0.0.1',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
  }
}
