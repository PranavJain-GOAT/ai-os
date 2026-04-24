const { prisma } = require('../config/database');
const { AppError } = require('../middleware/errorHandler');

const getConversations = async (req, res, next) => {
  try {
    // Get distinct partners current user has messaged
    const sent = await prisma.message.findMany({ where: { senderId: req.user.id }, distinct: ['receiverId'] });
    const received = await prisma.message.findMany({ where: { receiverId: req.user.id }, distinct: ['senderId'] });

    const partnerIds = new Set([
      ...sent.map(m => m.receiverId),
      ...received.map(m => m.senderId)
    ]);

    const users = await prisma.user.findMany({
      where: { id: { in: Array.from(partnerIds) } },
      select: { id: true, name: true, email: true }
    });

    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

const getMessagesWithPartner = async (req, res, next) => {
  try {
    const { partnerId } = req.params;
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: req.user.id, receiverId: partnerId },
          { senderId: partnerId, receiverId: req.user.id }
        ]
      },
      orderBy: { createdAt: 'asc' }
    });

    // Mark as read
    await prisma.message.updateMany({
      where: { senderId: partnerId, receiverId: req.user.id, isRead: false },
      data: { isRead: true }
    });

    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const { receiverId, content } = req.body;
    if (!content) return next(new AppError('Message content is required', 400));

    const message = await prisma.message.create({
      data: {
        senderId: req.user.id,
        receiverId,
        content
      }
    });

    res.status(201).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConversations,
  getMessagesWithPartner,
  sendMessage
};
