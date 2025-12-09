const express = require('express');
const router = express.Router();

// Asumiendo que la ruta a controller es '../controller/tarea.controller'
const tareaController = require('../controller/tarea.controller'); 

// ✅ Importar la función middleware de validación
const { validarTarea } = require('../middleware/validators'); 

// --- Aplicación del Middleware ---

router.get('/', tareaController.obtenerTodasLasTareas);

// Aplicar validarTarea ANTES de que la solicitud llegue al controlador
router.post('/', validarTarea, tareaController.crearTarea); 
router.get('/:id', tareaController.obtenerTareaPorId);

// Aplicar validarTarea ANTES de que la solicitud llegue al controlador
router.put('/:id', validarTarea, tareaController.actualizarTareaCompleta); 

router.patch('/:id', tareaController.actualizarTareaParcial);
router.delete('/:id', tareaController.eliminarTarea);

module.exports = router;