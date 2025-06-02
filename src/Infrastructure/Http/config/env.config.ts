import dotenv from 'dotenv'

dotenv.config()

const env = {
  PORT: parseInt(process.env.PORT ?? '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL ?? 'mongodb://127.0.0.1:27017',
  REFRESH_TOKEN_SECRET:
    process.env.REFRESH_TOKEN_SECRET ?? 'a-string-secret-at-least-256-bits-longs',
  SALTROUNDS: Number(process.env.SALTROUNDS ?? 10),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  // GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  // GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  SERVER_ORIGIN: process.env.SERVER_ORIGIN,
  ACCESS_TOKEN_SECRET:
    process.env.ACCESS_TOKEN_SECRET ?? 'a-string-secret-at-least-256-bits-longs-access',
}

export { env }
