import mongoose from 'mongoose'
import CustomHttpError from '../../backend/errors/custom-http-error'
import PlayerModel from '../../database/schemas/Player'
import { CreatePlayerDto } from '../dto/player/create-player.dto'

async function createPlayer(data: CreatePlayerDto) {
  return PlayerModel.create(data)
}

async function getOrCreatePlayerByUsername(data: CreatePlayerDto) {
  const player = await findPlayerByUsername(data.username)
  console.log(player)
  console.log(data)
  if (player) {
    return player
  }
  return await createPlayer(data)
}

async function findAllPlayers() {
  return await PlayerModel.find()
}

async function findPlayerByUsername(username: string) {
  return await PlayerModel.findOne({ username })
}

async function findPlayerById(_id: mongoose.Types.ObjectId) {
  return PlayerModel.findById(_id).orFail(
    new CustomHttpError('Player not found', 404),
  )
}

export {
  createPlayer,
  findAllPlayers,
  findPlayerById,
  findPlayerByUsername,
  getOrCreatePlayerByUsername,
}
