const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const authMiddleware = require('./middleware/authMiddleware');
app.use('/api', require('./routes/authRoutes'));
app.use(require('./middleware/errorHandler'));

app.use('/api', authMiddleware);

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/places', require('./routes/placeRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor'
  });
});


app.get('/', (req, res) => {
    res.send('API funcionando');
});

module.exports = app;