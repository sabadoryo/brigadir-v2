import { Client, Events, GatewayIntentBits } from 'discord.js'
import { config } from './config'
import registerSlashCommands from './register-slash-commands'

async function initBot() {
  await registerSlashCommands()

  const client = new Client({ intents: [GatewayIntentBits.Guilds] })

  client.on(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}!`)
  })

  client.on(Events.InteractionCreate, async (interaction) => {
    console.log(interaction)
    if (!interaction.isChatInputCommand()) return

    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!')
    }
  })

  client.login(config.DISCORD_BOT_TOKEN)
}

initBot()
