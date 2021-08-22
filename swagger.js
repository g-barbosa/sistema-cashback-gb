const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Cashback API',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', 
      name: 'Authorization',
    },
  },
}

const outputFile = './src/configs/swagger/swagger_output.json'
const endpointsFile = ['./src/routes/routes.ts']

swaggerAutogen(outputFile, endpointsFile, doc)