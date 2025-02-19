import express from 'express'
import { config } from '../config'
import matchRouter from './match/match.controller'
import playerRouter from './player/player.controller'
import { discordAuthMiddlewareTyped } from './middlewares/discord-auth.middleware'

const app = express()

app.use(discordAuthMiddlewareTyped)
app.use('/matches', matchRouter)
app.use('/players', playerRouter)

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`)
})
