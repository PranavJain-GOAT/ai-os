const express = require('express');
const { getProductReviews, createReview, deleteReview } = require('../controllers/review.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/product/:id', getProductReviews);
router.post('/product/:id', authenticate, createReview);
router.delete('/:id', authenticate, deleteReview);

module.exports = router;
