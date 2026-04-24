const express = require('express');
const { getMyWishlist, toggleWishlist } = require('../controllers/wishlist.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/', getMyWishlist);
router.post('/:productId/toggle', toggleWishlist);

module.exports = router;
