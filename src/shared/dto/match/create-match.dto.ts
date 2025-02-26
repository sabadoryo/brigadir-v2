import { DistributionTypesEnum } from '../../../constants/distribution-types.enum'
import { GamesEnum } from '../../../constants/games.enum'

export interface CreateMatchDto {
  name: string
  hostId: string
  playerAmount: number
  game: GamesEnum
  distributionType: DistributionTypesEnum
}
