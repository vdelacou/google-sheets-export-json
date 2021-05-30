import winston from 'winston';

const { createLogger, format, transports } = winston;

export const logger = (): winston.Logger => {
  const logger = createLogger({
    level: 'info',
    format: format.combine(format.colorize(), format.simple()),
    transports: [new transports.Console()],
  });

  return logger;
};
