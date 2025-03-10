import mongoose from 'mongoose'
import { DistributionTypesEnum } from '../../constants/distribution-types.enum'
import { GamesEnum } from '../../constants/games.enum'
import { MatchStatusesEnum } from '../../constants/match-statuses.enum'

const MatchSchema = new mongoose.Schema(
  {
    game: { type: String, enum: GamesEnum, required: true },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      required: true,
    },
    distributionType: {
      type: String,
      enum: DistributionTypesEnum,
      required: true,
    },
    playerAmount: { type: Number, required: true },
    teamA: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    teamB: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    winnerTeamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    startTime: { type: Date },
    status: { type: String, enum: MatchStatusesEnum, required: true },
    endTime: { type: Date },
    duration: { type: Number },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    name: { type: String, require: true },
  },
  { timestamps: true },
)

const MatchModel = mongoose.model('Match', MatchSchema)

export default MatchModel
