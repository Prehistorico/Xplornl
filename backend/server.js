require('dotenv').config();
const express = require('express');
const app = require('./src/app');
const connectDB = require('./src/config/db');

const ENV = process.env.NODE_ENV || 'development';
console.log(`🚀 Running in ${ENV} mode`);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
