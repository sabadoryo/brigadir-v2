import { APIApplicationCommandOption, ApplicationCommandOptionType, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";
import { GamesEnum } from "../constants/games.enum";

const cwCommands: RESTPostAPIApplicationCommandsJSONBody = {
  name: 'cw',
  description: 'brigadir commands',
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
    },
  ],
}

export default cwCommands;