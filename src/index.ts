import { Client, Events, GatewayIntentBits } from 'discord.js'
import { config } from './config'
import registerSlashCommands from './register-slash-commands'
import { handleButtonClick, handleStartCW } from './commands-handlers/start-cw'

async function initBot() {
  await registerSlashCommands()

  const client = new Client({ intents: [GatewayIntentBits.Guilds] })

  client.on(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}!`)
  })

  client.on(Events.InteractionCreate, async (interaction) => {
    console.log(interaction)

    if (interaction.isButton()) {
      await handleButtonClick(interaction);
      return;
    }

    if (!interaction.isChatInputCommand()) return

    if (interaction.commandName === 'ping') {
      console.log(interaction.options.getSubcommand())
      if (interaction.options.getSubcommand() === 'piska') {
        await interaction.reply('Pong!')
      }
    }

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
        const game = interaction.options.getString('game', true)

        await handleStartCW(interaction)
        // await interaction.reply(`Сбор кв ${game}`)
        console.log('asd')
      }

      if (interaction.options.getSubcommand() === 'cancel') {
        const game = interaction.options.getString('game', true)

        await interaction.reply(`Отмена кв ${game}`)
      }

      if (interaction.options.getSubcommand() === 'end') {
        await interaction.reply(`Конец кв`)
      }
    }
  })

  client.login(config.DISCORD_BOT_TOKEN)
}

initBot()
