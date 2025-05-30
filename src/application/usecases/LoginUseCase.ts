import { IUserRepository } from '../../domain/interface/IUserRepository'
import { IPasswordService } from '../../domain/service/IPasswordService'
import { ITokenService } from '../../domain/service/ITokenService'
import { AuthTokenDTO } from '../DTO/AuthTokenDTO'
import { LoginDTO } from '../DTO/LoginDTO'

export class LoginUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService,
  ) {}

  async execute({ email, password }: LoginDTO): Promise<AuthTokenDTO> {
    const user = await this.userRepo.findUserByEmail(email)
    if (!user) throw new Error('User not found')

    const isMatch = await this.passwordService.compare(password, user.getPassword())
    if (!isMatch) throw new Error('Invalid password')

    if (!user.id) throw new Error('User ID is missing')
    const accessToken = this.tokenService.generateAccessToken({ userId: user.id })
    const refreshToken = this.tokenService.generateRefreshToken(user.id)

    return {
      accessToken,
      refreshToken,
    }
  }
}
