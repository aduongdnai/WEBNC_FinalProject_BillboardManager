import swaggerAutogen from 'swagger-autogen'

const doc = {
  "openapi": "3.0.0",
  "servers": [
    {
      "url": "http://127.0.0.1:5000/api/v1"
    }
  ],
  "info": {
    "title": "Sakila API",
    "version": "1.0.0"
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['../app.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);