import express from 'express'
import cors from 'cors'

import cookieParser from 'cookie-parser'

import { env } from './infrastructure/Http/config/env.config'
import { appRouter } from './presentation/routes/router'

const app = express()

app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

appRouter(app)

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`)
})

// import express from 'express'
// import cors from 'cors'
// import helmet from 'helmet'
// import rateLimit from 'express-rate-limit'
// import passport from 'passport'
// import cookieParser from 'cookie-parser'

// import { env } from './Infrastructure/config/env.config'
// import { appRouter } from './Presentation/routes/router'
// import './Infrastructure/config/passport.google'

// const app = express()

// app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }))
// app.use(helmet())
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())
// app.use(passport.initialize())

// app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }))

// appRouter(app)

// app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
//   const status = err.statusCode || 500
//   const message = err.message || 'Internal Server Error'
//   res.status(status).json({ message })
// })

// app.listen(env.PORT, () => {
//   console.log(`Server running at http://localhost:${env.PORT}`)
// })
