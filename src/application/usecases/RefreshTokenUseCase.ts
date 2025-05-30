import { RefreshToken } from './../../domain/entities/RefreshToken'
import { IRefreshTokenRepository } from '../../domain/interface/IRefreshTokenRepository'
import { IUserRepository } from '../../domain/interface/IUserRepository'
import { ITokenService } from '../../domain/service/ITokenService'
import { AuthTokenDTO } from '../DTO/AuthTokenDTO'

export class RefreshTokenUseCase {
  constructor(
    private readonly tokenService: ITokenService,
    private readonly refreshTokenRepo: IRefreshTokenRepository,
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(refreshToken: string): Promise<AuthTokenDTO> {
    const existingToken = await this.refreshTokenRepo.findByToken(refreshToken)
    if (!existingToken) throw new Error('Invalid refresh Token')

    const decoded = this.tokenService.verifyRefreshToken(refreshToken)
    if (!decoded || typeof decoded === 'string')
      throw new Error('Refresh token verification failed')

    const userId = decoded.userId

    const user = await this.userRepo.findUserById(userId)
    if (!user) throw new Error('User not found')

    const newAccessToken = this.tokenService.generateAccessToken({ userId })
    const newRefreshTokenString = this.tokenService.generateRefreshToken({ userId })

    const newRefreshToken = new RefreshToken(
      undefined,
      userId,
      newRefreshTokenString,
      new Date(),
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    )

    await this.refreshTokenRepo.createToken(newRefreshToken)

    // await this.refreshTokenRepo.deleteToken(refreshToken) delete old token

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshTokenString,
    }
  }
}
