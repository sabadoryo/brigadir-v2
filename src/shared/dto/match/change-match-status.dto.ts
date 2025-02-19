import { MatchStatusesEnum } from "../../../constants/match-statuses.enum"

export interface ChangeMatchStatusDto {
  matchId: string
  status: MatchStatusesEnum
}