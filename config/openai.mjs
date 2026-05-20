/** Shared OpenAI proxy settings — used by Vite (dev) and Express (production). */

export const OPENAI_API_PREFIX = '/api/openai'
export const OPENAI_TARGET = 'https://api.openai.com'
export const OPENAI_PATH_REWRITE = { [`^${OPENAI_API_PREFIX}`]: '/v1' }

export function createOpenAIProxyMiddlewareOptions(apiKey) {
  return {
    target: OPENAI_TARGET,
    changeOrigin: true,
    pathRewrite: OPENAI_PATH_REWRITE,
    on: {
      proxyReq: (proxyReq) => {
        if (apiKey) {
          proxyReq.setHeader('Authorization', `Bearer ${apiKey}`)
        }
      },
    },
  }
}

/** Vite dev-server proxy (key from loadEnv at config time). */
export function createViteOpenAIProxy(apiKey) {
  return {
    [OPENAI_API_PREFIX]: {
      target: OPENAI_TARGET,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${OPENAI_API_PREFIX}`), '/v1'),
      configure: (proxy) => {
        proxy.on('proxyReq', (proxyReq) => {
          if (apiKey) {
            proxyReq.setHeader('Authorization', `Bearer ${apiKey}`)
          }
        })
      },
    },
  }
}
