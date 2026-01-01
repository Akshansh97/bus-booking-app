const express = require('express');
const { addRoute, getRoutes } = require('../controllers/routeController');

const router = express.Router();

router.post('/', addRoute);
router.get('/', getRoutes);

module.exports = router;