import type { Request, Response, RequestHandler } from 'express'
import { SignUpUseCase } from '../../application/usecases/SignUpUseCase'
import { userValidation } from '../../application/Validation/user/userValidation'
import { env } from '../../infrastructure/Http/config/env.config'
import { ZodError } from 'zod'
import HttpError from '../../infrastructure/Http/middlewares/HttpError'

export const signupController = (signUseCase: SignUpUseCase): RequestHandler => {
  return async (req: Request, res: Response) => {
    try {
      const { email, password, userName } = userValidation.parse(req.body)

      const { accessToken, refreshToken } = await signUseCase.execute({ email, password, userName })

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      res.status(201).json({ accessToken: accessToken })
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`)
        res.status(400).json({ message: errors.join(', ') })
        return
      }

      const status = error instanceof HttpError ? error.statusCode : 500
      const message = error instanceof Error ? error.message : 'Something went wrong'
      res.status(status).json({ message })
    }
  }
}
