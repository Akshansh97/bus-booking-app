const express = require('express');
const { addRoute, getRoutes } = require('../controllers/routeController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.post('/', auth, admin, addRoute);
router.get('/', getRoutes);

module.exports = router;