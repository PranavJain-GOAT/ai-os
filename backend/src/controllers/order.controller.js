const { prisma } = require('../config/database');
const { AppError } = require('../middleware/errorHandler');

const createOrder = async (req, res, next) => {
  try {
    const { productId, details } = req.body;
    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        productId,
        details
      }
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: { product: true },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: { product: true, user: { select: { name: true, email: true } } }
    });

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return next(new AppError('Not authorized to view this order', 403));
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById
};
