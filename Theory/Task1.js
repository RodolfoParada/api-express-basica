// Task 1: ¿Qué es Express.js y por qué usarlo? (8 minutos)
// Express.js es el framework web más popular para Node.js, que simplifica el desarrollo de aplicaciones web y APIs.

// El Problema con Node.js Puro
// Node.js HTTP puro es muy básico:

const http = require('http');

const servidor = http.createServer((request, response) => {
  const { method, url } = request;

  // Routing manual tedioso
  if (method === 'GET' && url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('<h1>Inicio</h1>');
  } else if (method === 'GET' && url === '/usuarios') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ usuarios: [] }));
  } else {
    response.writeHead(404);
    response.end('No encontrado');
  }
});

servidor.listen(3000);
// Problemas:

// Routing manual y repetitivo
// No hay helpers para respuestas comunes
// Manejo de errores básico
// Sin middleware integrado
// Código difícil de mantener
// Express.js: La Solución
// Express.js simplifica todo:

const express = require('express');
const app = express();

// Routing declarativo
app.get('/', (req, res) => {
  res.send('<h1>Inicio</h1>');
});

app.get('/usuarios', (req, res) => {
  res.json({ usuarios: [] });
});

// Manejo automático de 404
app.use((req, res) => {
  res.status(404).send('No encontrado');
});

app.listen(3000);
// Filosofía de Express.js
// 1. Minimalista y Flexible

// No impone estructura específica
// Solo agrega lo necesario para desarrollo web
// Compatible con cualquier arquitectura
// 2. Middleware-First

// Todo es middleware
// Cadena de procesamiento modular
// Fácil extensión y reutilización
// 3. Routing Intuitivo

// Métodos HTTP como nombres de función
// Parámetros de ruta expresivos
// Nested routers para organización
// 4. Comunidad Enorme

// Miles de middleware disponibles
// Ecosistema maduro
// Soporte empresarial
// Casos de Uso de Express.js
// APIs RESTful

// const express = require('express');
// const app = express();

// app.use(express.json()); // Parsing JSON automático

// app.get('/api/productos', (req, res) => {
//   res.json({ productos: [] });
// });

// app.post('/api/productos', (req, res) => {
//   const producto = req.body;
//   // Guardar producto...
//   res.status(201).json(producto);
// });
// Aplicaciones Web Tradicionales

// const express = require('express');
// const app = express();

// Servir archivos estáticos
app.use(express.static('public'));

// Templates con EJS/Pug
app.set('view engine', 'ejs');

app.get('/productos/:id', (req, res) => {
  const producto = obtenerProducto(req.params.id);
  res.render('producto', { producto });
});
Microservicios

const express = require('express');
app = express();

// Cada servicio es independiente
// Servicio de autenticación
app.post('/auth/login', (req, res) => { /* ... */ });
app.post('/auth/register', (req, res) => { /* ... */ });

// Servicio de productos
app.get('/productos', (req, res) => { /* ... */ });
app.post('/productos', (req, res) => { /* ... */ });
// Single Page Applications (SPA)

const express = require('express');
 app = express();

// API para el frontend
app.get('/api/datos', (req, res) => {
  res.json({ mensaje: 'Datos desde Express' });
});

// Servir el archivo HTML principal
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});