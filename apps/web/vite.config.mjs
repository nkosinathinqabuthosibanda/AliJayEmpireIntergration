import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv as loadRootEnv } from '../../config/env.mjs'
import { createViteOpenAIProxy } from '../../config/openai.mjs'
import { ROOT } from '../../config/paths.mjs'

const webRoot = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  loadRootEnv()
  const env = loadEnv(mode, ROOT, '')
  const apiKey = env.OPENAI_API_KEY || process.env.OPENAI_API_KEY || ''

  return {
    root: webRoot,
    envDir: ROOT,
    plugins: [react()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    server: {
      port: 5173,
      proxy: createViteOpenAIProxy(apiKey),
    },
  }
})
