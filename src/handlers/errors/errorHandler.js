const logger = require("../../logging/logger");

function errorHandler(err, req, res, next) {
    logger.error(`${err.message} - ${req.method} ${req.url}`);

    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        ...(err.details ? { errors: err.details } : {}) // добавляем только если есть
    });
}

module.exports = errorHandler;
