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

async function findPlayerById(id: string) {
  return await PlayerModel.findById(id)
}

async function findPlayerByUsername(username: string) {
  return await PlayerModel.findOne({ username })
}

export {
  createPlayer,
  getOrCreatePlayerByUsername,
  findAllPlayers,
  findPlayerById,
  findPlayerByUsername,
}
