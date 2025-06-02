import { env } from '../Http/config/env.config'

export const getRefreshTokenExpiryMs = (): number => {
  return env.NODE_ENV === 'production' ? 7 * 24 * 60 * 60 * 1000 : 3 * 60 * 1000
}

export const getRefreshTokenExpiryDate = (): Date => {
  return new Date(Date.now() + getRefreshTokenExpiryMs())
}
