const { prisma } = require('../config/database');
const { AppError } = require('../middleware/errorHandler');

const getProductReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviews = await prisma.review.findMany({
      where: { productId: id },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    // Check if user has purchased the product
    const purchase = await prisma.purchase.findFirst({
      where: { userId: req.user.id, productId: id, status: 'COMPLETED' }
    });

    if (!purchase) {
      return next(new AppError('You must purchase the product before reviewing it', 403));
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId: req.user.id,
        productId: id
      }
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await prisma.review.findUnique({ where: { id } });

    if (!review) {
      return next(new AppError('Review not found', 404));
    }

    if (review.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return next(new AppError('Not authorized to delete this review', 403));
    }

    await prisma.review.delete({ where: { id } });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductReviews,
  createReview,
  deleteReview
};
