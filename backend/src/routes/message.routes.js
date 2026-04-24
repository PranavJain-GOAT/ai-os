const express = require('express');
const { getConversations, getMessagesWithPartner, sendMessage } = require('../controllers/message.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/conversations', getConversations);
router.get('/:partnerId', getMessagesWithPartner);
router.post('/', sendMessage);

module.exports = router;
