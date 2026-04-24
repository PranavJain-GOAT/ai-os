const express = require('express');
const { getDashboardStats, getMyListings } = require('../controllers/developer.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate, authorize('DEVELOPER'));

router.get('/dashboard', getDashboardStats);
router.get('/listings', getMyListings);

module.exports = router;
