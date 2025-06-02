// infrastructure/wiring/login.controller.wiring.ts

import { LoginUseCase } from '../../application/usecases/LoginUseCase'
import { RefreshTokenRepository } from '../../infrastructure/Repositories/RefreshTokenRepository'
import { UserRepository } from '../../infrastructure/Repositories/UserRepository'
import { PasswordService } from '../../infrastructure/service/PasswordService'
import { TokenService } from '../../infrastructure/service/TokenService'
import { loginController } from '../controllers/login.controller'

const userRepo = new UserRepository()
const passwordService = new PasswordService()
const tokenService = new TokenService()
const refreshTokenRepo = new RefreshTokenRepository()

const loginUseCase = new LoginUseCase(userRepo, passwordService, tokenService, refreshTokenRepo)

export const loginHandler = loginController(loginUseCase)
