const express = require('express');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const limiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const helmet = require('helmet');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(helmet({crossOriginResourcePolicy: false}));
app.use(express.json());

app.use((req, res, next) => {
  if (req.body) {
    mongoSanitize.sanitize(req.body);
  }
  if (req.params) {
    mongoSanitize.sanitize(req.params);
  }
  next();
});

app.use('/api', limiter);
app.use('/api', require('./routes/authRoutes'));
app.use('/api', authMiddleware);

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