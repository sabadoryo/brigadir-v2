import { Request } from 'express'
import { PlayerDto } from '../../shared/dto/player/player.dto'

export interface RequestWithUser extends Request {
  user: PlayerDto
}
