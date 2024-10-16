// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../Controller/feedbackController');


router.post('/send-feedback', feedbackController.sendFeedback);

module.exports = router;
