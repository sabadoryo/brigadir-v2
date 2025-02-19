import mongoose from 'mongoose'
import { GamesEnum } from '../../constants/games.enum'

const PlayerStatsSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
  game: { type: String, enum: GamesEnum, required: true },
  matchesPlayed: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  winRate: { type: Number, default: 0 },
});

const PlayerStatsModel = mongoose.model('User', PlayerStatsSchema)

export default PlayerStatsModel
