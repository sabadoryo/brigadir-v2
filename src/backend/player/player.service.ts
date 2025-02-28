import mongoose from 'mongoose'
import {
  findPlayerById,
  findPlayerByUsername,
} from '../../shared/repositories/player.repository'

async function getPlayerByUsername(username: string) {
  try {
    const player = await findPlayerByUsername(username)
    return player
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function getPlayerById(_id: mongoose.Types.ObjectId) {
  try {
    const player = await findPlayerById(_id)
    return player
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { getPlayerById, getPlayerByUsername }
