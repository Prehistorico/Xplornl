const crypto = require('crypto');
const User = require('../models/User');

const sendEmail = require('../services/sendEmail');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const pickFields = require('../utils/pickFields');

exports.getUsers = catchAsync(async (req, res) => {
  const users = await User.find()
    .select('-password');

  res.json(users);
});
exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .select('-password');

  if (!user) {
    return next(
      new AppError('Usuario no encontrado', 404));
  }

  res.json(user);
});
exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
/*   const isOwner = req.user.id === id;
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    return next(
      new AppError('Usuario no autorizado', 403));
  } */

  const user = await User.findById(id);

  if (!user) {
    return next(
      new AppError('Usuario no encontrado', 404));
  }

  const updates = pickFields(req.body, [
    'username',
    'name',
    'birthdate'
  ]);

  Object.assign(user, updates);

  if (req.body.password) {
    user.password = req.body.password;
  }

  if (
    req.body.email &&
    req.body.email !== user.email
  ) {

    const existingUser = await User.findOne({
      email: req.body.email
    });

    if (existingUser) {
      return next(
        new AppError('El correo ya está registrado',400));
    }

    const emailToken =
      crypto.randomBytes(32).toString('hex');

    const emailTokenHash =
      crypto
        .createHash('sha256')
        .update(emailToken)
        .digest('hex');

    user.email = req.body.email;
    user.isVerified = false;
    user.emailToken = emailTokenHash;

    const verifyURL =
      `http://localhost:5000/api/verify/${emailToken}`;

    await sendEmail(
      req.body.email,
      'Verifica tu nuevo correo',
      `
      <h1>Verificación de cambio de correo</h1>
      <p>Haz click para verificar tu nuevo correo:</p>
      <a href="${verifyURL}">
        ${verifyURL}
      </a>
      `
    );
  }

  await user.save();

  res.json({

    message: 'Usuario actualizado',

    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      birthdate: user.birthdate
    }
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const isOwner = req.user.id === id;
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    return next(
      new AppError('Usuario no autorizado', 403));
  }

  const user = await User.findById(id);

  if (!user) {
    return next(
      new AppError('Usuario no encontrado', 404));
  }

  await user.deleteOne();

  res.json({
    message: 'Usuario eliminado'
  });
});