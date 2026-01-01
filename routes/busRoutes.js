const express = require('express');
const {addBus, getBuses} = require('../controllers/busController');

const router = express.Router();

router.post('/', addBus);
router.get('/', getBuses);

module.exports = router;