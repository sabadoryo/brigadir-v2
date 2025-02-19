import PlayerModel from '../../database/schemas/Player'
import { CreatePlayerDto } from '../dto/player/create-player.dto'

async function createPlayer(data: CreatePlayerDto) {
  return PlayerModel.create(data)
}

async function getOrCreateByUsername(username: string) {
  const player = await PlayerModel.findOne({ username })
}

async function getAllPlayers() {
  return await PlayerModel.find()
}

async function getPlayerById(id: string) {
  return await PlayerModel.findById(id)
}

export { createPlayer, getOrCreateByUsername, getAllPlayers, getPlayerById }
