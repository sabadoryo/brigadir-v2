import mongoose from 'mongoose'
import { GamesEnum } from '../../constants/games.enum'

const PlayerSchema = new mongoose.Schema(
  {
    discordId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    avatar: { type: String, require: false },
    gamesProfile: [
      {
        name: { type: String, enum: GamesEnum, required: true },
        rating: { type: Number, default: 1000 },
        matchesPlayed: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true },
)

const PlayerModel = mongoose.model('Player', PlayerSchema)

export default PlayerModel
