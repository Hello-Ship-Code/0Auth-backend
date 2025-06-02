import { env } from '../Http/config/env.config'

export const getRefreshTokenExpiryDate = (): Date => {
  const isProd = env.NODE_ENV === 'production'
  const expiryMs = isProd ? 7 * 24 * 60 * 60 * 1000 : 3 * 60 * 1000
  return new Date(Date.now() + expiryMs)
}
