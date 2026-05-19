const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const checkOwnership = ({
  model,
  param = 'id',
  resourceName = 'Recurso',
  attachAs = 'resource'
}) => {

  return catchAsync(async (
    req,
    res,
    next
  ) => {

    const resource = await model.findById(
      req.params[param]
    );

    if (!resource) {

      return next(
        new AppError(
          `${resourceName} no encontrado`,
          404
        )
      );
    }

    const isOwner =
      resource.user.toString() === req.user.id;

    const isAdmin =
      req.user.role === 'admin';

    if (!isOwner && !isAdmin) {

      return next(
        new AppError(
          'No autorizado',
          403
        )
      );
    }

    req[attachAs] = resource;

    next();
  });
};

module.exports = checkOwnership;