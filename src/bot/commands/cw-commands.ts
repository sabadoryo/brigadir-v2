import {
  APIApplicationCommandOption,
  ApplicationCommandOptionType,
  RESTPostAPIApplicationCommandsJSONBody,
} from 'discord.js'
import { GamesEnum } from '../../constants/games.enum'

const cwCommands: RESTPostAPIApplicationCommandsJSONBody = {
  name: 'cw',
  description: 'cw commands',
  options: <APIApplicationCommandOption[]>[
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: 'start',
      description: 'start cw',
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
        {
          type: ApplicationCommandOptionType.String,
          name: 'cwname',
          description: 'cw name',
          required: true,
        },
      ],
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: 'cancel',
      description: 'cancel cw',
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
      name: 'end',
      description: 'end cw',
      options: <APIApplicationCommandOption[]>[
        {
          type: ApplicationCommandOptionType.String,
          name: 'cwname',
          description: 'cw name',
          required: true,
        },
      ],
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: 'list',
      description: 'list of active cws',
    },
  ],
}

export default cwCommands
