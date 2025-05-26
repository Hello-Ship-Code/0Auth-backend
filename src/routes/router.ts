// src/routes/app-router.ts
import { Router, type Response, type Express } from 'express'
import { loginController } from '../controllers/api/login.controller'
import { signupController } from '../controllers/api/signup.controller'
import { userController } from '../controllers/api/users-controllers'
import { authMiddleware } from '../middlewares/auth-middleware'
import { userDetails } from '../controllers/api/userDetail-controller'
import { refreshTokenController } from '../controllers/api/refresh-token.controller'
// import { googleRouter } from './google.router'

const protectedRoutes = Router()
protectedRoutes.get('/profile', userDetails)

const apiRouters = Router()
apiRouters.get('/users', userController)
apiRouters.post('/refresh-token', refreshTokenController)
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
