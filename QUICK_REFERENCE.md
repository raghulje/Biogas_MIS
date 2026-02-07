# 🚀 BioGas MIS - Quick Reference

## 📋 Production Deployment Checklist

### Pre-Deployment
- [ ] Build client: `cd client && npm run build`
- [ ] Verify `client/dist/` folder exists
- [ ] Copy `server/.env.example` to `server/.env`
- [ ] Set `SERVE_CLIENT=true` in `server/.env`
- [ ] Configure database credentials
- [ ] Set secure JWT secrets
- [ ] Update `FRONTEND_URL` to production domain

### Docker Deployment
```bash
# 1. Build client
cd client
npm run build

# 2. Verify .env configuration
cd ../server
# Edit .env: SERVE_CLIENT=true

# 3. Deploy with Docker
cd ..
docker-compose up -d

# 4. Check logs
docker logs srel-uat -f

# 5. Verify health
curl http://localhost:3015/api/health
```

### Manual Deployment
```bash
# 1. Build client
cd client
npm run build

# 2. Configure server
cd ../server
# Edit .env: SERVE_CLIENT=true

# 3. Start server
npm start

# Server now serves both API and client on port 3015
```

## 🔧 Environment Variables

### Development (.env)
```env
SERVE_CLIENT=false
PORT=5001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
FRONTEND_URL=http://localhost:5173
```

### Production (.env)
```env
SERVE_CLIENT=true
PORT=3015
NODE_ENV=production
CORS_ORIGIN=https://your-domain.com
FRONTEND_URL=https://your-domain.com
```

## 🌐 Ports

| Mode | Client Port | Server Port | Access URL |
|------|------------|-------------|------------|
| Development | 5173 | 5001 | http://localhost:5173 |
| Production | N/A | 3015 | http://localhost:3015 |
| Docker | N/A | 3015 | http://localhost:3015 |

## 📁 Important Paths

```
Client Build Output:  client/dist/
Server Static Serve:  ../client/dist (relative to server/)
API Routes:          /api/*
Health Check:        /api/health
Uploads:            /uploads/*
```

## 🐳 Docker Commands

```bash
# Start container
docker-compose up -d

# Stop container
docker-compose down

# View logs
docker logs srel-uat -f

# Restart container
docker-compose restart

# Rebuild and restart
docker-compose up -d --build

# Check health
docker inspect srel-uat | grep -A 10 Health
```

## 🔍 Troubleshooting

### Client not loading
```bash
# Check if dist folder exists
ls client/dist

# Verify SERVE_CLIENT setting
grep SERVE_CLIENT server/.env

# Check server logs
# Should see: "📦 Serving production client from: ..."
```

### API not responding
```bash
# Test health endpoint
curl http://localhost:3015/api/health

# Check database connection
# Look for "Database connected and synced" in logs

# Verify port is listening
netstat -an | findstr 3015
```

### Docker issues
```bash
# Check container status
docker ps -a

# View full logs
docker logs srel-uat

# Enter container
docker exec -it srel-uat sh

# Check health status
docker inspect srel-uat --format='{{.State.Health.Status}}'
```

## 📊 Health Check Response

```json
{
  "status": "healthy",
  "timestamp": "2026-02-07T15:30:00.000Z",
  "uptime": 3600,
  "service": "BioGas MIS API"
}
```

## 🎯 Common Tasks

### Update Production
```bash
# 1. Pull latest code
git pull

# 2. Rebuild client
cd client && npm run build

# 3. Restart server
docker-compose restart
# OR
cd ../server && npm start
```

### View Logs
```bash
# Docker logs
docker logs srel-uat -f --tail 100

# Server logs (if not using Docker)
cd server
npm start
# Logs appear in console
```

### Database Backup
```bash
# Export database
mysqldump -u raghul -p biogas_mis > backup_$(date +%Y%m%d).sql

# Import database
mysql -u raghul -p biogas_mis < backup_20260207.sql
```

## 🔐 Security Checklist

- [ ] Change default JWT secrets
- [ ] Use strong database password
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS for specific domain
- [ ] Enable HTTPS in production
- [ ] Restrict database access
- [ ] Regular security updates
- [ ] Monitor logs for suspicious activity

## 📞 Support

For issues or questions:
1. Check `DEPLOYMENT.md` for detailed guide
2. Review `UPDATES_SUMMARY.md` for recent changes
3. Check Docker logs: `docker logs srel-uat`
4. Verify `.env` configuration
5. Test health endpoint: `/api/health`

## 🎉 Success Indicators

✅ Health check returns 200 OK
✅ Login page loads with SREL logo
✅ API endpoints respond correctly
✅ Database connection successful
✅ Docker container shows "healthy" status
✅ No errors in logs

---

**Last Updated**: February 2026
**Version**: 1.0.0
**Environment**: Production-Ready
