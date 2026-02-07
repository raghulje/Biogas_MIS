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

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.FRONTEND_URL || true,
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
            apiUrl: `http://localhost:${PORT}/api`,
            clientUrl: 'http://localhost:5173',
            note: 'Set SERVE_CLIENT=true in .env to serve built client files'
        });
    });

    // Return helpful message for non-API routes
    app.get("*", (req, res) => {
        if (!req.path.startsWith('/api/') && !req.path.startsWith('/uploads/')) {
            res.json({
                message: "API Server is running. Client should be running separately on port 5173.",
                apiUrl: `http://localhost:${PORT}/api`,
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

// Start Server — DB sync, then scheduler (cron), then listen
db.sequelize.sync({ alter: true }).then(async () => {
    console.log('Database connected and synced');

    // Ensure cron/scheduler starts — required for email reminders
    try {
        await schedulerService.init();
        console.log('Scheduler (cron) initialized');
    } catch (e) {
        console.error('Failed to init scheduler:', e);
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to sync db:', err);
});
