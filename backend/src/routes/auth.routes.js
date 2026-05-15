const express = require('express');
const { register, login, refresh, getMe, googleLogin, googleCallback } = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../utils/schemas');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refresh);
router.get('/me', authenticate, getMe);

// Google OAuth
router.get('/google', googleLogin);
router.route('/google/callback')
  .get(googleCallback)
  .post(googleCallback);


module.exports = router;

