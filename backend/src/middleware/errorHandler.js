const logger = require('../utils/logger');

const handleCastErrorDB = () => ({
  statusCode: 400,
  message: 'ID inválido'
});

const handleValidationErrorDB = (err) => {

  const errors = Object.values(err.errors)
    .map(el => el.message);

  return {
    statusCode: 400,
    message: errors.join(', ')
  };
};

const value = Object.values(err.keyValue).join(', ');
return {
  statusCode: 400,
  message: `Valor duplicado: ${value}`
};

const sendErrorDev = (err, res) => {

  res.status(err.statusCode || 500).json({

    status: err.status || 'error',

    message: err.message,

    stack: err.stack,

    errors: err.errors || null
  });
};

const sendErrorProd = (err, res) => {

  if (err.isOperational) {

    return res.status(err.statusCode).json({

      status: err.status,

      message: err.message
    });
  }

  logger.error(`
    ${err.message}
    Stack: ${err.stack}
  `);

  res.status(500).json({

    status: 'error',

    message: 'Algo salió mal'
  });
};

const errorHandler = (err, req, res, next) => {

  logger.error(`
    ${err.message}
    Ruta: ${req.method} ${req.originalUrl}
    Stack: ${err.stack}
  `);

  err.statusCode = err.statusCode || 500;

  err.status = err.status || 'error';

  let error = { ...err };

  error.message = err.message;

  if (err.name === 'CastError') {
    error = handleCastErrorDB(err);
  }

  if (err.name === 'ValidationError') {
    error = handleValidationErrorDB(err);
  }

  if (err.code === 11000) {
    error = handleDuplicateFieldsDB(err);
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else {

    sendErrorProd(error, res);
  }
};

module.exports = errorHandler;
