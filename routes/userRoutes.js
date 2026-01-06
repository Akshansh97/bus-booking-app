const express = require('express');
const { addUser, getAllUsers, getMe } = require('../controllers/userController');
const {login} = require('../controllers/authController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.post('/', addUser);
router.get('/', auth, admin, getAllUsers);
router.post('/login', login);

router.get('/me', auth, getMe);

module.exports = router;