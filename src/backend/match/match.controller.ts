import { Request, Response, Router } from 'express'
import { getAllMatches, getMatchById, hostMatch } from './match.service'
import {
  addPlayerToMatch,
  changeMatchStatus,
  removePlayerFromMatch,
} from '../../shared/repositories/match.repository'
import { MatchStatusesEnum } from '../../constants/match-statuses.enum'

const matchRouter = Router()

matchRouter.get('/', async (req: Request, res: Response) => {
  const matches = await getAllMatches()
  console.log('uspeh 2')
  res.json(matches)
})

matchRouter.post('/', async (req: Request, res: Response) => {
  const matches = await hostMatch(req.body)
  res.json(matches)
})

matchRouter.get('/:id', async (req: Request, res: Response) => {
  const match = await getMatchById(req.params.id)
  res.json(match)
})

matchRouter.post('/:id/join', async (req: Request, res: Response) => {
  const match = await addPlayerToMatch({
    matchId: req.params.id,
    username: req.body.username,
  })
  res.json(match)
})

matchRouter.post('/:id/leave', async (req: Request, res: Response) => {
  const match = await removePlayerFromMatch({
    matchId: req.params.id,
    username: req.body.username,
  })
  res.json(match)
})

matchRouter.post('/:id/start', async (req: Request, res: Response) => {
  const match = await changeMatchStatus({
    matchId: req.params.id,
    status: MatchStatusesEnum.ACTIVE,
  })
  res.json(match)
})

matchRouter.post('/:id/end', async (req: Request, res: Response) => {
  const match = await changeMatchStatus({
    matchId: req.params.id,
    status: MatchStatusesEnum.FINISHED,
  })
  res.json(match)
})

export default matchRouter
