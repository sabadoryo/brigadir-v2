import { REST, Routes } from 'discord.js'
import 'dotenv/config'
import { config } from './config'
export default async function registerSlashCommands() {
  const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
      options: [
        {
          type: 1,
          name: 'piska',
          description: 'kekka',
        },
        {
          type: 1,
          name: 'lolka',
          description: 'kekka',
        },
      ],
    },
  ]

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
