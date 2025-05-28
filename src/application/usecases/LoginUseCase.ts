import { IUserRepository } from '../../domain/interface/IUserRepository'
import { IPasswordService } from '../../domain/service/IPasswordService'
import { ITokenService } from '../../domain/service/ITokenService'

export interface LoginDTO {
  email: string
  password: string
}

export class LoginUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService,
  ) {}

  async execute({
    email,
    password,
  }: LoginDTO): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepo.findUserByEmail(email)
    if (!user) throw new Error('User not found')

    const isMatch = await this.passwordService.compare(password, user.getPassword())
    if (!isMatch) throw new Error('Invalid password')

    const accessToken = this.tokenService.generateAccessToken({ userId: user.id })
    const refreshToken = this.tokenService.generateRefreshToken(user.id!)

    return {
      accessToken,
      refreshToken,
    }
  }
}
