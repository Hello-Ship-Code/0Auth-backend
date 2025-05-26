import type { Request, RequestHandler, Response } from 'express'

import HttpError from '../../utils/HttpError'
import { userLoginTypes } from '../../utils/user/user.types'
import { userLogin } from '../services/login.service'
import { generateAccessToken, generateRefreshToken } from '../../utils/JWT/JWT'
import { env } from '../../config/env.config'
import { updateRefreshToken } from '../services/updateRefreshToken.service'

export const loginController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as userLoginTypes

    if (!email || !password) {
      const missingFields = []
      if (!email) missingFields.push('email')
      if (!password) missingFields.push('password')

      res.status(400).json({
        message: `${missingFields.join(' and ')} ${missingFields.length > 1 ? 'are' : 'is'} required`,
      })
      return
    }

    const user = await userLogin({ email, password })

    if (!user) {
      res.redirect('/login')
      return
    }

    const access_token = generateAccessToken(user)
    const refresh_token = generateRefreshToken(user)

    user.refreshToken = refresh_token

    updateRefreshToken(refresh_token, user.id)

    res.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json({ access_token: access_token })
  } catch (error) {
    const status = error instanceof HttpError ? error.statusCode : 500
    const message = error instanceof Error ? error.message : 'Something went wrong'

    res.status(status).json({ message })
  }
}
