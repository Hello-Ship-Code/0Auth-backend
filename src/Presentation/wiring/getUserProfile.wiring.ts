import { GetUserProfileUseCase } from '../../application/usecases/GetUserProfileUseCase'
import { UserRepository } from '../../Infrastructure/Repositories/UserRepository'
import { getUserDetailsController } from '../controllers/getUserDetails.controller'

const userRepo = new UserRepository()
const getUserProfileUsecase = new GetUserProfileUseCase(userRepo)

export const getUserProfileHandler = getUserDetailsController(getUserProfileUsecase)
