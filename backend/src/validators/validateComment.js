const mongoose = require('mongoose');
const appError = require('../utils/appError');

exports.validateCreateComment = (req, res, next) => {
  const { post, description } = req.body;

  if (!post) {
    return next(new appError('El post es obligatorio', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(post)) {
    return next(new appError('ID de post inválido', 400));
  }

  if (!description || typeof description !== 'string') {
    return next(new appError('La descripción es obligatoria', 400));
  }

  const trimmedDescription = description.trim();

  if (trimmedDescription.length < 2) {
    return next(
      new appError(
        'El comentario debe tener al menos 2 caracteres',
        400
      )
    );
  }

  if (trimmedDescription.length > 1000) {
    return next(
      new appError(
        'El comentario no puede superar los 1000 caracteres',
        400
      )
    );
  }

  req.body.description = trimmedDescription;

  next();
};

exports.validateUpdateComment = (req, res, next) => {
  const { description, status } = req.body;

  if (description !== undefined) {

    if (typeof description !== 'string') {
      return next(
        new appError('La descripción debe ser texto', 400)
      );
    }

    const trimmedDescription = description.trim();

    if (trimmedDescription.length < 2) {
      return next(
        new appError(
          'El comentario debe tener al menos 2 caracteres',
          400
        )
      );
    }

    if (trimmedDescription.length > 1000) {
      return next(
        new appError(
          'El comentario no puede superar los 1000 caracteres',
          400
        )
      );
    }

    req.body.description = trimmedDescription;
  }

  if (status !== undefined) {

    const allowedStatus = [
      'approved',
      'pending',
      'rejected'
    ];

    if (!allowedStatus.includes(status)) {
      return next(
        new appError('Estado inválido', 400)
      );
    }
  }

  next();
};