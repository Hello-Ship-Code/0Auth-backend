// src/routes/app-router.ts
import { Router, type Response, type Express } from 'express'
import { loginController } from '../controllers/login.controller'
import { signupController } from '../controllers/signup.controller'
import { userController } from '../controllers/users.controllers'
import { authMiddleware } from '../../Infrastructure/Http/middlewares/auth.middleware'
import { userDetails } from '../controllers/userDetails.controller'
import { refreshHandler } from '../wiring/refreshToken.controller.wiring'
//  import { googleRouter } from './google.router'

const protectedRoutes = Router()
protectedRoutes.get('/profile', userDetails)

const apiRouters = Router()
apiRouters.get('/users', userController)
apiRouters.post('/refresh-token', refreshHandler)
apiRouters.post('/signup', signupController)
apiRouters.post('/login', loginController)

const appRouter = (app: Express) => {
  app.use('/user', authMiddleware, protectedRoutes)
  // app.use('/auth', googleRouter)
  app.use('/api', apiRouters)

  app.use((_, response: Response) => {
    response.redirect('/')
  })
}

export { appRouter }
