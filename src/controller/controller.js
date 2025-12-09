// Simulación de Tarea Modelo (Reemplázalo con tu lógica de BD real, ej. Mongoose)
const Tarea = require('../models/tarea.model');

// 1. Conteo de tareas por estado
exports.contarTareasPorEstado = async (req, res) => {
  try {
    // Lógica para agrupar y contar, usando tu Modelo de Tarea (ejemplo con Mongoose/MongoDB)
    const stats = await Tarea.aggregate([
      { $group: { _id: '$estado', count: { $sum: 1 } } }
    ]);
    
    // Formatear la respuesta
    const resultado = stats.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
    }, {});

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener estadísticas', error: error.message });
  }
};

// 2. Búsqueda avanzada
exports.busquedaAvanzada = async (req, res) => {
    // La validación ya ocurrió en el middleware (validarBusqueda)
    const { q, estado, limite } = req.query; 

    try {
        const query = {
            $or: [
                { titulo: { $regex: q, $options: 'i' } },
                { descripcion: { $regex: q, $options: 'i' } }
            ]
        };

        if (estado) {
            query.estado = estado;
        }

        const tareas = await Tarea.find(query).limit(parseInt(limite));

        res.json(tareas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en la búsqueda avanzada', error: error.message });
    }
};