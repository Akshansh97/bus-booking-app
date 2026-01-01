const express = require('express');
const { addCity, getCities } = require('../controllers/cityController');

const router = express.Router();

router.post('/', addCity);
router.get('/', getCities);

module.exports = router;