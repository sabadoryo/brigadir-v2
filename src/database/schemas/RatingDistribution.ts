import mongoose from 'mongoose'
import { GamesEnum } from '../../constants/games.enum'

const RatingDistributionSchema = new mongoose.Schema(
  {
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    amount: { type: String, required: true },
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true }
  },
  { timestamps: true },
)

const RatingDistributionModel = mongoose.model('RatingDistribution', RatingDistributionSchema)

export default RatingDistributionModel
