import { REST, Routes } from 'discord.js'
import 'dotenv/config'
import { config } from './config'
import commands from './commands'

export default async function registerSlashCommands() {

  const rest = new REST({ version: '10' }).setToken(config.DISCORD_BOT_TOKEN)

  try {
    console.log('Started refreshing application (/) commands.')

    await rest.put(Routes.applicationCommands(config.DISCORD_CLIENT_ID), {
      body: commands,
    })

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
}
