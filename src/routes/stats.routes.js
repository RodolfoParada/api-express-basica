// stats.routes.js

 const express = require('express');
 const router = express.Router();


 const statsController = require('../controller/stats.controller'); // <-- Revisar ruta: ¿'controller' o 'controllers'?
 const { validarBusqueda } = require('../middleware/validators');

 // GET /api/stats/conteo-estados
router.get('/conteo-estados', statsController.contarTareasPorEstado); // <-- PROBABLEMENTE FALLA AQUÍ

 // GET /api/stats/busqueda-avanzada?q=termino&estado=pendiente&limite=5
router.get('/busqueda-avanzada', statsController.busquedaAvanzada);
 
// GET /api/stats/exportar-csv
router.get('/exportar/csv', statsController.exportarTareasCSV);
module.exports = router;