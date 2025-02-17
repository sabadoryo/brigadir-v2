import mongoose from 'mongoose'
import { GamesEnum } from '../../constants/games.enum'

const TeamSchema = new mongoose.Schema(
  {
    game: { type: GamesEnum, required: true },
    name: { type: String, required: true },
    players: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    ],
  },
  { timestamps: true },
)

const TeamModel = mongoose.model('Team', TeamSchema)

export default TeamModel
