import mongoose from 'mongoose'
import { PlayerGamesProfileDto } from './player-games-profile.dto'

export interface PlayerDto {
  discordId: string
  username: string
  avatar?: string | null
  gamesProfile: PlayerGamesProfileDto[]
  _id: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}
