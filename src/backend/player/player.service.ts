import { findPlayerByUsername } from '../../shared/repositories/player.repository'

async function getPlayerByUsername(username: string) {
  try {
    const player = await findPlayerByUsername(username)
    return player
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { getPlayerByUsername }
