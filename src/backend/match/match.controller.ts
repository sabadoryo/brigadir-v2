import { Request, Response, Router } from 'express'

const matchRouter = Router()

matchRouter.get('/', (req: Request, res: Response) => {
  res.send('Hello from match')
})

matchRouter.get('/:id', (req: Request, res: Response) => {
  res.send('Hello from match')
})

matchRouter.post('/:id/join', (req: Request, res: Response) => {
  res.send('Hello from match')
})

matchRouter.post('/:id/leave', (req: Request, res: Response) => {
  res.send('Hello from match')
})

export default matchRouter
