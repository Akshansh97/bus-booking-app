const express = require('express');
const { addCity, getCities } = require('../controllers/cityController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.post('/', auth, admin, addCity);
router.get('/', getCities);

module.exports = router;