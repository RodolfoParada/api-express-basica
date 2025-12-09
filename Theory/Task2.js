// Task 2: Instalación y Configuración Básica (8 minutos)
// Express.js se instala fácilmente como cualquier paquete de NPM.

// Instalación de Express
// # Crear directorio del proyecto
// mkdir mi-api-express
// cd mi-api-express

// # Inicializar proyecto
// npm init -y

// # Instalar Express
// npm install express

// # Instalar como dependencia de desarrollo (opcional)
// npm install --save-dev nodemon

// # Verificar instalación
// node -e "console.log('Express versión:', require('express').version)"
// Estructura de Proyecto Básica
// mi-api-express/
// ├── package.json
// ├── server.js          # Servidor principal
// ├── routes/           # Definición de rutas
// │   ├── index.js
// │   └── usuarios.js
// ├── middleware/       # Middleware personalizado
// ├── controllers/      # Lógica de negocio
// ├── models/          # Modelos de datos
// ├── config/          # Configuración
// └── public/          # Archivos estáticos
// Primer Servidor Express
// server.js - Servidor Express básico
const express = require('express');

// Crear aplicación Express
const app = express();

// Puerto de escucha
const PORT = process.env.PORT || 3000;

// Ruta básica
app.get('/', (request, response) => {
  response.send('<h1>¡Hola desde Express.js!</h1>');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express ejecutándose en http://localhost:${PORT}`);
});
// Configuración del package.json

// {
//   "name": "mi-api-express",
//   "version": "1.0.0",
//   "description": "API REST con Express.js",
//   "main": "server.js",
//   "scripts": {
//     "start": "node server.js",
//     "dev": "nodemon server.js",
//     "test": "echo \"Error: no test specified\" && exit 1"
//   },
//   "keywords": ["express", "api", "rest"],
//   "author": "Tu Nombre",
//   "license": "MIT",
//   "dependencies": {
//     "express": "^4.18.0"
//   },
//   "devDependencies": {
//     "nodemon": "^2.0.0"
//   }
// }
// Variables de Entorno
// .env
PORT=3000
NODE_ENV=development
API_VERSION=v1

// server.js
require('dotenv').config(); // npm install dotenv

 app = express();
 PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`🚀 Servidor en ${NODE_ENV} ejecutándose en puerto ${PORT}`);
});