const appError = require('../utils/appError');

const containsBannedWords = require('../utils/containsBannedWords');

exports.validateCreateCategory = (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return next(new appError('El nombre es obligatorio', 400));
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 3) {
    return next(new appError('La categoría debe tener al menos 3 caracteres', 400));
  }

  if (trimmedName.length > 25) {
    return next(new appError('La categoría no puede superar 25 caracteres', 400));
  }

  if (containsBannedWords(trimmedName)) {
    return next(new appError('El nombre de la categoría infringe las normas de la comunidad', 400));
  }

  req.body.name = trimmedName;
  next();
};
exports.validateUpdateCategory = (req, res, next) => {
  const { name } = req.body;

  if (name !== undefined) {
    if (typeof name !== 'string') {
      return next(new appError('El nombre debe ser texto', 400));
    }

    const trimmedName = name.trim();

    if (trimmedName.length < 3){
      return next(new appError('La categoría debe tener al menos 3 caracteres', 400));
    }

    if (trimmedName.length > 25) {
      return next(new appError('La categoría no puede superar 25 caracteres', 400));
    }

    if (containsBannedWords(trimmedName)) {
      return next(new appError('El nombre de la categoría infringe las normas de la comunidad', 400));
    }

    req.body.name = trimmedName;
  }
  next();
};