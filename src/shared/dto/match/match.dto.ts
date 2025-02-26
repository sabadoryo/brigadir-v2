import { DistributionTypesEnum } from '../../../constants/distribution-types.enum'
import { GamesEnum } from '../../../constants/games.enum'

export interface MatchDto {
  game: GamesEnum
  hostId: string
  distributionType: DistributionTypesEnum
  playerAmount: number
  teamA: string[]
  teamB: string[]
  winnerTeamId: string
  startTime: Date
  status: string
  endTime: Date
  duration: number
  players: string[]
  _id: string
  createdAt: Date
  updatedAt: Date
}
