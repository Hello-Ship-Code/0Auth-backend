import { IUserRepository } from '../../domain/interface/IUserRepository'
import { IAuthService } from '../../domain/interface/iAuthService'
import { User } from '../../domain/entities/User'
import { IPasswordHasher } from '../../domain/interface/IPasswordHasher'

export class SignUpUseCase {
  constructor(
    private userRepo: IUserRepository,
    private passwordService: IPasswordHasher,
    private tokenService: IAuthService,
  ) {}

  async execute(
    userName: string,
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    const existingUser = await this.userRepo.findUserByEmail(email)
    if (existingUser) throw new Error('User Already exists')

    const hashedPassword = await this.passwordService.hash(password)
    const user = new User(email, userName, hashedPassword)
  }
}
