// infrastructure/wiring/login.controller.wiring.ts

import { LoginUseCase } from '../../application/usecases/LoginUseCase'
import { UserRepository } from '../../Infrastructure/Repositories/UserRepository'
import { PasswordService } from '../../Infrastructure/service/PasswordService'
import { TokenService } from '../../Infrastructure/service/TokenService'
import { loginController } from '../controllers/login.controller'

const userRepo = new UserRepository()
const passwordService = new PasswordService()
const tokenService = new TokenService()

const loginUseCase = new LoginUseCase(userRepo, passwordService, tokenService)

export const loginHandler = loginController(loginUseCase)
