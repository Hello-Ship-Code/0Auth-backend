import { IRefreshTokenRepository } from '../../domain/interface/IRefreshTokenRepository'

export class LogoutUseCase {
  constructor(private readonly refreshToken: IRefreshTokenRepository) {}

  async execute(refreshToken: string): Promise<void> {
    const existingToken = await this.refreshToken.findByToken(refreshToken)
    if (!existingToken) throw new Error('Refresh Token not found')

    await this.refreshToken.deleteToken(refreshToken)
  }
}
