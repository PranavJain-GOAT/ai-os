const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errorHandler } = require('./middleware/errorHandler');

// Route imports
const routes = require('./routes');


const app = express();

// Middlewares
app.use(helmet());
app.use(cors());



// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running' });
});

// Mounted Routes
app.use('/api/v1', routes);

module.exports = app;
