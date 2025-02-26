import { AddPlayerToMatchDto } from '../../shared/dto/match/add-player-to-match.dto'
import { ChangeMatchStatusDto } from '../../shared/dto/match/change-match-status.dto'
import { CreateMatchDto } from '../../shared/dto/match/create-match.dto'
import { GetMatchesQueryDto } from '../../shared/dto/match/get-matches-query.dto'
import { RemovePlayerFromMatchDto } from '../../shared/dto/match/remove-player-from-match.dto'
import {
  addPlayerToMatch,
  changeMatchStatus,
  createMatch,
  findAllMatches,
  findMatchById,
  removePlayerFromMatch,
} from '../../shared/repositories/match.repository'

async function hostMatch(data: CreateMatchDto) {
  try {
    const match = await createMatch(data)
    return match
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function getAllMatches(query: GetMatchesQueryDto) {
  try {
    const matches = await findAllMatches(query)
    return matches
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function getMatchById(id: string) {
  try {
    const match = await findMatchById(id)
    return match
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function joinMatch(data: AddPlayerToMatchDto) {
  try {
    const match = await addPlayerToMatch(data)
    return match
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function leaveMatch(data: RemovePlayerFromMatchDto) {
  try {
    const match = await removePlayerFromMatch(data)
    return match
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function setMatchStatus(data: ChangeMatchStatusDto) {
  try {
    const match = await changeMatchStatus(data)
    return match
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  getAllMatches,
  getMatchById,
  hostMatch,
  joinMatch,
  leaveMatch,
  setMatchStatus,
}
