const Place = require('../models/Place');
const Category = require('../models/Category');

const {
  isNonEmptyString,
  isValidObjectId
} = require('./valdateInputs');

const AppError = require('../utils/appError');

const validateReference = async ({value, model, fieldName}) => {
   if (!isValidObjectId(value)) {
    throw new AppError(`${fieldName} inválido`,400);
  }

  const exists = await model.findById(value);

  if (!exists) {
    throw new AppError(`${fieldName} no existe`,404);
  }
};
exports.validateCreatePost = async (req, res, next) => {
  try {
    const {title, description, place, category} = req.body;

    if (!isNonEmptyString(title, 3)) {
      return next(
        new AppError('Título inválido', 400)
      );
    }

    if (description && isNonEmptyString(description, 5)) {
      return next(
        new AppError('Descripción inválida', 400)
      );
    }

    if (place) {
      await validateReference({
        value: place,
        model: Place,
        fieldName: 'Place'
      });
    }

    if (category) {
      await validateReference({
        value: category,
        model: Category,
        fieldName: 'Category'
      });
    }

    next();

  } catch(error) {
    next(error);
  }
};
exports.validateUpdatePost = async (req, res, next) => {
   try {
      const { title, description, tags, status } = req.body;
      if ( title !== undefined && !isNonEmptyString(title, 3)) {
         return next(
            new AppError('Título inválido', 400)
         );
      }

      if (description !== undefined && !isNonEmptyString(description, 5)) {
         return next(
            new AppError('Descripción inválida', 400)
         );
      }

      if (tags?.place) {
         if (!isValidObjectId(tags.place)) {
            return next(
               new AppError('Place inválido', 400)
            );
         }

         const placeExists = await Place.findById(tags.place);

         if (!placeExists) {
            return next(
               new AppError('Place no existe', 404)
            );
         }
      }

      if (tags?.category) {
         if (!isValidObjectId(tags.category)) {
            return next(
               new AppError('Category inválida', 400)
            );
         }

         const categoryExists = await Category.findById(tags.category);

         if (!categoryExists) {
            return next(
               new AppError('Category no existe', 404)
            );
         }
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
               new AppError('No autorizado para cambiar status', 403
               )
            );
         }
      }

      next();

   } catch(error) {
      next(error);
   }
};