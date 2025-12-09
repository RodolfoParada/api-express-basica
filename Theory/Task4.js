// Task 4: Respuestas Express (6 minutos)
// Express.js proporciona métodos convenientes para enviar respuestas.

// Métodos de Respuesta
const express = require('express');
const app = express();

// Enviar texto plano
app.get('/texto', (req, res) => {
  res.send('Hola mundo'); // Content-Type: text/html
});

// Enviar HTML
app.get('/html', (req, res) => {
  res.send('<h1>Hola HTML</h1>'); // Content-Type: text/html
});

// Enviar JSON (automático)
app.get('/json', (req, res) => {
  res.json({ mensaje: 'Hola JSON', datos: [1, 2, 3] });
  // Content-Type: application/json
});

// Enviar JSON con status code
app.get('/error', (req, res) => {
  res.status(400).json({ error: 'Datos inválidos' });
});

// Redireccionar
app.get('/vieja-ruta', (req, res) => {
  res.redirect('/nueva-ruta'); // 302 temporal
});

app.get('/permanente', (req, res) => {
  res.redirect(301, '/nueva-ruta'); // 301 permanente
});

// Descargar archivo
app.get('/descargar', (req, res) => {
  res.download('./archivo.pdf'); // Fuerza descarga
});

// Enviar archivo inline
app.get('/ver-pdf', (req, res) => {
  res.sendFile('./archivo.pdf', {
    root: __dirname
  });
});

// Enviar archivo con headers personalizados
app.get('/imagen', (req, res) => {
  res.sendFile('./imagen.jpg', {
    root: __dirname,
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  });
});

// Respuesta vacía con status
app.get('/no-content', (req, res) => {
  res.sendStatus(204); // No Content
});

// Headers personalizados
app.get('/headers', (req, res) => {
  res.set('X-API-Version', '1.0.0');
  res.set('X-Powered-By', 'Express.js');
  res.json({ mensaje: 'Respuesta con headers' });
});
// Content-Type Automático
const express = require('express');
app = express();

// Express detecta automáticamente el Content-Type
app.get('/respuestas', (req, res) => {
  const tipo = req.query.tipo;

  switch (tipo) {
    case 'json':
      res.json({ tipo: 'JSON', datos: 'automático' });
      break;
    case 'html':
      res.send('<p>Tipo: <strong>HTML</strong></p>');
      break;
    case 'texto':
      res.send('Tipo: texto plano');
      break;
    case 'xml':
      res.set('Content-Type', 'application/xml');
      res.send('<respuesta><tipo>XML</tipo></respuesta>');
      break;
    default:
      res.send('Especifica ?tipo=json, ?tipo=html, ?tipo=texto, o ?tipo=xml');
  }
});