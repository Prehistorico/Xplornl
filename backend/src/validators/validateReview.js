const mongoose = require('mongoose');
const AppError = require('../utils/appError');

const containsBannedWords = require('../utils/containsBannedWords');

exports.validateCreateReview = (req, res, next) => {
  const {title, description, rating, place} = req.body;

  if (!place) {
    return next(
      new appError('El place es obligatorio', 400)
    );
  }

  if (!mongoose.Types.ObjectId.isValid(place)) {
    return next(
      new appError('ID de place inválido', 400)
    );
  }

  if (!title || typeof title !== 'string') {
    return next(
      new appError('El título es obligatorio', 400)
    );
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length < 3) {
    return next(
      new appError('El título debe tener al menos 3 caracteres', 400));
  }

  if (trimmedTitle.length > 50) {
    return next(
      new appError('El título no puede superar los 50 caracteres', 400));
  }

  req.body.title = trimmedTitle;

  if (description !== undefined) {

    if (typeof description !== 'string') {
      return next(
        new appError('La descripción debe ser texto', 400));
    }

    const trimmedDescription = description.trim();

    if (trimmedDescription.length > 200) {
      return next(
        new appError('La descripción no puede superar los 200 caracteres', 400));
    }

    req.body.description = trimmedDescription;
  }

  if (title !== undefined && containsBannedWords(title)){
    return next(new AppError('El título contiene palabras prohibidas', 400));
  }

  if (description !== undefined && containsBannedWords(description)){
    return next(new AppError('La descripción contiene palabras prohibidas', 400));
  }

  if (rating === undefined) {
    return next(
      new appError('El rating es obligatorio', 400)
    );
  }

  if (typeof rating !== 'number') {
    return next(
      new appError('El rating debe ser un número', 400));
  }

  if (rating < 0 || rating > 5) {
    return next(
      new appError('El rating debe estar entre 0 y 5', 400));
  }

  next();
};
exports.validateUpdateReview = (req, res, next) => {
  const {title, description, rating} = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string') {
      return next(
        new appError('El título debe ser texto', 400));
    }

    const trimmedTitle = title.trim();

    if (trimmedTitle.length < 3) {
      return next(
        new appError('El título debe tener al menos 3 caracteres', 400));
    }

    if (trimmedTitle.length > 50) {
      return next(
        new appError('El título no puede superar los 50 caracteres', 400));
    }

    req.body.title = trimmedTitle;
  }

  if (description !== undefined) {

    if (typeof description !== 'string') {
      return next(
        new appError('La descripción debe ser texto', 400));
    }

    const trimmedDescription = description.trim();

    if (trimmedDescription.length > 200) {
      return next(
        new appError('La descripción no puede superar los 200 caracteres', 400));
    }

    req.body.description = trimmedDescription;
  }

  if (rating !== undefined) {
    
    if (typeof rating !== 'number') {
      return next(
        new appError('El rating debe ser un número', 400));
    }

    if (rating < 0 || rating > 5) {
      return next(
        new appError('El rating debe estar entre 0 y 5', 400));
    }
  }

  next();
};