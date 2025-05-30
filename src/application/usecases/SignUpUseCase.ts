import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/interface/IUserRepository'
import { IPasswordService } from '../../domain/service/IPasswordService'
import { ITokenService } from '../../domain/service/ITokenService'
import { AuthTokenDTO } from '../DTO/AuthTokenDTO'
import { SignupDTO } from '../DTO/SignUpDTO'

export class SignUpUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService,
  ) {}

  async execute({ email, userName, password }: SignupDTO): Promise<AuthTokenDTO> {
    const existingUser = await this.userRepo.findUserByEmail(email)
    if (existingUser !== null) throw new Error('User already exists')

    const hashPassword = await this.passwordService.hash(password)

    const user = new User(undefined, email, userName, hashPassword)

    const savedUser = await this.userRepo.createUser(user)

    if (!savedUser.id) throw new Error('User ID is missing after save')

    const accessToken = this.tokenService.generateAccessToken({ userId: savedUser.id })
    const refreshToken = this.tokenService.generateRefreshToken({ userId: savedUser.id })

    return {
      accessToken,
      refreshToken,
    }
  }
}
