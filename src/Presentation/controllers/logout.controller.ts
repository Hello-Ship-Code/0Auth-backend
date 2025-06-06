import type { Request, Response, NextFunction } from 'express'
import HttpError from '../../infrastructure/Http/middlewares/HttpError'
import { LogoutUseCase } from '../../application/usecases/LogoutUseCase'

export const logoutController = (logoutUsecase: LogoutUseCase) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies?.refreshToken

      if (!refreshToken) throw new HttpError('Refresh token is missing', 404)
      await logoutUsecase.execute(refreshToken)
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })

      res.status(200).json({ success: true, message: 'Logged out successfully' })
    } catch (error) {
      next(error)
    }
  }
}
