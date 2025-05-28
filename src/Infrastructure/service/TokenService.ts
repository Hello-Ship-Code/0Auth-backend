import { env } from '../../config/env.config'
import { ITokenService } from '../../domain/service/ITokenService'
import jwt, { JwtPayload } from 'jsonwebtoken'

export class TokenService implements ITokenService {
  generateAccessToken(payload: object): string {
    return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
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

  generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
  }

  verifyRefreshToken(token: string, userId: string): object | null | string {
    try {
      const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET)
      if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
        return (decoded as JwtPayload).userId === userId ? decoded : 'user-mismatch'
      }
      return null
    } catch {
      return null
    }
  }
}
