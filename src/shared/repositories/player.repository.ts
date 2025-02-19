import PlayerModel from "../../database/schemas/Player";


async function getAllPlayers() {
  return await PlayerModel.find()
}