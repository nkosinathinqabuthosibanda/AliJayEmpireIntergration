# Alijay Empire Integration Hub

Unified portal for Alijay Empire business systems — transport, invoicing, HR, inventory, Empire AI, and developer catalogue.

## Project layout

```
├── apps/web/          React frontend (Vite)
│   ├── src/
│   ├── public/
│   └── dist/          Built static files (after npm run build)
├── server/            Production Node server (static + API proxy)
├── config/            Shared env, paths, OpenAI proxy (dev + prod)
├── deploy/            Nginx + PM2 configs for Hostinger VPS
└── scripts/           Build & verify helpers
```

## Environment

Copy `.env.example` to `.env` (VPS) or `.env.local` (local).  
`.env.local` overrides `.env` if both exist.

| Variable | Purpose |
|----------|---------|
| `OPENAI_API_KEY` | Empire AI (server-side only) |
| `PORT` | Production server port (default `3000`) |
| `HOST` | Bind address (default `127.0.0.1` — use with Nginx) |
| `NODE_ENV` | `production` on VPS |

## Commands

| Command | Use |
|---------|-----|
| `npm run dev` | Local frontend at http://localhost:5173 (Vite + API proxy) |
| `npm run build` | Build frontend → `apps/web/dist` |
| `npm start` | Production server (requires build first) |
| `npm run verify` | Check build + env before deploy |
| `npm run start:prod` | Same as start with `NODE_ENV=production` |

## VPS deploy (Hostinger)

See **[deploy/HOSTINGER-VPS.md](deploy/HOSTINGER-VPS.md)**.

```bash
npm ci
npm run build
cp .env.example .env   # set OPENAI_API_KEY
npm run verify
pm2 start deploy/ecosystem.config.cjs
```

Health check: `GET /api/health`

## Connected systems

| System | URL |
|--------|-----|
| Abnormal Transport | https://abnormal.alijayempire.co.za/ |
| InvoicePlane | https://www.invoice.alijayempire.co.za/ |
| OrangeHRM | https://alijayempire.com/ |
| Inventory | https://inventory.alijayempire.co.za/login |

Built by [Icon Industries](https://www.iconindustries.co.za).
