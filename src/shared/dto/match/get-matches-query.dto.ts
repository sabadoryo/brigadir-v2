import { PaginationQueryDto } from '../../../backend/dto/pagination-query.dto'
import { DistributionTypesEnum } from '../../../constants/distribution-types.enum'
import { MatchStatusesEnum } from '../../../constants/match-statuses.enum'

export interface GetMatchesQueryDto extends PaginationQueryDto {
  hostId?: string
  status?: MatchStatusesEnum
  distributionType?: DistributionTypesEnum
}
