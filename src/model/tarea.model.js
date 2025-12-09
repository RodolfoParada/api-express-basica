// src/models/tarea.model.js

// Base de datos simulada (Estado de la aplicación)
let tareas = [
    // Asegúrate de incluir la fechaCreacion en los datos iniciales
    { id: 1, titulo: 'Aprender Express', descripcion: 'Completar tutorial', completada: false, fechaCreacion: new Date('2025-11-01').toISOString() },
    { id: 2, titulo: 'Crear API', descripcion: 'Implementar endpoints REST', completada: true, fechaCreacion: new Date('2025-11-05').toISOString() },
    { id: 3, titulo: 'Testing', descripcion: 'Probar con Postman', completada: false, fechaCreacion: new Date('2025-11-10').toISOString() }
];

let siguienteId = 4;

// --- Funciones de Acceso a Datos (Simulando la BD) ---

/**
 * Busca una tarea por su ID.
 * @param {string | number} id 
 * @returns {object | undefined}
 */
function encontrarTarea(id) {
    // Aseguramos que la comparación sea con un número entero
    return tareas.find(t => t.id === parseInt(id));
}

/**
 * Genera y avanza el ID para una nueva tarea.
 * @returns {number}
 */
function actualizarId() {
    return siguienteId++;
}

/**
 * Valida los datos mínimos (SERÁ REEMPLAZADA POR JOI).
 */
function validarTarea(datos) {
    const errores = [];
    if (!datos.titulo || typeof datos.titulo !== 'string' || datos.titulo.length < 3) {
        errores.push('El título debe ser un texto de al menos 3 caracteres.');
    }
    if (datos.descripcion && typeof datos.descripcion !== 'string') {
        errores.push('La descripción debe ser texto.');
    }
    return errores;
}

module.exports = { 
    // Exportamos los datos y las funciones que el controlador necesita
    tareas,
    encontrarTarea, 
    validarTarea,
    actualizarId
};