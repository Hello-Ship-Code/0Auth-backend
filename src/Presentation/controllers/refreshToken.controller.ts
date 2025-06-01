import type { Request, Response, RequestHandler } from 'express'
import { RefreshTokenUseCase } from '../../application/usecases/RefreshTokenUseCase'
import HttpError from '../../Infrastructure/Http/middlewares/HttpError'

export const refreshTokenController = (
  refreshTokenUsecase: RefreshTokenUseCase,
): RequestHandler => {
  return async (req: Request, res: Response) => {
    try {
      const token = req.cookies.RefreshToken
      if (!token) {
        throw new HttpError('No refresh Token', 402)
      }

      const tokens = await refreshTokenUsecase.execute(token)

      res.status(200).json(tokens)
    } catch (error) {
      const status = error instanceof HttpError ? error.statusCode : 500
      const message = error instanceof Error ? error.message : 'Something went wrong'

      res.status(status).json({ message })
    }
  }
}
