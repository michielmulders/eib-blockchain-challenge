import { Logger, LoggerInstance, transports } from 'winston';
import 'winston-daily-rotate-file';
import { EnvConfig } from '../../common/config/env';

export class Loggers {

    public static hlf: LoggerInstance = new Logger({
        transports: [new transports.Console({
            level: 'debug',
            prettyPrint: true,
            handleExceptions: true,
            json: false,
            label: 'FABRIC',
            colorize: true,
        })],
        exitOnError: false,
    });

    public static grpc: LoggerInstance = new Logger({
        transports: [new transports.Console({
            level: 'debug',
            prettyPrint: true,
            handleExceptions: true,
            json: false,
            label: 'GRPC',
            colorize: true,
        })],
        exitOnError: false,
    });

    public static pusher: LoggerInstance = new Logger({
        transports: [new transports.Console({
            level: 'debug',
            prettyPrint: true,
            handleExceptions: true,
            json: false,
            label: 'PUSHER',
            colorize: true,
        })],
        exitOnError: false,
    });

    public static config: LoggerInstance = new Logger({
        transports: [new transports.Console({
            level: 'debug',
            prettyPrint: true,
            handleExceptions: true,
            json: false,
            label: 'CONFIG',
            colorize: true,
        })],
        exitOnError: false,
    });

    public static awssqs: LoggerInstance = new Logger({
        transports: [new transports.Console({
            level: EnvConfig.LOGGER_SQS_DEBUG ? 'debug' : 'info',
            prettyPrint: true,
            handleExceptions: true,
            json: false,
            label: 'SQS',
            colorize: true,
        })],
        exitOnError: false,
    });

    public static prodlogger: LoggerInstance = new Logger({
        transports: [new transports.Console({
            level: 'debug',
            prettyPrint: true,
            handleExceptions: true,
            json: false,
            label: 'Chain',
            colorize: true,
        })],
        exitOnError: false,
    });
}