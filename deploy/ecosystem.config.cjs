/** PM2 process file — run from project root: pm2 start deploy/ecosystem.config.cjs */
module.exports = {
  apps: [
    {
      name: 'alijay-empire-hub',
      script: 'server/production.mjs',
      cwd: __dirname + '/..',
      node_args: '--env-file=.env',
      instances: 1,
      autorestart: true,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
