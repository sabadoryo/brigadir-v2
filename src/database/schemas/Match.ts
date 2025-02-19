import mongoose from 'mongoose'
import { GamesEnum } from '../../constants/games.enum'
import { MatchStatusesEnum } from '../../constants/match-statuses.enum'

const MatchSchema = new mongoose.Schema(
  {
    game: { type: GamesEnum, required: true },
    hostId: {type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true},
    playerAmount: {type: Number, required: true},
    teamAId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    teamBId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    winnerTeamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    startTime: { type: Date },
    status: { type: MatchStatusesEnum, required: true },
    endTime: { type: Date },
    duration: { type: Number },
  },
  { timestamps: true },
)

const MatchModel = mongoose.model('Match', MatchSchema)

export default MatchModel
