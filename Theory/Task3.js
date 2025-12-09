// Task 3: Rutas y Handlers Básicos (8 minutos)
// Express.js proporciona una API intuitiva para definir rutas y handlers.

// Métodos HTTP Básicos
const express = require('express');
const app = express();

// GET - Obtener recursos
app.get('/productos', (req, res) => {
  res.json({ mensaje: 'Lista de productos' });
});

app.get('/productos/:id', (req, res) => {
  const id = req.params.id;
  res.json({ mensaje: `Producto ${id}` });
});

// POST - Crear recursos
app.post('/productos', (req, res) => {
  res.status(201).json({ mensaje: 'Producto creado' });
});

// PUT - Actualizar recursos completamente
app.put('/productos/:id', (req, res) => {
  const id = req.params.id;
  res.json({ mensaje: `Producto ${id} actualizado completamente` });
});

// PATCH - Actualizar recursos parcialmente
app.patch('/productos/:id', (req, res) => {
  const id = req.params.id;
  res.json({ mensaje: `Producto ${id} actualizado parcialmente` });
});

// DELETE - Eliminar recursos
app.delete('/productos/:id', (req, res) => {
  const id = req.params.id;
  res.json({ mensaje: `Producto ${id} eliminado` });
});

// OPTIONS - Describir opciones de comunicación
app.options('/productos', (req, res) => {
  res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.sendStatus(200);
});

// HEAD - Obtener headers sin body
app.head('/productos', (req, res) => {
  res.set('X-Total-Count', '42');
  res.status(200).end();
});

// ALL - Manejar cualquier método HTTP
app.all('/debug', (req, res) => {
  res.json({
    metodo: req.method,
    url: req.url,
    headers: req.headers
  });
});
// Parámetros de Ruta
const express = require('express');
app = express();

// Parámetros obligatorios
app.get('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ usuarioId: userId });
});

// Múltiples parámetros
app.get('/productos/:categoria/:id', (req, res) => {
  const { categoria, id } = req.params;
  res.json({ categoria, productoId: id });
});

// Parámetros opcionales con regex
app.get('/archivos/:nombre.:extension?', (req, res) => {
  const { nombre, extension } = req.params;
  res.json({ nombreArchivo: nombre, extension: extension || 'sin extensión' });
});

// Parámetros con validación
app.get('/numeros/:numero(\\d+)', (req, res) => {
  const numero = parseInt(req.params.numero);
  res.json({ numero, cuadrado: numero * numero });
});

// Rutas anidadas
app.get('/api/v1/usuarios/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId, ruta: 'post de usuario' });
});
// Query Parameters
const express = require('express');
app = express();

// Query parameters básicos
app.get('/buscar', (req, res) => {
  const { q, limite, pagina } = req.query;

  res.json({
    busqueda: q,
    limite: parseInt(limite) || 10,
    pagina: parseInt(pagina) || 1,
    queryCompleto: req.query
  });
});

// Ejemplo: /buscar?q=javascript&limite=20&pagina=2

// Query parameters avanzados
app.get('/productos', (req, res) => {
  const {
    precio_min,
    precio_max,
    categoria,
    ordenar,
    pagina = 1,
    limite = 10
  } = req.query;

  // Simular filtrado
  const filtros = {
    precioMin: precio_min ? parseFloat(precio_min) : null,
    precioMax: precio_max ? parseFloat(precio_max) : null,
    categoria,
    ordenar,
    pagina: parseInt(pagina),
    limite: parseInt(limite)
  };

  res.json({
    mensaje: 'Productos filtrados',
    filtros,
    productos: [] // Aquí irían los productos filtrados
  });
});

// Ejemplo: /productos?precio_min=100&precio_max=500&categoria=electronica&ordenar=precio&pagina=1&limite=20