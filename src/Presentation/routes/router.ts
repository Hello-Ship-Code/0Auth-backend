// src/routes/app-router.ts
import { Router, type Response, type Express } from 'express'

import { authMiddleware } from '../../infrastructure/Http/middlewares/auth.middleware'
import { refreshHandler } from '../wiring/refreshToken.controller.wiring'
import { loginHandler } from '../wiring/login.controller.wiring'
import { signupHandler } from '../wiring/signup.controller.wiring'
import { getUserProfileHandler } from '../wiring/getUserProfile.wiring'
import { tokenService } from '../wiring/tokenService.wiring'
import { logoutHandler } from '../wiring/logout.wiring'



const middleware = authMiddleware(tokenService)

const protectedRoutes = Router()
protectedRoutes.get('/profile', getUserProfileHandler)
protectedRoutes.post('/logout', logoutHandler)

const apiRouters = Router()
// apiRouters.get('/users',)
apiRouters.post('/refresh-token', refreshHandler)
apiRouters.post('/signup', signupHandler)
apiRouters.post('/login', loginHandler)

const appRouter = (app: Express) => {
  app.use('/user', middleware, protectedRoutes)
  // app.use('/auth', googleRouter)
  app.use('/api', apiRouters)

  app.use((_, response: Response) => {
    response.redirect('/')
  })
}

export { appRouter }
