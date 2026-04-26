const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Proyecto Web',
      version: '1.0.0',
      description: 'Documentación de la API'
    },
    servers: [
      {
        url: 'http://localhost:5000'
      }
    ],
    tags: [
        { name: 'Auth' },
        { name: 'Posts' },
        { name: 'Users' }
    ]
  },
  apis: ['./routes/*.js'] 
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;