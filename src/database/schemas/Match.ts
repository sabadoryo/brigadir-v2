import mongoose from 'mongoose'
import { GamesEnum } from '../../constants/games.enum'

const MatchSchema = new mongoose.Schema({
  game: { type: GamesEnum, required: true },
  teamA: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  teamB: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
}, { timestamps: true });

const MatchModel = mongoose.model('Match', MatchSchema)

export default MatchModel
