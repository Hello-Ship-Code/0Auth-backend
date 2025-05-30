import { IUserRepository } from '../../domain/interface/IUserRepository'

export class GetUserProfileUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(userId: string): Promise<{ userName: string; email: string }> {
    const user = await this.userRepo.findUserById(userId)
    if (!user) throw new Error(' user not found')

    return {
      userName: user.userName,
      email: user.email,
    }
  }
}
