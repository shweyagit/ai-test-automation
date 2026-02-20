import { logger } from './logger';

export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
  backoff?: boolean;
}

export async function retry<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T> {
  const { maxAttempts, delayMs, backoff = false } = options;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      const wait = backoff ? delayMs * attempt : delayMs;
      logger.warn(`Attempt ${attempt}/${maxAttempts} failed, retrying in ${wait}ms...`);
      await new Promise((resolve) => setTimeout(resolve, wait));
    }
  }

  throw new Error('Retry failed unexpectedly');
}
