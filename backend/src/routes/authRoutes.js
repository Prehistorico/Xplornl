const express = require('express');
const router = express.Router();
const { register, login, verifyEmail } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validateRegister = require('../validators/validateRegister');
const authLimiter = require('../middleware/authLimiter');

const User = require('../models/User');

router.post('/register', validateRegister, register);
router.post('/login', authLimiter, login);
router.get('/verify/:token', verifyEmail);

module.exports = router;