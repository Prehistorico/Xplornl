require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

