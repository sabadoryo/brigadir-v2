import { PaginationQueryDto } from '../../../backend/dto/pagination-query.dto'
import { MatchStatusesEnum } from '../../../constants/match-statuses.enum'

export interface GetMatchesQueryDto extends PaginationQueryDto {
  hostId?: string
  status?: MatchStatusesEnum
}
