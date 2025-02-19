import { MatchStatusesEnum } from '../../constants/match-statuses.enum'
import MatchModel from '../../database/schemas/Match'
import { ChangeMatchStatusDto } from '../dto/match/change-match-status.dto'
import { CreateMatchDto } from '../dto/match/create-match.dto'
import { AddPlayerToMatchDto } from '../dto/match/add-player-to-match.dto'
import { RemovePlayerFromMatchDto } from '../dto/match/remove-player-from-match.dto'

async function createMatch(data: CreateMatchDto) {
  return MatchModel.create({ ...data, status: MatchStatusesEnum.CREATED })
}

async function findAllMatches() {
  return MatchModel.find().populate('hostId').exec();
}

async function findMatchById(id: string) {
  return MatchModel.find({ id })
}

async function addPlayerToMatch(data: AddPlayerToMatchDto) {
  return MatchModel.findByIdAndUpdate(
    { id: data.matchId },
    { $push: { players: data.username } },
  )
}

async function removePlayerFromMatch(data: RemovePlayerFromMatchDto) {
  return MatchModel.findByIdAndUpdate(
    { id: data.matchId },
    { $pull: { players: data.username } },
  )
}

async function changeMatchStatus(data: ChangeMatchStatusDto) {
  switch (data.status) {
    case MatchStatusesEnum.ACTIVE:
      return MatchModel.findByIdAndUpdate(
        { id: data.matchId },
        { status: data.status, startTime: new Date() },
      )
    case MatchStatusesEnum.CANCELED:
      return MatchModel.findByIdAndUpdate(
        { id: data.matchId },
        { status: data.status },
      )
    case MatchStatusesEnum.FINISHED:
      return MatchModel.findByIdAndUpdate(
        { id: data.matchId },
        { status: data.status, endTime: new Date() },
      )
  }
}
export {
  createMatch,
  findAllMatches,
  findMatchById,
  addPlayerToMatch,
  removePlayerFromMatch,
  changeMatchStatus,
}
