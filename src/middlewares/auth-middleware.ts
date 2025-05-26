import { RequestHandler } from 'express'
import HttpError from '../utils/HttpError'
import { verifyAccessToken } from '../utils/JWT/JWT'
import jwt from 'jsonwebtoken'

export const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpError('Authentication token not found', 401)
    }

    const token = authHeader.split(' ')[1]

    // verifyAccessToken will throw if token is invalid or expired
    const user = verifyAccessToken(token) as { id: string; userName: string }

    res.locals.user = user

    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' })
      return
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' })
      return
    }

    const status = error instanceof HttpError ? error.statusCode : 500
    const message = error instanceof Error ? error.message : 'Authentication failed'

    res.status(status).json({ message })
  }
}
