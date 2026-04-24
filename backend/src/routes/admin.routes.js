const express = require('express');
const { getPlatformStats, getAllUsers, getPendingProducts, reviewProduct } = require('../controllers/admin.controller');
const { authenticate, adminOnly } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate, adminOnly);

router.get('/stats', getPlatformStats);
router.get('/users', getAllUsers);
router.get('/products/pending', getPendingProducts);
router.patch('/products/:id/review', reviewProduct);

module.exports = router;
