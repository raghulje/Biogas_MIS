const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const db = require('./models');
const routes = require('./routes');
const schedulerService = require('./services/schedulerService');
require('dotenv').config();

// Global crash protection: log unhandled rejections and uncaught exceptions (do not exit)
process.on('unhandledRejection', (reason, promise) => {
    try {
        console.error('UNHANDLED REJECTION:', reason);
    } catch (e) {
        // swallow
    }
});

process.on('uncaughtException', (error) => {
    try {
        console.error('UNCAUGHT EXCEPTION:', error);
    } catch (e) {
        // swallow
    }
});

const app = express();
// Default production port set to 3015; can be overridden via server/.env
const PORT = process.env.PORT || 3015;
const HOST = process.env.HOST || '0.0.0.0';

const corsOptions = {
    // Allow CLIENT_ORIGIN (preferred) or FRONTEND_URL for backward compatibility.
    origin: process.env.CLIENT_ORIGIN || process.env.FRONTEND_URL || true,
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// Health check (useful for load balancers / reverse proxies)
app.get('/api/health', (_req, res) => {
    return res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

app.use('/api', routes);

// Only serve built client files if SERVE_CLIENT is explicitly set to 'true'
// When running separately, client will be on port 3000 (Vite dev server)
const shouldServeClient = process.env.SERVE_CLIENT === 'true';
const clientPath = path.join(__dirname, "../client/out");

if (shouldServeClient && fs.existsSync(clientPath)) {
    console.log('📦 Serving production client from:', clientPath);

    // Production mode: serve built client files with caching
    app.use(express.static(clientPath, {
        maxAge: '1y', // Cache for 1 year
        etag: true,
        lastModified: true,
        setHeaders: (res, filePath) => {
            const ext = path.extname(filePath).toLowerCase();
            const oneYear = 31536000; // 1 year in seconds

            // Cache static assets (JS, CSS, images, fonts) for 1 year
            if (['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.eot'].includes(ext)) {
                res.setHeader('Cache-Control', `public, max-age=${oneYear}, immutable`);
            }
            // Don't cache HTML files (they might change)
            else if (ext === '.html') {
                res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
            }
        }
    }));

    // Handle client-side routing - serve index.html for all non-API routes
    app.get("*", (req, res) => {
        if (!req.path.startsWith('/api/') && !req.path.startsWith('/uploads/')) {
            res.sendFile(path.join(clientPath, "index.html"));
        }
    });
} else {
    // Development mode - don't serve client, just API
    console.log('🔧 Development mode: Client should be running separately on port 5173 (Vite)');

    // Base Route
    app.get('/', (req, res) => {
        res.json({
            message: 'Biogas MIS API is running',
            mode: 'development',
            apiUrl: `http://localhost:3015/api`,
            clientUrl: 'http://localhost:5173',
            note: 'Set SERVE_CLIENT=true in .env to serve built client files'
        });
    });

    // Return helpful message for non-API routes
    app.get("*", (req, res) => {
        if (!req.path.startsWith('/api/') && !req.path.startsWith('/uploads/')) {
            res.json({
                message: "API Server is running. Client should be running separately on port 5173.",
                apiUrl: `https://srel.refex.group:/api`,
                clientUrl: "http://localhost:5173",
                note: "Set SERVE_CLIENT=true in .env to serve built client files"
            });
        }
    });
}

// 404
app.use((req, res) => {
    res.status(404).json({ message: 'Not found', path: req.path });
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || err.statusCode || 500;
    res.status(status).json({ message: err.message || 'Something went wrong!', error: err.message });
});

// Start Server — safe production-ready startup
const migrationRunner = require('./services/migrationRunner');

async function startServer() {
    try {
        // Authenticate DB connection first
        await db.sequelize.authenticate();
        console.log('Database connection authenticated');

        // Run migrations (programmatic, idempotent). In production CI/CD you may run migrations separately.
        await migrationRunner.runPendingMigrations();
        console.log('Migrations checked/applied (if any)');

        // Ensure cron/scheduler starts — required for email reminders
        try {
            await schedulerService.init();
            console.log('Scheduler (cron) initialized');
        } catch (e) {
            console.error('Failed to init scheduler:', e);
        }

        // Attempt to listen; if port is in use, try next ports up to a limit
        const tryListen = (port, host = HOST, retries = 5) => {
            return new Promise((resolve, reject) => {
                const srv = app.listen(port, host);
                srv.on('listening', () => resolve(srv));
                srv.on('error', (err) => {
                    if (err && err.code === 'EADDRINUSE' && retries > 0) {
                        console.warn(`Port ${port} in use — retrying on port ${port + 1}...`);
                        setTimeout(() => {
                            tryListen(port + 1, host, retries - 1).then(resolve).catch(reject);
                        }, 200);
                    } else {
                        reject(err);
                    }
                });
            });
        };

        try {
            const server = await tryListen(PORT, HOST, 10);
            const address = server.address();
            const actualPort = address.port;
            const actualHost = address.address || HOST;
            console.log(`Server is running on http://${actualHost}:${actualPort}`);
        } catch (err) {
            console.error('Failed to start server:', err);
            process.exit(1);
        }
    } catch (err) {
        console.error('Failed to initialize DB/migrations:', err);
        process.exit(1);
    }
}

startServer();
