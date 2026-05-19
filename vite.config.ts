import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/openai': {
          target: 'https://api.openai.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/openai/, '/v1'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const key = env.OPENAI_API_KEY
              if (key) {
                proxyReq.setHeader('Authorization', `Bearer ${key}`)
              }
            })
          },
        },
      },
    },
    preview: {
      proxy: {
        '/api/openai': {
          target: 'https://api.openai.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/openai/, '/v1'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const key = env.OPENAI_API_KEY
              if (key) {
                proxyReq.setHeader('Authorization', `Bearer ${key}`)
              }
            })
          },
        },
      },
    },
  }
})
