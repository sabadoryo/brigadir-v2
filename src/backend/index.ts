import express from 'express'
import { config } from '../config'
import matchRouter from './match/match.controller'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import playerRouter from './player/player.controller'

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/matches', matchRouter)
app.use('/players', playerRouter)

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`)
})
