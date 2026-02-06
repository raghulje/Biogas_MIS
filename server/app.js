const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models');
const routes = require('./routes');
const schedulerService = require('./services/schedulerService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Base Route
app.get('/', (req, res) => {
    res.json({ message: 'Biogas MIS API is running' });
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start Server
db.sequelize.sync({ alter: false }).then(async () => {
    console.log('Database connected and synced');

    // Initialize Scheduler
    try {
        await schedulerService.init();
    } catch (e) {
        console.error('Failed to init scheduler:', e);
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to sync db:', err);
});
