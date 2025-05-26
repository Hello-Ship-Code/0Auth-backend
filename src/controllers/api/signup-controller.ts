import type { Request, RequestHandler, Response } from 'express'
import { ZodError } from 'zod'

import { userValidation } from '../../validation/user/user-validation'

import HttpError from '../../utils/HttpError'
import { userSignupTypes } from '../../utils/user/user-types'
import { userSignup } from '../services/user-signup'
import { generateAccessToken, generateRefreshToken } from '../../utils/JWT/JWT'
import { prisma } from '../../config/db.config'

export const signupController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, userName, password } = userValidation.parse(req.body as userSignupTypes)

    const user = await userSignup({ email, userName, password })

    const access_token = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken,
      },
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.json(access_token)
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map((e) => `${e.path.join('.')} : ${e.message}`)
      res.status(400).json({ message: errors.join(', ') })
      return
    }

    const status = error instanceof HttpError ? error.statusCode : 500
    const message = error instanceof Error ? error.message : 'Something went wrong'

    res.status(status).json({ message })
  }
}
