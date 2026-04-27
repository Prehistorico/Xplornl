const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`
    ${err.message}
    Ruta: ${req.method} ${req.originalUrl}
    Stack: ${err.stack}
  `);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Error del servidor',
    errors: err.errors || null
  });
};

module.exports = errorHandler;

