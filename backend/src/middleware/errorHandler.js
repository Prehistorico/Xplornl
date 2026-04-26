const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {

  logger.error(`
    ${err.message}
    Ruta: ${req.method} ${req.originalUrl}
    Stack: ${err.stack}
  `);

  res.status(err.status || 500).json({
    message: err.message || 'Error del servidor'
  });
};

module.exports = errorHandler;