const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const authUser = (req, res, next) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return next(
        new AppError('No autorizado', 401)
      );
    }

    const token =
      authHeader.split(' ')[1];

    if (!token) {
      return next(
        new AppError('Token inválido', 401)
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    return next(
      new AppError(
        'Token inválido o expirado', 401)
    );
  }
};

const authAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(
      new AppError('Acceso denegado', 403)
    );
  }
  next();
};

module.exports = { authUser, authAdmin};