import cors from 'cors'
import express from 'express'
import { config } from '../config'
import connectDB from '../database/db'
import { PlayerDto } from '../shared/dto/player/player.dto'
import matchRouter from './match/match.controller'
import { discordAuthMiddlewareTyped } from './middlewares/discord-auth.middleware'
import { errorHandlerTyped } from './middlewares/error-handler.middleware'
import playerRouter from './player/player.controller'

declare global {
  namespace Express {
    interface Request {
      user: PlayerDto
    }
  }
}

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

app.use(errorHandlerTyped)

app.listen(config.PORT, async () => {
  await connectDB()
  console.log(`Server is running on port ${config.PORT}`)
})
