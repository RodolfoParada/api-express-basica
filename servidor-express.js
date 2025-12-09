// index.js
const express = require('express');
const { httpLogger } = require('./src/middleware/logger');
const tareaRoutes = require('./src/routes/tareas');
const statsRoutes = require('./src/routes/stats.routes');

const app = express();

// Logging global
app.use(httpLogger);

// Parseo de JSON
app.use(express.json());

// Rutas
app.use('/api/stats', statsRoutes);
app.use('/api/tareas', tareaRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de Tareas funcionando ✅',
    endpoints: {
      tareas: '/api/tareas',
      estadisticas: '/api/stats/conteo-estados',
      busqueda: '/api/stats/busqueda-avanzada',
      exportarCSV: '/api/stats/exportar/csv'
    }
  });
});

// Manejo de errores
app.use((error, req, res, next) => {
  console.error('Error global:', error);
  res.status(500).json({
    error: 'Error interno del servidor',
    detalle: error.message
  });
});

// Middleware 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada'
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor activo en http://localhost:${PORT}`);
});

// Cierre limpio
process.on('SIGINT', () => {
  console.log('\n👋 Cerrando servidor...');
  process.exit(0);
});
