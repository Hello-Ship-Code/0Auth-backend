import { RequestHandler } from 'express'

import HttpError from '../utils/HttpError'

export const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    next()
  } catch (error) {
    const status = error instanceof HttpError ? error.statusCode : 500
    const message = error instanceof Error ? error.message : 'Authentication failed'

    res.status(status).json({ message })
  }
}
