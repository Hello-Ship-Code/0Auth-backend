import { RefreshToken } from '../entities/RefreshToken'

export interface IRefreshTokenRepository {
  createToken(token: RefreshToken): Promise<RefreshToken>
  findTokenByUserId(userId: string): Promise<RefreshToken[]>
  findByToken(token: string): Promise<RefreshToken | null>
  deleteToken(token: string): Promise<void>
  // deleteAllTokenForUser(userId: string): Promise<void>
}
