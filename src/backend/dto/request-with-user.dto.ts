import { Request } from 'express'
import { DiscordUser } from './discord-me-response.dto'

export interface RequestWithUser extends Request {
  user: DiscordUser
}

