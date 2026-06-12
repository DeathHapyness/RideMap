import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const sslEnabled = Boolean(connectionString && /sslmode=require|ssl=true/i.test(connectionString));

const pool = new Pool({
  connectionString,
  ssl: sslEnabled ? { rejectUnauthorized: false } : undefined,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  allowExitOnIdle: true
});

const isRetryableError = (error: any) => {
  const message = error?.message?.toLowerCase() || '';
  const hasAggregateErrors = Boolean(error && typeof error === 'object' && 'errors' in error);

  return Boolean(
    error?.code === 'ECONNRESET' ||
    error?.code === 'ETIMEDOUT' ||
    message.includes('terminated') ||
    message.includes('timeout') ||
    message.includes('connection') ||
    hasAggregateErrors
  );
};

const retryingPool = new Proxy(pool, {
  get(target, prop, receiver) {
    if (prop === 'query') {
      return async (...args: any[]) => {
        let lastError: unknown;

        for (let attempt = 1; attempt <= 3; attempt += 1) {
          try {
            return await (target.query as any)(...args);
          } catch (error) {
            lastError = error;

            if (!isRetryableError(error) || attempt === 3) {
              throw error;
            }

            console.warn(`Falha temporária no PostgreSQL (tentativa ${attempt}/3): ${error instanceof Error ? error.message : error}`);
            await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
          }
        }

        throw lastError;
      };
    }

    return Reflect.get(target, prop, receiver);
  }
});

pool.on('connect', () => {
  console.log('PostgreSQL conectado com sucesso');
});

pool.on('error', (err) => {
  console.error('Erro ao conectar PostgreSQL:', err.message);
});

export default retryingPool;
