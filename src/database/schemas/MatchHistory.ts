import mongoose from 'mongoose'
import { GamesEnum } from '../../constants/games.enum'

const MatchHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
      required: true,
    },
    game: { type: GamesEnum, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    result: { type: String, enum: ['win', 'lose'], required: true },
    ratingChange: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const MatchHistoryModel = mongoose.model('Match', MatchHistorySchema)

export default MatchHistoryModel
