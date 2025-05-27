import { IUserRepository } from '../../domain/interface/IUserRepository'
import { IPasswordService } from '../../domain/interface/IPasswordService'

export class SignUpUseCase {
  constructor(
    private userRepo: IUserRepository,
    private passwordService: IPasswordService,
    private tokenService: 
  ) {}
}
