import express from 'express'
import cors from 'cors'
import passport from 'passport'

import { env } from './config/env.config'
import { appRouter } from './routes/router'
import './config/passport.google'

const app = express()

app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }))
app.use(express.json())
app.use(passport.initialize())

appRouter(app)

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`)
})
