const AppError = require('../utils/appError');

module.exports = (...roles) => {
   return (req, res, next) => {

      if (!roles.includes(req.user.role)) {
         return next(
            new AppError('Acceso denegado', 403)
         );
      }
      next();
   };
};