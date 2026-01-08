const express = require('express');
const { payment } = require('../controllers/paymentController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/pay', auth, payment);

module.exports = router;