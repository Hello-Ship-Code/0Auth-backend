import type { RequestHandler } from 'express'
import HttpError from '../../utils/HttpError'
import jwt from 'jsonwebtoken'
import { env } from '../../Infrastructure/config/env.config'
import { findUserById } from '../services/findUser.service'
import { generateAccessToken } from '../../utils/JWT/JWT'

export const refreshTokenController: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies.refreshToken

    if (!token) res.status(401).json({ message: ' No Refresh token found' })

    const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as {
      id: string
      email: string
      userName: string
    }

    const user = await findUserById(decoded.id)

    if (!user || user.refreshToken !== token) {
      res.status(403).json({ message: 'invalid refresh token' })
      return
    }

    const access_token = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
      userName: decoded.userName,
    })

    res.status(200).json({ access_token: access_token })
  } catch (error) {
    const status = error instanceof HttpError ? error.statusCode : 500
    const message = error instanceof Error ? error.message : 'Something went wrong'

    res.status(status).json({ message })
  }
}
