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
       return next(new appError('El nombre de usuario ya está registrado', 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new appError('El correo ya está registrado', 400));
    }

    const emailToken = crypto.randomBytes(32).toString('hex');
    const emailTokenHash = crypto.createHash('sha256').update(emailToken).digest('hex');

    const newUser = new User({
      username,
      name,
      birthdate,
      email,
      password,
      emailToken: emailTokenHash
    });

    await newUser.save();

    const verifyURL = `http://localhost:5000/api/verify/${emailToken}`;

    await sendEmail(
      email,
      'Verifica tu cuenta',
      `<h1>Verificación</h1>
      <p>Haz click:</p>
      <a href="${verifyURL}">${verifyURL}</a>`
    );

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
       return next(new appError('Todos los campos son obligatorios', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new appError('Usuario inválido.', 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new appError('Contraseña inválida', 400));
    }

    if (!user.isVerified) {
      return next(new appError('Debes verificar tu correo antes de iniciar sesión', 403));
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

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({ emailToken: hashedToken });

    if (!user) {
       return next(new appError('Token inválido', 400 ));
    }

    user.isVerified = true;
    user.emailToken = undefined;

    await user.save();

    res.json({ message: 'Cuenta verificada correctamente' });

  } catch (error) {
    next(error);
  }
};