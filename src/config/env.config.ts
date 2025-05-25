import dotenv from 'dotenv'

dotenv.config()

const env = {
  PORT: parseInt(process.env.PORT ?? '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL ?? 'mongodb://127.0.0.1:27017',
  JWT_SECRET: process.env.JWT_SECRET ?? 'a-string-secret-at-least-256-bits-longs',
  SALTROUNDS: Number(process.env.SALTROUNDS ?? 10),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  SERVER_ORIGIN: process.env.SERVER_ORIGIN,
}

export { env }
