import { Request, Response, Router } from 'express'

const playerRouter = Router()

playerRouter.get('/', (req: Request, res: Response) => {
  res.send('Hello from player')
})

playerRouter.get('/:id', (req: Request, res: Response) => {
  res.send('Hello from player')
})

export default playerRouter
