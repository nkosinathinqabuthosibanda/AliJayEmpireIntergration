# Deploy on Hostinger VPS

Single Node process serves the React build and proxies Empire AI. Nginx handles HTTPS on port 443.

## Architecture

```
Internet → Nginx (:443) → Node server (:3000)
                              ├── Static files (apps/web/dist)
                              ├── /api/openai → OpenAI
                              └── /api/health
```

## 1. Server setup (once)

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

## 2. Deploy app

```bash
cd /var/www
sudo mkdir -p alijay-hub && sudo chown $USER:$USER alijay-hub
cd alijay-hub
git clone YOUR_REPO_URL .

npm ci
npm run build
cp .env.example .env
nano .env
chmod 600 .env
npm run verify
```

`.env` on VPS:

```
NODE_ENV=production
HOST=127.0.0.1
PORT=3000
OPENAI_API_KEY=sk-...
```

## 3. PM2

```bash
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 startup
```

Test:

```bash
curl http://127.0.0.1:3000/api/health
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/
```

## 4. Nginx

Edit `deploy/nginx-hostinger.conf` — set your domain, then:

```bash
sudo cp deploy/nginx-hostinger.conf /etc/nginx/sites-available/alijay-hub
sudo ln -sf /etc/nginx/sites-available/alijay-hub /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

## 5. HTTPS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.co.za
```

## 6. Firewall

Hostinger panel: open **22**, **80**, **443**.

## Updates

```bash
cd /var/www/alijay-hub
git pull
npm ci
npm run build
pm2 restart alijay-empire-hub
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 502 Bad Gateway | `pm2 status` — restart `alijay-empire-hub` |
| Blank page | `npm run build` — check `apps/web/dist` exists |
| Empire AI fails | `OPENAI_API_KEY` in `.env`, then `pm2 restart alijay-empire-hub` |
| Routes 404 | Node server handles SPA fallback automatically |
