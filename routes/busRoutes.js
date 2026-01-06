const express = require('express');
const {addBus, getBuses} = require('../controllers/busController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.post('/',auth, admin, addBus);
router.get('/', getBuses);

module.exports = router;