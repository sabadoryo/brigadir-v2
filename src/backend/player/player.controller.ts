import { Request, Response, Router } from 'express'

const playerRouter = Router()

playerRouter.get('/getMe', async (req: Request, res: Response) => {
  res.json(req.user)
})

export default playerRouter
