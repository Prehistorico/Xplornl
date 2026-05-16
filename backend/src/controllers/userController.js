const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../services/sendEmail');
const appError = require('../utils/appError');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role === 'cliente' && req.user.id !== id) {
      return next(new appError('Usuario no autorizado', 403));
    }

    const user = await User.findById(id).select('-password');
    if (!user) {
      return next(new appError('Usuario no encontrado', 404));
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role === 'cliente' && req.user.id !== id) {
      return next(new appError('Usuario no autorizado', 403));
    }

    const user = await User.findById(id);
    if (!user) {
      return next(new appError('Usuario no encontrado', 404));
    }

    if (req.body.password) {
      user.password = req.body.password; 
    }

    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return next(new appError('El correo ya está registrado', 400));
      }

      const emailToken = crypto.randomBytes(32).toString('hex');
      const emailTokenHash = crypto.createHash('sha256').update(emailToken).digest('hex');

      user.email = req.body.email;
      user.isVerified = false;
      user.emailToken = emailTokenHash;

      await user.save();

      const verifyURL = `http://localhost:5000/api/verify/${emailToken}`;
      await sendEmail(
        req.body.email,
        'Verifica tu nuevo correo',
        `<h1>Verificación de cambio de correo</h1>
         <p>Haz click para verificar tu nuevo correo:</p>
         <a href="${verifyURL}">${verifyURL}</a>`
      );

      return res.json({
        message: 'Correo actualizado. Revisa tu bandeja para verificar tu nuevo correo.'
      });
    }
    
    if (req.body.username) user.username = req.body.username;
    if (req.body.name) user.name = req.body.name;
    if (req.body.birthdate) user.birthdate = req.body.birthdate;

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

  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role === 'cliente' && req.user.id !== id) {
      return next(new appError('Usuario no autorizado', 403));
    }

    await User.findByIdAndDelete(id);

    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    next(error);
  }
};
