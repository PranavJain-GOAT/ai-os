const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const { prisma } = require('../config/database');

const router = express.Router();

router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { 
        id: true, 
        name: true, 
        email: true, 
        role: true, 
        firstName: true,
        lastName: true,
        country: true,
        isEmailVerified: true,
        profileImage: true,
        authProvider: true
      }
    });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

router.get('/profile', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { 
        id: true, 
        name: true, 
        email: true, 
        role: true, 
        firstName: true,
        lastName: true,
        country: true,
        isEmailVerified: true,
        profileImage: true,
        authProvider: true
      }
    });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
