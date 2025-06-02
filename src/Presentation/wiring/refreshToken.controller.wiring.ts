import { RefreshTokenUseCase } from '../../application/usecases/RefreshTokenUseCase'
import { RefreshTokenRepository } from '../../infrastructure/Repositories/RefreshTokenRepository'
import { UserRepository } from '../../infrastructure/Repositories/UserRepository'
import { TokenService } from '../../infrastructure/service/TokenService'
import { refreshTokenController } from '../controllers/refreshToken.controller'

const tokenService = new TokenService()
const refreshRepo = new RefreshTokenRepository()
const userRepo = new UserRepository()

const refreshUseCase = new RefreshTokenUseCase(tokenService, refreshRepo, userRepo)

export const refreshHandler = refreshTokenController(refreshUseCase)
