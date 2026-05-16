const rateLimit = require('express-rate-limit');
const limiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 100,

   message: {
   status: 'fail',
   message: 'Demasiadas solicitudes, intenta más tarde'
   },

  standardHeaders: true,

  legacyHeaders: false
});
module.exports = limiter;