// infrastructure/wiring/signup.controller.wiring.ts

import { SignUpUseCase } from '../../application/usecases/SignUpUseCase'
import { RefreshTokenRepository } from '../../infrastructure/Repositories/RefreshTokenRepository'
import { UserRepository } from '../../infrastructure/Repositories/UserRepository'
import { PasswordService } from '../../infrastructure/service/PasswordService'
import { TokenService } from '../../infrastructure/service/TokenService'
import { signupController } from '../controllers/signup.controller'

const userRepo = new UserRepository()
const passwordService = new PasswordService()
const tokenService = new TokenService()
const refreshTokenRepo = new RefreshTokenRepository()

const signupUseCase = new SignUpUseCase(userRepo, passwordService, tokenService, refreshTokenRepo)

export const signupHandler = signupController(signupUseCase)
