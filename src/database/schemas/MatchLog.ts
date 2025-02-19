import mongoose from 'mongoose'
import { GamesEnum } from '../../constants/games.enum'

const MatchLogSchema = new mongoose.Schema(
  {
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
      required: true,
    },
    game: { type: String, enum: GamesEnum, required: true },
    players: [
      {
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Player',
          required: true,
        },
        team: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Team',
          required: true,
        },
        kills: { type: Number, default: 0 },
        deaths: { type: Number, default: 0 },
        assists: { type: Number, default: 0 },
      },
    ],
    duration: { type: Number },
  },
  { timestamps: true },
)

const MatchLogModel = mongoose.model('Match', MatchLogSchema)

export default MatchLogModel
