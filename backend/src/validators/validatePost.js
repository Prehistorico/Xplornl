const Place = require('../models/Place');
const Category = require('../models/Category');

const AppError = require('../utils/appError');

const {
  isNonEmptyString,
  isValidObjectId
} = require('./validateInputs');
const containsBannedWords = require('../utils/containsBannedWords');
const validateReference = async ({value, model, fieldName}) => {
  if (!isValidObjectId(value)) {
    throw new AppError(`${fieldName} inválido`, 400);
  }

  const exists = await model.findById(value);

  if (!exists) {
    throw new AppError(`${fieldName} no existe`, 404);
  }
};
const cleanOptionalString = (value) => {

  if (typeof value !== 'string') {return value;}

  const trimmed = value.trim();

  return trimmed === ''
    ? undefined
    : trimmed;
};

exports.validateCreatePost = async (req, res, next) => {
  try {
    let { title, description, place, category } = req.body;

    title = cleanOptionalString(title);
    description = cleanOptionalString(description);

    req.body.title = title;
    req.body.description = description;

    const hasTitle = !!title;
    const hasDescription = !!description;
    const hasImages = req.files && req.files.length > 0;

    if (!hasTitle && !hasDescription && !hasImages) {
      return next(
        new AppError('El post debe contener título, descripción o imágenes', 400)
      );
    }

    if (title !== undefined && containsBannedWords(title)) {
      if (!isNonEmptyString(title, 0)) {
         return next(new AppError('Título inválido', 400));
      }
      if (title !== undefined && containsBannedWords(title)){
        return next(new AppError('El título contiene palabras prohibidas', 400));
      }
      if (title.length > 120) {
        return next(new AppError('El título no puede exceder 120 caracteres', 400));
      }
    }

    if (description !== undefined && containsBannedWords(description)) {
      if (!isNonEmptyString(description, 0)) {
         return next(new AppError('Descripción inválida', 400));
      }
      if (description !== undefined && containsBannedWords(description)){
        return next(new AppError('La descripción contiene palabras prohibidas', 400));
      }
      if (description.length > 800) {
        return next(new AppError('La descripción no puede exceder 800 caracteres', 400));
      }
    }

    if (!place) {
      return next(new AppError('Place es requerido', 400));
    }
    if (!category) {
      return next(new AppError('Category es requerida', 400));
    }

    await validateReference({ value: place, model: Place, fieldName: 'Place' });
    await validateReference({ value: category, model: Category, fieldName: 'Category' });

    next();
  } catch (error) {
    next(error);
  }
};
exports.validateUpdatePost = async (req, res, next) => {
  try {
    let {
      title,
      description,
      place,
      category,
      status
    } = req.body;

    title = cleanOptionalString(title);
    description = cleanOptionalString(description);

    req.body.title = title;
    req.body.description = description;

    if (title !== undefined && containsBannedWords(title)) {
      if (!isNonEmptyString(title, 0)) {
         return next(new AppError('Título inválido', 400));
      }
      if (title !== undefined && containsBannedWords(title)){
        return next(new AppError('El título contiene palabras prohibidas', 400));
      }
      if (title.length > 120) {
        return next(new AppError('El título no puede exceder 120 caracteres', 400));
      }
    }

    if (description !== undefined && containsBannedWords(description)) {
      if (!isNonEmptyString(description, 0)) {
         return next(new AppError('Descripción inválida', 400));
      }
      if (description !== undefined && containsBannedWords(description)){
        return next(new AppError('La descripción contiene palabras prohibidas', 400));
      }
      if (description.length > 800) {
        return next(new AppError('La descripción no puede exceder 800 caracteres', 400));
      }
    }

    if (place !== undefined) {
      await validateReference({
        value: place,
        model: Place,
        fieldName: 'Place'
      });
    }

    if (category !== undefined) {
      await validateReference({
        value: category,
        model: Category,
        fieldName: 'Category'
      });
    }

    const allowedStatus = [
      'pending',
      'approved',
      'rejected'
    ];

    if (status !== undefined) {

      if (!allowedStatus.includes(status)) {
        return next(
          new AppError('Status inválido', 400)
        );
      }

      if (req.user.role !== 'admin') {
        return next(
          new AppError(
            'No autorizado para cambiar status',403)
        );
      }
    }

    next();

  } catch (error) {
    next(error);
  }
};