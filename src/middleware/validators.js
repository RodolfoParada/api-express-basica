const Joi = require('joi');

// Esquema de validación para crear o actualizar una tarea
const tareaSchema = Joi.object({
  // Título: requerido, string, mínimo 3 caracteres (ajustado a tu lógica de validación anterior)
  titulo: Joi.string().trim().min(3).required().messages({
    'string.min': 'El título debe tener al menos 3 caracteres.',
    'any.required': 'El título es obligatorio.'
  }),
  // Descripción: opcional, permite string o valor vacío
  descripcion: Joi.string().allow('').optional(), 
  // Completada: opcional (para POST, el controlador pone false), debe ser booleano
  completada: Joi.boolean().optional(),
  // Nota: ignoramos ID y fechas
});

/**
 * Middleware para validar el cuerpo de la petición (req.body) usando Joi.
 */
const validarTarea = (req, res, next) => {
  // Solo validamos los campos que están en el esquema
  const { error } = tareaSchema.validate(req.body, { 
      abortEarly: false, // Reporta todos los errores de validación, no solo el primero
      allowUnknown: true // Permite que existan campos que no están en el esquema (ej. id)
  });

  if (error) {
    // Si hay error, enviamos una respuesta 400 Bad Request
    return res.status(400).json({
      error: 'Datos inválidos',
      detalles: error.details.map(d => d.message.replace(/['"]/g, '')), // Limpiar mensajes de comillas
    });
  }
  // Si no hay errores, pasamos al siguiente middleware o controlador
  next();
};



const busquedaSchema = Joi.object({
  // 1. Query: String, opcional
  q: Joi.string().optional(), 
  
  // 2. Estado: String, solo permite valores específicos y es opcional
  estado: Joi.string()
    .valid('pendiente', 'completada') 
    .optional(), 
    
  // 3. Límite: Número entero, mínimo 1, opcional
  limite: Joi.number()
    .integer()
    .min(1)
    .optional() 
});

/**
 * Middleware para validar los parámetros de consulta (req.query)
 */
const validarBusqueda = (req, res, next) => {
    // Validamos req.query, que es donde Express pone los parámetros de la URL
    const { error } = busquedaSchema.validate(req.query);

    if (error) {
        return res.status(400).json({
            error: 'Parámetros de búsqueda inválidos',
            detalles: error.details.map(d => d.message.replace(/['"]/g, '')),
        });
    }
    next();
};

module.exports = {
  validarTarea,
  validarBusqueda
};
