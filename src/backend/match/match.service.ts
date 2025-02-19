import MatchModel from '../../database/schemas/Match'

async function getAllMatches() {
  return await MatchModel.find()
}
