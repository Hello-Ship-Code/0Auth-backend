import type { Request, Response, RequestHandler } from 'express'
import { LoginDTO } from '../../application/DTO/LoginDTO'
import { env } from '../../Infrastructure/config/env.config'
import { LoginUseCase } from '../../application/usecases/LoginUseCase'
import HttpError from '../../Infrastructure/Http/middlewares/HttpError'

export const loginController = (loginUseCase: LoginUseCase): RequestHandler => {
  return async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body as LoginDTO

      if (!email || !password) {
        const missingFields = []
        if (!email) missingFields.push('email')
        if (!password) missingFields.push('password')

        res.status(400).json({
          message: `${missingFields.join(' and ')} ${missingFields.length > 1 ? 'are' : 'is'} required`,
        })
        return
      }

      const { accessToken, refreshToken } = await loginUseCase.execute({ email, password })

      // Set refresh token in cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      res.status(200).json({ access_token: accessToken })
    } catch (error: unknown) {
      const status = error instanceof HttpError ? error.statusCode : 500
      const message = error instanceof Error ? error.message : 'Something went wrong'
      res.status(status).json({ message })
    }
  }
}
