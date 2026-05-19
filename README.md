# Alijay Empire Integration

React integration portal for **Alijay Empire** — a unified hub linking live platforms:

| System | URL |
|--------|-----|
| Abnormal Transport Command Center (transport & abnormal invoicing) | [abnormal.alijayempire.co.za](https://abnormal.alijayempire.co.za/) |
| InvoicePlane (invoices) | [invoice.alijayempire.co.za](https://www.invoice.alijayempire.co.za/) |
| OrangeHRM (HR) | [alijayempire.com](https://alijayempire.com/) |
| Alijay Asset Management (inventory) | [inventory.alijayempire.co.za](https://inventory.alijayempire.co.za/login) |

## Stack

- React 19 + TypeScript
- Vite
- React Router
- Lucide icons

## Alijay Empire AI

The **Empire AI** panel supports live chat and **email drafting** (e.g. for Tom and the team).

1. Copy `.env.example` to `.env.local`
2. Add your OpenAI API key: `OPENAI_API_KEY=sk-...`
3. Run `npm run dev` (the key stays on the server proxy — not in the browser bundle)

Open **Empire AI** from the header or home page → **Chat** or **Write email**.

## Run locally

```bash
npm install
cp .env.example .env.local
# Edit .env.local and set OPENAI_API_KEY
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build & production (Hostinger VPS)

```bash
npm run build
npm start
```

`npm start` runs the production server on port **3000** (serves `dist/` + OpenAI proxy). Put Nginx in front — see **[deploy/HOSTINGER-VPS.md](deploy/HOSTINGER-VPS.md)** for full Hostinger VPS steps (PM2, SSL, `.env`).

```bash
npm run preview   # local preview only (also has dev proxy)
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, stats, features, and system preview |
| `/integrations` | Full integration hub with search and status filters |
| `/about` | Overview of Alijay Systems and the integration mission |

## Customize

Edit `src/data/integrations.ts` to add or update connected systems, endpoints, and sync status.
