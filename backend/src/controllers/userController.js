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

  const user = await User.findById(id);
  if (!user) {
    return next(new AppError('Usuario no encontrado', 404));
  }

  const updates = {
    username: req.body.username,
    avatar: req.body.avatar,
    name: req.body.name,
    birthdate: req.body.birthdate,
    email: req.body.email
  };

  if (req.file) {
    updates.avatar = `/uploads/users/${req.file.filename}`;
  }

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: updates },
    {
      new: true,
      runValidators: true
    }
  );

  res.json({
    message: 'Usuario actualizado',
    user: {
      id: user._id,
      avatar: user.avatar,
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