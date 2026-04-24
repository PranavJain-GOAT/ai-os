const express = require('express');
const { getPlatformAnalytics } = require('../controllers/analytics.controller');
const { authenticate, adminOnly } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/platform', authenticate, adminOnly, getPlatformAnalytics);

module.exports = router;
