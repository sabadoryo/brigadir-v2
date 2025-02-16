import {
  APIApplicationCommandOption,
  ApplicationCommandOptionType,
  RESTPostAPIApplicationCommandsJSONBody,
} from 'discord.js'
import { GamesEnum } from '../constants/games.enum'

const settingsCommands: RESTPostAPIApplicationCommandsJSONBody = {
  name: 'settings',
  description: 'settings commands',
  options: <APIApplicationCommandOption[]>[
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: 'game',
      description: 'set game to profile',
      options: <APIApplicationCommandOption[]>[
        {
          type: ApplicationCommandOptionType.String,
          name: 'game',
          description: 'Выберите игру',
          required: true,
          choices: Object.values(GamesEnum).map((game) => ({
            name: game.toUpperCase(),
            value: game,
          })),
        },
      ],
    },
  ],
}

export default settingsCommands
