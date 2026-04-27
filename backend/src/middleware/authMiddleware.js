const appError = require('../utils/appError');

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next(new appError('No autorizado', 401));
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return next(new appError('Token inválido', 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; 

        next(); 

    } catch (error) {
        return next(new appError('Token inválido o expirado', 401));
    }
};


module.exports = authMiddleware;