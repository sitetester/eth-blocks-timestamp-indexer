const winston = require('winston');
const config = require('config');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: config.get('logPath.error'), level: 'error' }),
        new winston.transports.File({ filename: config.get('logPath.combined') }),
    ],
});

//
// Console output is needed in docker container
// Log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
logger.add(new winston.transports.Console({ format: winston.format.simple() }));

module.exports = logger;
