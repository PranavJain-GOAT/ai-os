const express = require('express');
const { uploadImage } = require('../controllers/upload.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/image', authenticate, uploadImage);

module.exports = router;
