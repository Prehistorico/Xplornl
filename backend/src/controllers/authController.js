const bcrypt = require('bcryptjs');

const User = require('../models/User');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const pickFields = require('../utils/pickFields');

const {
  generateToken,
  generateEmailToken,
  hashToken
} = require('../services/authService');

const {sendVerificationEmail} = require('../services/emailService');

exports.register = catchAsync(async (req, res, next) => {
  const {username, email} = req.body;
  const existingUsername =await User.findOne({username});

  if (existingUsername) {
    return next(
      new AppError('El nombre de usuario ya está registrado', 400));
  }

  const existingUser = await User.findOne({email});

  if (existingUser) {
    return next(
      new AppError('El correo ya está registrado',400));
  }

  const {rawToken, hashedToken} = generateEmailToken();

  const user = await User.create({
    ...pickFields(req.body, [
      'username',
      'name',
      'birthdate',
      'email',
      'password'
    ]),
    emailToken: hashedToken
  });

  await sendVerificationEmail(user.email, rawToken);

  res.status(201).json({
    message:
      'Usuario registrado. Revisa tu correo para verificar tu cuenta'
  });
});
exports.login = catchAsync(async (req, res,next) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return next(
      new AppError('Todos los campos son obligatorios', 400));
  }

  const user = await User.findOne({email}) .select('+password');

  if (!user) {
    return next(
      new AppError('Usuario inválido', 400));
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    return next(
      new AppError('Contraseña inválida', 400));
  }

  if (!user.isVerified) {
    return next(
      new AppError('Debes verificar tu correo antes de iniciar sesión', 403));
  }

  const token = generateToken(user);

  res.json({

    message: 'Login exitoso',

    user: {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      role: user.role
    },

    token
  });
});
exports.verifyEmail = catchAsync(async (req, res, next) => {
  const hashedToken = hashToken(req.params.token);

  const user = await User.findOne({emailToken: hashedToken});

  if (!user) {
    return next(
      new AppError('Token inválido', 400));
  }

  user.isVerified = true;
  user.emailToken = undefined;

  await user.save();

  res.json({
    message:
      'Cuenta verificada correctamente'
  });
});