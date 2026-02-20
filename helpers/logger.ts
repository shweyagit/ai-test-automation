type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVEL: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';

const levels: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };

function shouldLog(level: LogLevel): boolean {
  return levels[level] >= levels[LOG_LEVEL];
}

function formatMessage(level: LogLevel, message: string): string {
  return `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
}

export const logger = {
  debug: (msg: string) => shouldLog('debug') && console.log(formatMessage('debug', msg)),
  info: (msg: string) => shouldLog('info') && console.log(formatMessage('info', msg)),
  warn: (msg: string) => shouldLog('warn') && console.warn(formatMessage('warn', msg)),
  error: (msg: string) => shouldLog('error') && console.error(formatMessage('error', msg)),
};
