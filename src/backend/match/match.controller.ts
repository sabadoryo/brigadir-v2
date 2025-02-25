import { NextFunction, Request, Response, Router } from 'express'
import { MatchStatusesEnum } from '../../constants/match-statuses.enum'
import {
  addPlayerToMatch,
  changeMatchStatus,
  removePlayerFromMatch,
} from '../../shared/repositories/match.repository'
import { getAllMatches, getMatchById, hostMatch } from './match.service'

const matchRouter = Router()

matchRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await getAllMatches()
      res.json(matches)
    } catch (error) {
      next(error)
    }
  },
)

matchRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await hostMatch(req.body)
      res.json(matches)
    } catch (error) {
      next(error)
    }
  },
)

matchRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const match = await getMatchById(req.params.id)
      res.json(match)
    } catch (error) {
      next(error)
    }
  },
)

matchRouter.post(
  '/:id/join',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const match = await addPlayerToMatch({
        matchId: req.params.id,
        playerId: req.user._id.toString(),
      })
      res.json(match)
    } catch (error) {
      next(error)
    }
  },
)

matchRouter.post(
  '/:id/leave',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const match = await removePlayerFromMatch({
        matchId: req.params.id,
        playerId: req.user._id.toString(),
      })
      res.json(match)
    } catch (error) {
      next(error)
    }
  },
)

matchRouter.post(
  '/:id/start',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const match = await changeMatchStatus({
        matchId: req.params.id,
        status: MatchStatusesEnum.ACTIVE,
        hostId: req.user._id.toString(),
      })
      res.json(match)
    } catch (error) {
      next(error)
    }
  },
)

matchRouter.post(
  '/:id/end',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const match = await changeMatchStatus({
        matchId: req.params.id,
        status: MatchStatusesEnum.FINISHED,
        hostId: req.user._id.toString(),
      })
      res.json(match)
    } catch (error) {
      next(error)
    }
  },
)

export default matchRouter
