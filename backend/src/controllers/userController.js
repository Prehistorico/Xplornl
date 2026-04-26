const User = require('../models/User');

const AppError = require('../utils/AppError');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role === 'cliente' && req.user.id !== id) {
      return res.status(403).json({ message: 'Usaurio no autorizado' });
    }

    const user = await User.findById(id).select('-password');

    res.json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role === 'cliente' && req.user.id !== id) {
      return res.status(403).json({ message: 'Usaurio no autorizado' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ).select('-password');

    res.json({
      message: 'Usuario actualizado',
      user: updatedUser
    });

  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role === 'cliente' && req.user.id !== id) {
      return res.status(403).json({ message: 'Usaurio no autorizado' });
    }

    await User.findByIdAndDelete(id);

    res.json({ message: 'Usuario eliminado' });

  } catch (error) {
    next(error);
  }
};