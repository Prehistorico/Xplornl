const mongoose = require('mongoose');
const AppError = require('../utils/appError');

const validateObjectId = (param = 'id') => {
  return (req, res, next) => {

    const value = req.params[param];

    if (!mongoose.Types.ObjectId.isValid(value)) {
      return next(
        new AppError(`ID inválido: ${param}`, 400)
      );
    }

    next();
  };
};
module.exports = validateObjectId;