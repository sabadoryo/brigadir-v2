import CustomHttpError from '../../backend/errors/custom-http-error'
import { MatchStatusesEnum } from '../../constants/match-statuses.enum'
import MatchModel from '../../database/schemas/Match'
import { AddPlayerToMatchDto } from '../dto/match/add-player-to-match.dto'
import { ChangeMatchStatusDto } from '../dto/match/change-match-status.dto'
import { CreateMatchDto } from '../dto/match/create-match.dto'
import { RemovePlayerFromMatchDto } from '../dto/match/remove-player-from-match.dto'

async function createMatch(data: CreateMatchDto) {
  return MatchModel.create({ ...data, status: MatchStatusesEnum.CREATED })
}

async function findAllMatches() {
  return MatchModel.find().populate('hostId').exec()
}

async function findMatchById(id: string) {
  return MatchModel.findById(id).orFail(
    new CustomHttpError('Match not found', 404),
  )
}

async function addPlayerToMatch(data: AddPlayerToMatchDto) {
  const match = await MatchModel.findOne({
    _id: data.matchId,
  }).orFail(new CustomHttpError('Match not found', 404))

  if (match.status !== MatchStatusesEnum.CREATED) {
    throw new CustomHttpError('Match is not in CREATED status', 400)
  }

  if (match.players.map((elem) => elem.toString()).includes(data.playerId)) {
    throw new CustomHttpError('Player already in match', 400)
  }

  if (match.players.length >= match.playerAmount) {
    throw new CustomHttpError('Match is full', 400)
  }

  return MatchModel.findByIdAndUpdate(
    data.matchId,
    {
      $push: { players: data.playerId },
    },
    {
      new: true,
    },
  )
}

async function removePlayerFromMatch(data: RemovePlayerFromMatchDto) {
  const match = await MatchModel.findOne({
    _id: data.matchId,
  }).orFail(new CustomHttpError('Match not found', 404))

  if (!match.players.map((elem) => elem.toString()).includes(data.playerId)) {
    throw new CustomHttpError('Player is not in match', 400)
  }

  if (match.status !== MatchStatusesEnum.CREATED) {
    throw new CustomHttpError('Match is not in CREATED status', 400)
  }

  return MatchModel.findByIdAndUpdate(
    data.matchId,
    {
      $pull: { players: data.playerId },
    },
    {
      new: true,
    },
  )
}

async function changeMatchStatus(data: ChangeMatchStatusDto) {
  const match = await MatchModel.findById(data.matchId).orFail(
    new CustomHttpError('Match not found', 404),
  )

  const isHost = match.hostId.toString() === data.hostId

  if (!isHost) {
    throw new CustomHttpError('Only host can change match status', 403)
  }

  switch (data.status) {
    case MatchStatusesEnum.ACTIVE:
      if (match.status != MatchStatusesEnum.CREATED) {
        throw new CustomHttpError('Match is not in CREATED status', 400)
      }

      return MatchModel.findByIdAndUpdate(
        data.matchId,
        {
          status: data.status,
          startTime: new Date(),
        },
        {
          new: true,
        },
      )
    case MatchStatusesEnum.CANCELED:
      if (match.status == MatchStatusesEnum.FINISHED) {
        throw new CustomHttpError(
          'Match is in FINISHED status, cannot cancel',
          400,
        )
      }

      return MatchModel.findByIdAndUpdate(
        data.matchId,
        { status: data.status },
        {
          new: true,
        },
      )
    case MatchStatusesEnum.FINISHED:
      if (match.status !== MatchStatusesEnum.ACTIVE) {
        throw new CustomHttpError('Match is not active, cannot finish', 400)
      }

      return MatchModel.findByIdAndUpdate(
        data.matchId,
        {
          status: data.status,
          endTime: new Date(),
        },
        {
          new: true,
        },
      )
  }
}
export {
  addPlayerToMatch,
  changeMatchStatus,
  createMatch,
  findAllMatches,
  findMatchById,
  removePlayerFromMatch,
}
