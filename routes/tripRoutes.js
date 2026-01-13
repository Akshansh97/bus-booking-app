const express = require('express');
const { addTrip, getTrips, updateTripStatus, updateTripPrice } = require('../controllers/tripController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.post('/',auth, admin, addTrip);
router.get('/', getTrips);
router.put('/status/:tripId', auth, admin, updateTripStatus);
router.put('/price/:tripId', auth, admin, updateTripPrice);

module.exports = router;