const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const limiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const { authUser } = require('./middleware/authMiddleware');

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
app.use('/api/auth', require('./routes/authRoutes'));

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/users', authUser, require('./routes/userRoutes'));
app.use('/api/places', authUser, require('./routes/placeRoutes'));
app.use('/api/posts', authUser, require('./routes/postRoutes'));
app.use('/api/comments', authUser, require('./routes/commentRoutes'));
app.use('/api/categories', authUser, require('./routes/categoryRoutes'));
app.use('/api/reviews', authUser, require('./routes/reviewRoutes'));

app.get('/', (req, res) => {
    res.send('API funcionando');
});

app.use(errorHandler);
module.exports = app;