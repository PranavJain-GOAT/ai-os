const { prisma } = require('../config/database');

const getPlatformAnalytics = async (req, res, next) => {
  try {
    // This could track page views, click stats etc.
    // For now, let's just return basic counts over time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const signupData = await prisma.user.groupBy({
      by: ['createdAt'],
      where: { createdAt: { gte: thirtyDaysAgo } },
      _count: { id: true }
    });

    const purchaseData = await prisma.purchase.groupBy({
      by: ['createdAt'],
      where: { createdAt: { gte: thirtyDaysAgo }, status: 'COMPLETED' },
      _count: { id: true },
      _sum: { pricePaid: true }
    });

    res.status(200).json({
      success: true,
      data: { signups: signupData, revenue: purchaseData }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlatformAnalytics
};
