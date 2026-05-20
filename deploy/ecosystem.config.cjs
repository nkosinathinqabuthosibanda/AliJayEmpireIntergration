/** PM2 — from project root: pm2 start deploy/ecosystem.config.cjs */
module.exports = {
  apps: [
    {
      name: 'alijay-empire-hub',
      script: 'server/index.mjs',
      cwd: __dirname + '/..',
      instances: 1,
      autorestart: true,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: 3000,
      },
    },
  ],
}
