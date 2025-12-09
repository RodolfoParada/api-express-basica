const { exportarA_CSV } = require('../utils/csvExporter');
const {tareas }= require('../model/tarea.model'); // Tu Modelo de Tarea

exports.exportarTareasCSV = async (req, res) => {
    try {

      const datosParaExportar = [...tareas];
      const campos = ['id', 'titulo', 'descripcion', 'completada', 'fechaCreacion'];
      const csvData = exportarA_CSV(datosParaExportar, campos);

        // 4. Enviar la respuesta como un archivo descargable
        res.header('Content-Type', 'text/csv');
        res.attachment('tareas.csv'); // Sugiere el nombre de archivo
        res.send(csvData);

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al exportar a CSV', error: error.message });
    }
};

exports.contarTareasPorEstado = (req, res) => {
    try {
        // Inicializa un objeto para almacenar los conteos
        const conteo = {
            completadas: 0,
            pendientes: 0,
            total: 0
        };

        if (tareas.length === 0) {
            return res.json(conteo);
        }

        // Itera sobre el array de tareas
        tareas.forEach(tarea => {
            conteo.total++;
            if (tarea.completada) {
                conteo.completadas++;
            } else {
                conteo.pendientes++;
            }
        });

        res.json({
            mensaje: "Conteo de tareas por estado",
            datos: conteo
        });

    } catch (error) {
        console.error("Error al contar tareas:", error);
        res.status(500).json({ error: 'Error interno del servidor al contar tareas' });
    }
};

exports.busquedaAvanzada = (req, res) => {
    try {
        const { q, estado, limite } = req.query; // Captura los parámetros de la URL
        let resultados = [...tareas]; // Copia inicial de las tareas

        // 1. Filtrar por ESTADO (si se proporciona)
        if (estado !== undefined) {
            // Convierte 'true'/'false' de la query a booleanos
            const filtroCompletada = estado === 'completada'; 
            
            // Si tu campo en Tarea es 'completada' (booleano) o 'estado' (string)
            // Usaremos el campo 'completada' que ya definiste en tu modelo inicial:
            if (estado === 'completada' || estado === 'pendiente') {
                const esCompletada = estado === 'completada';
                resultados = resultados.filter(t => t.completada === esCompletada);
            }
        }

        // 2. Filtrar por TÉRMINO DE BÚSQUEDA (q)
        if (q) {
            const termino = q.toLowerCase();
            resultados = resultados.filter(t =>
                t.titulo.toLowerCase().includes(termino) ||
                t.descripcion.toLowerCase().includes(termino)
            );
        }

        // 3. Aplicar LÍMITE
        const limiteNum = parseInt(limite);
        if (!isNaN(limiteNum) && limiteNum > 0) {
            resultados = resultados.slice(0, limiteNum);
        }

        res.json({
            busqueda: req.query,
            totalEncontrado: resultados.length,
            tareas: resultados
        });

    } catch (error) {
        console.error("Error en busquedaAvanzada:", error);
        res.status(500).json({ error: 'Error interno del servidor durante la búsqueda' });
    }
};