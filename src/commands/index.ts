import { RESTPostAPIApplicationCommandsJSONBody } from 'discord.js'
import cwCommands from './cw-commands'
import settingsCommands from './settings-commands'
import statsCommands from './stats-commands'

const commands: RESTPostAPIApplicationCommandsJSONBody[] = [
  cwCommands,
  statsCommands,
  settingsCommands
]

export default commands
