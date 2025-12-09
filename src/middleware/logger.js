const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Nivel de log: info, warn, error, debug, etc.
  format: winston.format.json(),
  defaultMeta: { service: 'task-api' },
  transports: [
    // Guardar logs de errores en 'error.log'
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Guardar todos los logs (info y superiores) en 'combined.log'
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Middleware para registrar información de cada solicitud
const httpLogger = (req, res, next) => {
    // Usamos el evento 'finish' para registrar después de que la respuesta es enviada
    res.on('finish', () => {
        logger.info('Solicitud HTTP', {
            metodo: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            ip: req.ip,
            timestamp: new Date().toISOString()
        });
    });
    next();
};

module.exports = { httpLogger, logger };