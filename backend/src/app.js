const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/authRoutes'));

app.get('/', (req, res) => {
    res.send('API funcionando');
});

module.exports = app;