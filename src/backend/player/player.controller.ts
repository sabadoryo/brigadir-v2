import { Request, Response, Router } from 'express'
import { getPlayerByUsername } from './player.service'

const playerRouter = Router()

playerRouter.get('/:username', async (req: Request, res: Response) => {
  const player = await getPlayerByUsername(req.params.username)

  res.json(player)
})

export default playerRouter
