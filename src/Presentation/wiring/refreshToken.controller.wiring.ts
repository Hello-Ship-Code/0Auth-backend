import { RefreshTokenUseCase } from '../../application/usecases/RefreshTokenUseCase'
import { RefreshTokenRepository } from '../../Infrastructure/Repositories/RefreshTokenRepository'
import { UserRepository } from '../../Infrastructure/Repositories/UserRepository'
import { TokenService } from '../../Infrastructure/service/TokenService'
import { refreshTokenController } from '../controllers/refreshToken.controller'

const tokenService = new TokenService()
const refreshRepo = new RefreshTokenRepository()
const userRepo = new UserRepository()

const refreshUseCase = new RefreshTokenUseCase(tokenService, refreshRepo, userRepo)

export const refreshHandler = refreshTokenController(refreshUseCase)
