import type { RequestHandler, Request, Response } from 'express'
import { GetUserProfileUseCase } from './../../application/usecases/GetUserProfileUseCase'
import HttpError from '../../Infrastructure/Http/middlewares/HttpError'

export const getUserDetailsController = (
  getUserProfileUseCase: GetUserProfileUseCase,
): RequestHandler => {
  return async (_req: Request, res: Response) => {
    try {
      const userId = res.locals.user?.userId

      if (!userId) throw new HttpError('unauthorized: missing Id', 401)

      const user = await getUserProfileUseCase.execute(userId)
      res.status(200).json(user)
    } catch (error) {
      const status = error instanceof HttpError ? error.statusCode : 500
      const message = error instanceof Error ? error.message : 'Something went wrong'
      res.status(status).json({ message })
    }
  }
}
