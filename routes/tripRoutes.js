const express = require('express');
const { addTrip, getTrips } = require('../controllers/tripController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.post('/',auth, admin, addTrip);
router.get('/', getTrips);

module.exports = router;