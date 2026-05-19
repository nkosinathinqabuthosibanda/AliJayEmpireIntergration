# Deploy on Hostinger VPS

This guide runs the full hub (including **Empire AI**) on a Hostinger Linux VPS with Nginx + Node + PM2.

## What you need

- Hostinger VPS (Ubuntu 22.04 recommended)
- A domain or subdomain pointing to the VPS IP (e.g. `hub.alijayempire.co.za`)
- SSH access (root or sudo user)
- Your OpenAI API key (server-side only)

## 1. Server setup (once)

SSH into the VPS:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

## 2. Upload the project

**Option A — Git (recommended)**

```bash
cd /var/www
sudo mkdir -p alijay-hub && sudo chown $USER:$USER alijay-hub
cd alijay-hub
git clone YOUR_REPO_URL .
```

**Option B — Upload `dist/` + files**

Upload the whole project folder (or build locally and upload `dist/`, `server/`, `package.json`, `package-lock.json`).

## 3. Build and configure

```bash
cd /var/www/alijay-hub
npm ci
npm run build
cp .env.example .env
nano .env
```

Set in `.env`:

```
OPENAI_API_KEY=sk-...
PORT=3000
```

Lock permissions:

```bash
chmod 600 .env
```

## 4. Start with PM2

```bash
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 startup
```

Follow the command `pm2 startup` prints (copy/paste the sudo line).

Test locally on the VPS:

```bash
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/
```

You should see `200`.

## 5. Nginx reverse proxy

Edit `deploy/nginx-hostinger.conf` — replace `YOUR_DOMAIN` with your real domain, then:

```bash
sudo cp deploy/nginx-hostinger.conf /etc/nginx/sites-available/alijay-hub
sudo ln -sf /etc/nginx/sites-available/alijay-hub /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## 6. HTTPS (Let’s Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d hub.alijayempire.co.za
```

Certbot updates Nginx for SSL automatically.

## 7. Firewall (Hostinger panel + VPS)

- Hostinger: allow ports **80**, **443**, **22** (SSH)
- Optional on VPS: `sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable`

## Updates after code changes

```bash
cd /var/www/alijay-hub
git pull
npm ci
npm run build
pm2 restart alijay-empire-hub
```

## Troubleshooting

| Problem | Fix |
|--------|-----|
| Site 502 | `pm2 status` — ensure `alijay-empire-hub` is online |
| Empire AI fails | Check `.env` has `OPENAI_API_KEY`, then `pm2 restart alijay-empire-hub` |
| Routes 404 on refresh | Node server already serves `index.html` for SPA routes |
| Blank page | Run `npm run build` again; confirm `dist/` exists |

## Security

- Never commit `.env` or API keys to Git
- Rotate the key if it was ever shared in chat or email
- Keep Node and the OS updated: `sudo apt upgrade`
