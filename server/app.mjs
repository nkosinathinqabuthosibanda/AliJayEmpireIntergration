import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'node:path'
import { WEB_DIST } from '../config/paths.mjs'
import {
  OPENAI_API_PREFIX,
  createOpenAIProxyMiddlewareOptions,
} from '../config/openai.mjs'
import { registerHealthRoute } from './health.mjs'

export function createApp(config) {
  const app = express()

  app.disable('x-powered-by')
  registerHealthRoute(app, config)

  app.use(
    OPENAI_API_PREFIX,
    createProxyMiddleware(createOpenAIProxyMiddlewareOptions(config.openaiApiKey))
  )

  app.use(
    express.static(WEB_DIST, {
      index: 'index.html',
      maxAge: config.isProduction ? '1d' : 0,
    })
  )

  app.get(/^(?!\/api\/).*/, (_req, res) => {
    res.sendFile(path.join(WEB_DIST, 'index.html'))
  })

  return app
}
