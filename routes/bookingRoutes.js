const express = require('express');
const { createBooking, getBookings, confirmBooking, cancelBooking } = require('../controllers/bookingController');

const router = express.Router();

router.post('/', createBooking);
router.get('/', getBookings);
router.put('/confirm/:bookingId', confirmBooking);
router.put('/cancel/:bookingId', cancelBooking);

module.exports = router;