const express = require('express');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const limiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const helmet = require('helmet');

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet({crossOriginResourcePolicy: false}));

app.use('/api', require('./routes/authRoutes'));

const authMiddleware = require('./middleware/authMiddleware');
app.use('/api', authMiddleware);

app.use(mongoSanitize());
app.use(xss());

app.use('/api', limiter);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/places', require('./routes/placeRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));

app.get('/', (req, res) => {
    res.send('API funcionando');
});

app.use(errorHandler);
module.exports = app;