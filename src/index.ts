import { Client, Events, GatewayIntentBits } from 'discord.js'
import { config } from './config'
import registerSlashCommands from './register-slash-commands'
import { handleButtonClick, handleStartCW } from './commands-handlers/start-cw'
import { handleEndCW } from './commands-handlers/end-cw'
import { handleListCW, handleListCWButtons } from './commands-handlers/list-cw'
import connectDB from './database/db'

async function initBot() {
  await connectDB()
  await registerSlashCommands()

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildPresences,
    ],
  })

  client.on(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}!`)
  })

  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isButton()) {
      await handleButtonClick(interaction)
      await handleListCWButtons(interaction)
      return
    }

    if (!interaction.isChatInputCommand()) return

    if (interaction.commandName === 'stats') {
      if (interaction.options.getSubcommand() === 'rating') {
        const user = interaction.options.getUser('user', true)
        const game = interaction.options.getString('game', true)

        await interaction.reply(`Рейтинг ${user.username} в игре ${game}`)
      }

      if (interaction.options.getSubcommand() === 'my_rating') {
        const game = interaction.options.getString('game', true)

        await interaction.reply(`Ваш рейтинг в игре ${game}`)
      }

      if (interaction.options.getSubcommand() === 'leaderboard') {
        const game = interaction.options.getString('game', true)

        await interaction.reply(`Лидерборд в игре ${game}`)
      }
    }

    if (interaction.commandName === 'cw') {
      if (interaction.options.getSubcommand() === 'start') {
        await handleStartCW(interaction)
      }

      if (interaction.options.getSubcommand() === 'cancel') {
        const game = interaction.options.getString('game', true)

        await interaction.reply(`Отмена кв ${game}`)
      }

      if (interaction.options.getSubcommand() === 'end') {
        await handleEndCW(interaction)
      }

      if (interaction.options.getSubcommand() === 'list') {
        await handleListCW(interaction)
      }
    }
  })

  client.login(config.DISCORD_BOT_TOKEN)
}

initBot()
