import { MatchStatusesEnum } from '../../constants/match-statuses.enum'
import MatchModel from '../../database/schemas/Match'
import { ChangeMatchStatusDto } from '../dto/match/change-match-status.dto'
import { CreateMatchDto } from '../dto/match/create-match.dto'
import { JoinMatchDto } from '../dto/match/join-match.dto'
import { LeaveMatchDto } from '../dto/match/leave-match.dto'

async function createMatch(data: CreateMatchDto) {
  return MatchModel.create({ ...data, status: MatchStatusesEnum.CREATED })
}

async function getAllMatches() {
  return MatchModel.find()
}

async function getMatchById(id: string) {
  return MatchModel.find({ id })
}

async function joinMatch(data: JoinMatchDto) {
  return MatchModel.findByIdAndUpdate(
    { id: data.matchId },
    { $push: { players: data.userId } },
  )
}

async function leaveMatch(data: LeaveMatchDto) {
  return MatchModel.findByIdAndUpdate(
    { id: data.matchId },
    { $pull: { players: data.userId } },
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
  getAllMatches,
  getMatchById,
  joinMatch,
  leaveMatch,
  changeMatchStatus,
}
