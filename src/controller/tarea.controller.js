// src/controllers/tarea.controller.js
const { 
    tareas, 
    encontrarTarea, 
    validarTarea, 
    actualizarId 
} = require('../model/tarea.model'); // ✅ Ruta ajustada si la estructura es src/controllers/ -> src/models/

// --- Funciones del Controlador ---

// GET /api/tareas
exports.obtenerTodasLasTareas = (req, res) => {
    let resultados = [...tareas];
    const { completada, q, ordenar } = req.query;

    // --- Lógica de Filtrado y Búsqueda (Copiada de tu código original) ---
    if (completada !== undefined) {
        const filtroCompletada = completada === 'true';
        resultados = resultados.filter(t => t.completada === filtroCompletada);
    }
    if (q) {
        const termino = q.toLowerCase();
        resultados = resultados.filter(t =>
            t.titulo.toLowerCase().includes(termino) ||
            t.descripcion.toLowerCase().includes(termino)
        );
    }
    if (ordenar === 'titulo') {
        resultados.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (ordenar === 'fecha') {
        // Ordenar por la fecha de creación (simulando un orden descendente por fecha de ID)
        resultados.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
    }
    // ----------------------------------------------------------------------

    res.json({
        total: resultados.length,
        tareas: resultados,
        filtros: req.query
    });
};

// GET /api/tareas/:id
exports.obtenerTareaPorId = (req, res) => {
    const tarea = encontrarTarea(req.params.id);

    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(tarea);
};

// POST /api/tareas
// POST /api/tareas
exports.crearTarea = (req, res) => {
    // ¡Lógica de validación manual ELIMINADA!
    // El middleware (validarTarea) ya garantizó que los datos son válidos.
    
    const nuevaTarea = {
        id: actualizarId(),
        titulo: req.body.titulo,
        descripcion: req.body.descripcion || '',
        completada: false,
        fechaCreacion: new Date().toISOString()
    };

    tareas.push(nuevaTarea);
    // ... respuesta ...
};


// PUT /api/tareas/:id
exports.actualizarTareaCompleta = (req, res) => {
    const tarea = encontrarTarea(req.params.id);

    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });


    // Actualización completa
    tarea.titulo = req.body.titulo;
    tarea.descripcion = req.body.descripcion || '';
    tarea.completada = req.body.completada || false;
    tarea.fechaActualizacion = new Date().toISOString();

    res.json({ mensaje: 'Tarea actualizada completamente', tarea });
};

// PATCH /api/tareas/:id
exports.actualizarTareaParcial = (req, res) => {
    const tarea = encontrarTarea(req.params.id);

    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

    // Lógica de PATCH: Solo actualizar los campos que existen en req.body
    if (req.body.titulo !== undefined) {
        if (typeof req.body.titulo !== 'string' || req.body.titulo.length < 3) {
            return res.status(400).json({ error: 'Título inválido (mínimo 3 caracteres)' });
        }
        tarea.titulo = req.body.titulo;
    }

    if (req.body.descripcion !== undefined) {
        if (req.body.descripcion !== null && typeof req.body.descripcion !== 'string') {
            return res.status(400).json({ error: 'Descripción inválida' });
        }
        tarea.descripcion = req.body.descripcion || '';
    }

    if (req.body.completada !== undefined) {
        if (typeof req.body.completada !== 'boolean') {
            return res.status(400).json({ error: 'Estado de completada debe ser boolean' });
        }
        tarea.completada = req.body.completada;
    }

    tarea.fechaActualizacion = new Date().toISOString();

    res.json({ mensaje: 'Tarea actualizada parcialmente', tarea });
};

// DELETE /api/tareas/:id
exports.eliminarTarea = (req, res) => {
    // Usamos el índice para remover el elemento del array
    const indice = tareas.findIndex(t => t.id === parseInt(req.params.id));
    
    if (indice === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    const tareaEliminada = tareas.splice(indice, 1)[0];
    res.json({
        mensaje: 'Tarea eliminada exitosamente',
        tarea: tareaEliminada
    });
};