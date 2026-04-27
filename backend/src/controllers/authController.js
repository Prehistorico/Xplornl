const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const appError = require('../utils/appError');

exports.register = async (req, res, next) => {
  try {
    const { username, name, birthdate, email, password } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'El nombre de usuario ya está registrado' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    const newUser = new User({
      username,
      name,
      birthdate,
      email,
      password,
      verificationToken
    });

    await newUser.save();

    res.status(201).json({
      message: 'Usuario registrado. Revisa tu correo para verificar tu cuenta'
    });

  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ message: 'Usuario inválido.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña inválida' });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: 'Debes verificar tu correo antes de iniciar sesión'
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login exitoso',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      token
    });

  } catch (error) {
    next(error);
  }
};
exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Token inválido' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    res.json({ message: 'Cuenta verificada correctamente' });

  } catch (error) {
    next(error);
  }
};
