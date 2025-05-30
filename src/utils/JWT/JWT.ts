import jwt from 'jsonwebtoken'
import { env } from '../../Infrastructure/config/env.config'

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.ACCESS_TOKEN_SECRET)
}

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.REFRESH_TOKEN_SECRET)
}
