import express from 'express'
import cors from 'cors'

import { env } from './config/env.config'

import { appRouter } from './routes/router'

const app = express()

app.use(cors())

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

appRouter(app)

// Server
app.listen(env.PORT, () => console.log(`Server is running on port ${env.PORT}`))
