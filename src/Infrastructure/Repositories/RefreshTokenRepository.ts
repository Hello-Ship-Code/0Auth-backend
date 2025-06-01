import { prisma } from '../Http/config/db.config'
import { RefreshToken } from '../../domain/entities/RefreshToken'
import { IRefreshTokenRepository } from '../../domain/interface/IRefreshTokenRepository'

export class RefreshTokenRepository implements IRefreshTokenRepository {
  async createToken(token: RefreshToken): Promise<RefreshToken> {
    const created = await prisma.refreshToken.create({
      data: {
        userId: token.userId,
        refreshToken: token.getRefreshToken(),
        createdAt: token.createdAt,
        expiredAt: token.expiredAt,
      },
    })

    return new RefreshToken(
      created.id,
      created.userId,
      created.refreshToken,
      created.createdAt,
      created.expiredAt,
    )
  }

  async findTokenByUserId(userId: string): Promise<RefreshToken[]> {
    const tokens = await prisma.refreshToken.findMany({ where: { userId } })

    return tokens.map(
      (token) =>
        new RefreshToken(
          token.id,
          token.userId,
          token.refreshToken,
          token.createdAt,
          token.expiredAt,
        ),
    )
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const userToken = await prisma.refreshToken.findUnique({ where: { refreshToken: token } })

    if (!userToken) return null
    return new RefreshToken(
      userToken.id,
      userToken.userId,
      userToken.refreshToken,
      userToken.createdAt,
      userToken.expiredAt,
    )
  }

  async deleteToken(token: string): Promise<void> {
    await prisma.refreshToken.delete({ where: { refreshToken: token } })
  }

  // async deleteAllForUser(userId: string): Promise<void> {
  //   await prisma.refreshToken.deleteMany({ where: { userId } })
  // }
}
