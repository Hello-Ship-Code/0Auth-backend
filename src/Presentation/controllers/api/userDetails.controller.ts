import type { Request, RequestHandler, Response } from 'express'
import { prisma } from '../../Infrastructure/config/db.config'
import HttpError from '../../utils/HttpError'

export const userDetails: RequestHandler = async (_req: Request, res: Response) => {
  try {
    const userId = res.locals.user?.id

    if (!userId) {
      throw new HttpError('Unauthorized: Missing user ID', 401)
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        userName: true,
      },
    })

    if (!user) {
      throw new HttpError('User not found', 404)
    }

    res.status(200).json(user)
  } catch (error) {
    const status = error instanceof HttpError ? error.statusCode : 500
    const message = error instanceof Error ? error.message : 'Something went wrong'
    res.status(status).json({ message })
  }
}
