enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

class Logger {
  private level: LogLevel;

  constructor() {
    this.level = process.env.NODE_ENV === 'production'
      ? LogLevel.INFO
      : LogLevel.DEBUG;
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  error(message: string, error?: Error): void {
    if (this.level >= LogLevel.ERROR) {
      console.error(this.formatMessage('ERROR', message), error || '');
    }
  }

  warn(message: string): void {
    if (this.level >= LogLevel.WARN) {
      console.warn(this.formatMessage('WARN', message));
    }
  }

  info(message: string): void {
    if (this.level >= LogLevel.INFO) {
      console.info(this.formatMessage('INFO', message));
    }
  }

  debug(message: string, data?: any): void {
    if (this.level >= LogLevel.DEBUG) {
      console.log(this.formatMessage('DEBUG', message), data || '');
    }
  }
}

export const logger = new Logger();