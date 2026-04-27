
const express = require('express');
const router = express.Router();
const { register, login, verifyEmail } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validateRegister = require('../middleware/validateRegister');

const User = require('../models/User');

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registrar usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado
 */

router.post('/register', validateRegister, register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Auth]
 */
router.post('/login', login);

router.get('/profile', authMiddleware, (req, res) => {
    res.json({
        message: 'Acceso permitido',
        user: req.user
    });
});

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        res.json({
            message: 'Usuario autenticado',
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

router.get('/verify/:token', verifyEmail);

module.exports = router;