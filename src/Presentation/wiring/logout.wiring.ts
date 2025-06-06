import { LogoutUseCase } from '../../application/usecases/LogoutUseCase'
import { RefreshTokenRepository } from '../../infrastructure/Repositories/RefreshTokenRepository'
import { logoutController } from '../controllers/logout.controller'

const refreshTokenRepo = new RefreshTokenRepository()
const logoutUsecase = new LogoutUseCase(refreshTokenRepo)

export const logoutHandler = logoutController(logoutUsecase)
