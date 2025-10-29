const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

/**
 * Backend/src/server.js
 * Minimal Express + Mongoose server for a MERN-style backend.
 *
 * Usage:
 *  - create a .env with MONGO_URI and PORT (optional)
 *  - npm install express mongoose cors helmet morgan dotenv
 */

require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Basic routes
app.get('/', (req, res) => {
    res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

const api = express.Router();
api.get('/ping', (req, res) => res.json({ pong: true }));
// Add more API routes here, e.g. api.use('/users', require('./routes/users'));
app.use('/api', api);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_app';
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Start server
const PORT = parseInt(process.env.PORT, 10) || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = (signal) => {
    console.log(`Received ${signal}. Closing server...`);
    server.close(() => {
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed. Exiting.');
            process.exit(0);
        });
    });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

module.exports = app;