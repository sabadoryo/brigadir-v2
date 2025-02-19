import express from 'express'
import { config } from '../config'
import matchRouter from './match/match.controller'
import playerRouter from './player/player.controller'
import { discordAuthMiddlewareTyped } from './middlewares/discord-auth.middleware'
import cors from 'cors'
import connectDB from '../database/db'

const app = express()

const apiRouter = express.Router()

app.use(
  cors({
    allowedHeaders: ['Authorization', 'Content-Type'],
  }),
)

app.use(express.json())
app.use(discordAuthMiddlewareTyped)
apiRouter.use('/matches', matchRouter)
apiRouter.use('/players', playerRouter)
app.use('/api', apiRouter)

app.listen(config.PORT, async () => {
  await connectDB()
  console.log(`Server is running on port ${config.PORT}`)
})
