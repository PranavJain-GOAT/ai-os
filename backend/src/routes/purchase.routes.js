const express = require('express');
const { checkout, getMyPurchases, checkOwnership } = require('../controllers/purchase.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.post('/checkout', checkout);
router.get('/my', getMyPurchases);
router.get('/check/:productId', checkOwnership);

module.exports = router;
