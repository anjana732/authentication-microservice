import winston from "winston";

const { combine, timestamp, printf, colorize, align } = winston.format;

const logFormat = printf(({level, message, timestamp, stack}) => {
    return `${timestamp} ${level} :  ${stack || message}`
})

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug': 'info',
    format: combine(
        colorize({ all: true }), 
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        align(),
        logFormat
    ),
    transports : [ 
        new winston.transports.Console(),
        new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
        new winston.transports.File({filename: 'logs/combined.log'})
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' })
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: 'logs/rejections.log' })
    ]
})

export default logger;