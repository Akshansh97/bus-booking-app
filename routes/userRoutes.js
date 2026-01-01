const express = require('express');
const { addUser, getAllUsers } = require('../controllers/userController');
const {login} = require('../controllers/authController');

const router = express.Router();

router.post('/', addUser);
router.get('/', getAllUsers);
router.post('/login', login);

module.exports = router;