const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const { combine, timestamp, printf, colorize } = format;

// Output format
const logFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});

// Create logger
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console({
            format: combine(colorize(), logFormat)
        }),

        new DailyRotateFile({
            dirname: 'logs',             // log catalog
            filename: 'app-%DATE%.log',  // name pattern
            datePattern: 'YYYY-MM-DD',   // new day -> new file
            zippedArchive: true,         // archive old files
            maxSize: '20m',              // max file size
            maxFiles: '14d'              // keep logs 14 days
        })
    ]
});

module.exports = logger;
