import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/interface/IUserRepository'
import { IPasswordService } from '../../domain/service/IPasswordService'
import { ITokenService } from '../../domain/service/ITokenService'

interface SignupDTO {
  email: string
  userName: string
  password: string
}

export class SignUpUseCase {
  constructor(
    private readonly useRepo: IUserRepository,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService,
  ) {}

  async execute({
    email,
    userName,
    password,
  }: SignupDTO): Promise<{ accessToken: string; refreshToken: string }> {
    const existingUser = await this.useRepo.findUserByEmail(email)
    if (existingUser !== null) throw new Error('User already exists')

    const hashPassword = await this.passwordService.hash(password)

    const user = new User(undefined, email, userName, hashPassword)

    const savedUser = await this.useRepo.createUser(user)

    const accessToken = this.tokenService.generateAccessToken({ userId: savedUser.id })
    const refreshToken = this.tokenService.generateRefreshToken(savedUser.id!)

    return {
      accessToken,
      refreshToken,
    }
  }
}
