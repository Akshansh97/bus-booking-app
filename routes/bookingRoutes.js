const express = require('express');
const { createBooking, getBookings, confirmBooking, cancelBooking } = require('../controllers/bookingController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.post('/', auth, createBooking);
router.get('/', auth, admin, getBookings);
router.put('/confirm/:bookingId', auth, admin, confirmBooking);
router.put('/cancel/:bookingId', auth, cancelBooking);
router.get('/me', auth, getBookings);

module.exports = router;