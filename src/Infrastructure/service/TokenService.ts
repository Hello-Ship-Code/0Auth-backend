import { env } from '../Http/config/env.config'
import { ITokenService } from '../../domain/service/ITokenService'
import jwt, { JwtPayload } from 'jsonwebtoken'

export class TokenService implements ITokenService {
  generateAccessToken(payload: object): string {
    const expiresIn = env.NODE_ENV === 'production' ? '15m' : '3m'
    return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, { expiresIn })
  }

  verifyAccessToken(token: string): object | null {
    try {
      const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET)
      if (typeof decoded === 'object' && decoded !== null) {
        return decoded
      }
      return null
    } catch {
      return null
    }
  }

  generateRefreshToken(payload: { userId: string }): string {
    const expiresIn = env.NODE_ENV === 'production' ? '7d' : '5m'
    return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, { expiresIn })
  }

  verifyRefreshToken(token: string): { userId: string } | null {
    try {
      const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as JwtPayload
      if (decoded && typeof decoded === 'object' && 'userId' in decoded) {
        return { userId: decoded.userId as string }
      }
      return null
    } catch {
      return null
    }
  }
}
