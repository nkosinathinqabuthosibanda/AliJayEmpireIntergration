/**
 * Production server for Hostinger VPS (and similar).
 * Serves Vite build from dist/ and proxies /api/openai → OpenAI (key stays server-side).
 */
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const dist = path.join(root, 'dist')
const port = Number(process.env.PORT) || 3000
const apiKey = process.env.OPENAI_API_KEY

const app = express()

app.use(
  '/api/openai',
  createProxyMiddleware({
    target: 'https://api.openai.com',
    changeOrigin: true,
    pathRewrite: { '^/api/openai': '/v1' },
    on: {
      proxyReq: (proxyReq) => {
        if (apiKey) {
          proxyReq.setHeader('Authorization', `Bearer ${apiKey}`)
        }
      },
    },
  })
)

app.use(express.static(dist, { index: 'index.html', maxAge: '1d' }))

app.get(/^(?!\/api\/).*/, (_req, res) => {
  res.sendFile(path.join(dist, 'index.html'))
})

app.listen(port, '127.0.0.1', () => {
  console.log(`Alijay Empire hub → http://127.0.0.1:${port}`)
  if (!apiKey) {
    console.warn('Warning: OPENAI_API_KEY is not set — Empire AI will not work.')
  }
})
