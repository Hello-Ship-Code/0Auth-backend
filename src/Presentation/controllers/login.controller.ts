import { LoginUseCase } from '../../application/usecases/LoginUseCase'

export const loginController = (loginUseCase: LoginUseCase): RequestHandler => {
  return async (req: Request, res: Response) => {
    try {
    } catch (error) {
      console.error(error)
    }
  }
}
