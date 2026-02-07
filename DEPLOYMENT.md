# BioGas MIS - Production Deployment Guide

## 📦 Building for Production

### Step 1: Build the Client

```bash
cd client
npm run build
```

This will create an optimized production build in `client/out/` directory.

### Step 2: Configure Server Environment

Add the following to your `server/.env` file:

```env
# Production Mode - Serve built client files
SERVE_CLIENT=true

# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=biogas_mis
DB_PORT=3306

# Server Configuration
PORT=3015
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=http://your-domain.com

# JWT Secret
JWT_SECRET=your-secure-jwt-secret-here
```

### Step 3: Start the Server

```bash
cd server
npm start
```

The server will now:
- Serve the API on `/api/*` routes
- Serve the built React app for all other routes
- Handle client-side routing automatically
- Apply proper caching headers for static assets

## 🐳 Docker Deployment

### Using Docker Compose

The project includes a `docker-compose.yml` file for easy deployment:

```yaml
services:
  srel-uat:
    image: node:23
    container_name: srel-uat
    working_dir: /app/server
    volumes:
      - ./server:/app/server
      - ./client:/app/client
    command: npm start
    env_file:
      - ./server/.env
    expose:
      - "3015"
    networks:
      - proxy

networks:
  proxy:
    external: true
```

### Deployment Steps

1. **Build the client locally** (before deploying):
   ```bash
   cd client
   npm run build
   ```

2. **Ensure `.env` is configured** with `SERVE_CLIENT=true`

3. **Deploy with Docker Compose**:
   ```bash
   docker-compose up -d
   ```

4. **Access the application**:
   - The server will be available on port 3015
   - All routes (both API and frontend) are served from the same port

## 🔧 Development vs Production

### Development Mode (Default)
- Client runs on port 5173 (Vite dev server)
- Server runs on port 3015 (API only)
- Hot module replacement enabled
- CORS configured for cross-origin requests

**Start Development:**
```bash
# Terminal 1 - Client
cd client
npm run dev

# Terminal 2 - Server
cd server
npm start
```

### Production Mode
- Server serves both API and built client on port 3015
- Optimized static assets with 1-year caching
- HTML files with no-cache headers
- Client-side routing handled by server

**Start Production:**
```bash
# Build client first
cd client
npm run build

# Set SERVE_CLIENT=true in server/.env
# Then start server
cd server
npm start
```

## 📁 Directory Structure

```
BioGas_MIS/
├── client/
│   ├── dist/              # Production build (created by npm run build)
│   ├── src/
│   └── package.json
├── server/
│   ├── .env              # Environment configuration
│   ├── app.js            # Express app with static file serving
│   └── package.json
└── docker-compose.yml    # Docker deployment configuration
```

## 🚀 Caching Strategy

The server applies intelligent caching:

- **Static Assets** (JS, CSS, images, fonts): 1 year cache with `immutable` flag
- **HTML Files**: No cache, always revalidate
- **API Routes**: No caching applied

## 🔐 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **JWT Secret**: Use a strong, random secret in production
3. **Database**: Use secure credentials and restrict access
4. **CORS**: Configure `FRONTEND_URL` to your actual domain
5. **Helmet**: Security headers are applied automatically

## 📊 Monitoring

The server logs will indicate the mode:
- `📦 Serving production client from: /path/to/dist` - Production mode
- `🔧 Development mode: Client should be running separately on port 5173` - Development mode

## 🆘 Troubleshooting

### Client not being served
- Ensure `SERVE_CLIENT=true` in `.env`
- Verify `client/dist/` directory exists
- Check server logs for the serving mode

### 404 on client routes
- Server automatically handles client-side routing
- Ensure the route doesn't start with `/api/` or `/uploads/`

### Assets not loading
- Check browser console for CORS errors
- Verify `FRONTEND_URL` in `.env` matches your domain
- Clear browser cache if assets are stale

## 📝 Notes

- The client build output is in `dist/` (Vite default)
- Server looks for client files in `../client/dist`
- Docker volume mounts both client and server directories
- The `proxy` network is external and should be created beforehand
