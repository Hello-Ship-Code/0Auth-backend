import { Router, Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { env } from '../config/env.config'
import { setUser } from '../utils/JWT/auth'

const googleRouter = Router()

googleRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
)

googleRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),

  (req: Request, res: Response, next: NextFunction) => {
    res.locals.user = req.user
    next()
  },

  (_req: Request, res: Response) => {
    const user = res.locals.user as any

    const payload = {
      id: user.id,
      userName: user.displayName,
      email: user.emails?.[0]?.value || '',
    }

    const token = setUser(payload)

    res.redirect(`${env.CLIENT_ORIGIN}/oauth-success?token=${token}`)
  },
)

export { googleRouter }
