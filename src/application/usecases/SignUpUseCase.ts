import { IUserRepository } from '../../domain/interface/IUserRepository'
import { IPasswordService } from '../../domain/service/IPasswordService'

export class SignUpUseCase {
  constructor(
    private userRepo: IUserRepository,
    private passwordService: IPasswordService,
    private tokenService: 
  ) {}
}