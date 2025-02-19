import {
  APIApplicationCommandOption,
  ApplicationCommandOptionType,
  RESTPostAPIApplicationCommandsJSONBody,
} from 'discord.js'
import { GamesEnum } from '../../constants/games.enum'

const statsCommands: RESTPostAPIApplicationCommandsJSONBody = {
  name: 'stats',
  description: 'stats commands',
  options: <APIApplicationCommandOption[]>[
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: 'rating',
      description: 'check player rating',
      options: <APIApplicationCommandOption[]>[
        {
          type: ApplicationCommandOptionType.User, // Выбор пользователя
          name: 'user',
          description: 'Выберите пользователя',
          required: true,
        },
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
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: 'my_rating',
      description: 'check my rating',
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
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: 'leaderboard',
      description: 'check leaderboard',
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

export default statsCommands
