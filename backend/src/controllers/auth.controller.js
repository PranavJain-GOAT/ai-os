const bcrypt = require('bcrypt');
const axios = require('axios');
const { prisma } = require('../config/database');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');
const { AppError } = require('../middleware/errorHandler');

const register = async (req, res, next) => {
  try {
    const { email, password, name, role, firstName, lastName, country } = req.body;

    // Password validation for manual signup
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        success: false, 
        message: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character." 
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return next(new AppError('Email already in use', 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role === 'DEVELOPER' ? 'DEVELOPER' : 'CLIENT';

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || `${firstName} ${lastName}`,
        firstName,
        lastName,
        country,
        role: userRole
      }
    });

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    res.status(201).json({
      success: true,
      data: { user: { id: user.id, email: user.email, name: user.name, role: user.role }, accessToken, refreshToken }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return next(new AppError('Invalid email or password', 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError('Invalid email or password', 401));
    }

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    res.status(200).json({
      success: true,
      data: { user: { id: user.id, email: user.email, name: user.name, role: user.role }, accessToken, refreshToken }
    });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return next(new AppError('Refresh token required', 401));
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      return next(new AppError('User not found', 401));
    }

    const newAccessToken = generateAccessToken(user.id, user.role);
    const newRefreshToken = generateRefreshToken(user.id);

    res.status(200).json({
      success: true,
      data: { accessToken: newAccessToken, refreshToken: newRefreshToken }
    });
  } catch (error) {
    next(new AppError('Invalid refresh token', 401));
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, role: true, isEmailVerified: true, createdAt: true }
    });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const googleLogin = (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
};

const googleCallback = async (req, res, next) => {
  const code = req.query.code || req.body.code;

  if (!code) {
    return next(new AppError('No code provided', 400));
  }

  try {
    // Exchange authorization code for access token
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token } = data;

    // Use access_token to fetch user profile
    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    // Check if user exists
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { googleId: profile.id },
          { email: profile.email }
        ]
      }
    });

    if (!user) {
      // Create new user if doesn't exist
      user = await prisma.user.create({
        data: {
          email: profile.email,
          name: profile.name || profile.given_name,
          firstName: profile.given_name,
          lastName: profile.family_name,
          googleId: profile.id,
          isEmailVerified: true,
          role: 'CLIENT' // Default role
        }
      });
    } else if (!user.googleId) {
      // Link googleId if user existed via email
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId: profile.id, isEmailVerified: true }
      });
    }

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    // If it's a GET request (direct from Google), redirect to frontend
    if (req.method === 'GET') {
      return res.redirect(`${process.env.FRONTEND_URL}/auth-callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    }

    // If it's a POST request (from frontend), return JSON
    res.status(200).json({
      success: true,
      data: {
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Google Auth Error:', error.response?.data || error.message);
    if (req.method === 'GET') {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=google_auth_failed`);
    }
    next(new AppError('Google authentication failed', 401));
  }
};



module.exports = {
  register,
  login,
  refresh,
  getMe,
  googleLogin,
  googleCallback
};
