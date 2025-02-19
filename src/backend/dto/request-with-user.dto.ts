import { Request } from 'express'
import { DiscordMeResponseDto } from './discord-me-response.dto'

export interface RequestWithUser extends Request {
  user: DiscordMeResponseDto
}

