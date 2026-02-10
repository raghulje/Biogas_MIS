# BioGas MIS — Production Deployment Guide

This document explains how to deploy the BioGas MIS application to a production server (Docker recommended) so the app runs on your domain (example: https://srel.refex.group) with the backend listening on port 3015.

Goals
- Run backend (Express + Sequelize) and frontend (Vite/React build) in production
- Use environment files to configure ports, DB, CORS, and secrets
- Run behind a reverse proxy (nginx/Traefik) for TLS and domain routing
- Provide simple docker-compose examples and health checks

Prerequisites
- Host with Docker & Docker Compose installed (or ability to install)
- Domain DNS pointed to your host (A record)
- SMTP credentials for outgoing emails (if using email features)
- MySQL server accessible to the backend (or run MySQL in Docker)

Repository layout (important files)
- server/ — Node/Express backend (main: `server/app.js`)
- client/ — React frontend (Vite) — production build output placed in `client/dist` or `client/out`
- server/.env — server environment variables (do NOT commit with secrets)
- server/config/config.json — Sequelize DB config (edit on host; do NOT commit secrets)

High-level production flow
1. Pull project on the server
2. Create environment files and update `server/config/config.json`
3. Build frontend (or use multi-stage Docker build)
4. Start services with Docker Compose (or run node/npm directly)
5. Configure reverse-proxy (nginx/Traefik) for TLS and domain routing

1) Pull the project on the server

SSH into your server and clone or pull the repo:

```bash
# clone (only first time)
git clone https://github.com/<your-repo>.git /opt/biogas-mis
cd /opt/biogas-mis

# or update existing
git fetch --all
git checkout uat
git pull origin uat
```

2) Prepare environment and config (server side)

- Copy and edit server env file:

```bash
cd /opt/biogas-mis/server
cp .env.example .env    # if you have an example; otherwise create .env
```

Essential server .env variables (example)

```
PORT=3015
HOST=0.0.0.0
NODE_ENV=production
CLIENT_ORIGIN=https://srel.refex.group

# Database (update accordingly)
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=biogas_mis
DB_USER=prod_user
DB_PASSWORD=prod_password

# JWT secrets (strong random values)
JWT_SECRET=...
JWT_REFRESH_SECRET=...

# SMTP (optional)
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=noreply@yourdomain.com
```

- Edit `server/config/config.json` (Sequelize) to match production DB credentials OR configure it to read envs (recommended). Ensure you do NOT commit secrets.

Example minimal `server/config/config.json` (production block):

```json
{
  "production": {
    "username": "prod_user",
    "password": "prod_password",
    "database": "biogas_mis",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  }
}
```

3) Build the client (if not using multi-stage Docker)

On build machine (or server if node & npm present):

```bash
cd /opt/biogas-mis/client
npm ci
npm run build
# Vite typically outputs to `dist` — server app expects `client/out` or `client/dist`.
# Copy or configure server to use the output directory (app.js uses client/out by default)
```

4) Docker: multi-stage Dockerfile (recommended)

Create a root-level `Dockerfile` that builds client and server (example provided earlier). Build and start with docker-compose:

Example `docker-compose.prod.yml`

```yaml
version: '3.8'
services:
  srel-uat:
    build: .
    container_name: srel-uat
    env_file:
      - ./server/.env
    environment:
      - NODE_ENV=production
    expose:
      - "3015"
    networks:
      - proxy
    restart: unless-stopped

  nginx:
    image: nginx:stable
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./deploy/nginx/conf.d:/etc/nginx/conf.d:ro
      - ./deploy/nginx/certs:/etc/nginx/certs:ro
    depends_on:
      - srel-uat
    networks:
      - proxy

networks:
  proxy:
    external: true
```

Example nginx `proxy.conf` snippet:

```
server {
  listen 80;
  server_name srel.refex.group;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name srel.refex.group;
  # SSL cert paths ...

  location /api/ {
    proxy_pass http://srel-uat:3015/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location / {
    proxy_pass http://srel-uat:3015/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Notes:
- Use Let's Encrypt (Certbot) or Traefik to automatically manage TLS.
- When nginx proxies to backend, it should be able to reach srel-uat via Docker network (no published ports needed).

5) Database migration / seed

- If you use Sequelize migrations, run them before starting the app. This repo currently syncs models with alter=true in server/app.js; review `server/models` and backups before running in production.
- Example:
```bash
# ensure DB accessible
cd /opt/biogas-mis/server
npm run init-db
```
or run migrations if you have them.

6) Start the stack

Option A — Docker Compose:
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

Option B — Manual (no Docker):
```bash
# On server
cd /opt/biogas-mis/server
npm ci --only=production
NODE_ENV=production PORT=3015 HOST=0.0.0.0 CLIENT_ORIGIN=https://srel.refex.group npm start
```

7) Verify
- Health check: GET https://srel.refex.group/api/health  -> { status: "ok" }
- API root: GET https://srel.refex.group/api  (may require authentication — use /api/health)
- Frontend: open https://srel.refex.group/

8) Troubleshooting tips
- 502 Bad Gateway: check reverse-proxy target host/port and backend health (/api/health).
- 401 Unauthorized: indicates protected API requires auth — use correct credentials or test endpoints that are public.
- CORS issues: ensure CLIENT_ORIGIN matches frontend origin exactly (including https://).
- Database errors: ensure server/config/config.json or env variables point to the correct DB and the DB user has privileges.
- Logs: check server logs (configured LOG_FILE) and docker logs: `docker-compose logs -f srel-uat`.

Security & best practices
- Never commit .env or server/config/config.json with secrets to Git.
- Use strong JWT secrets and rotate them if leaked.
- Run the app behind TLS (nginx/Traefik + Let's Encrypt).
- Use a process manager or container restart policy (`restart: unless-stopped`) to keep services running.

Want me to generate…
- A ready-to-use `docker-compose.prod.yml` and `nginx` config prefilled for this repo? (I can create them in `deploy/`.)
- A CI job to build client & server and push images to Docker registry? (useful for production)

Pick one and I'll create the files in the repo and push them to the `uat` branch.

