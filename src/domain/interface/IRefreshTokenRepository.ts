import { RefreshToken } from '../entities/RefreshToken'

export interface IRefreshTokenRepository {
  create(token: RefreshToken): Promise<RefreshToken>
  findUserById(userId: string): Promise<RefreshToken[]>
  findByToken(token: string): Promise<RefreshToken | null>
  deleteByToken(token: string): Promise<void>
  deleteAllForUser(userId: string): Promise<void>
}
