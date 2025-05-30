// src/infrastructure/http/middleware/authMiddleware.ts
import { RequestHandler } from 'express'
import { ITokenService } from '../../../domain/service/ITokenService'
import HttpError from '../../../utils/HttpError'

export const authMiddleware = (tokenService: ITokenService): RequestHandler => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new HttpError('Authentication token not found', 401)
      }

      const token = authHeader.split(' ')[1]

      const decoded = tokenService.verifyAccessToken(token)
      if (!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
        throw new HttpError('Invalid token payload', 401)
      }

      res.locals.user = decoded // accessible in controllers

      next()
    } catch (error: any) {
      const status =
        error instanceof HttpError
          ? error.statusCode
          : error.name === 'TokenExpiredError'
            ? 401
            : 500

      const message =
        error instanceof HttpError
          ? error.message
          : error.name === 'TokenExpiredError'
            ? 'Token expired'
            : 'Authentication failed'

      res.status(status).json({ message })
    }
  }
}
