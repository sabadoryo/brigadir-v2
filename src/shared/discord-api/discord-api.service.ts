import axios from 'axios'
import { DiscordMeResponseDto } from '../../backend/dto/discord-me-response.dto'
import { getOrCreatePlayerByUsername } from '../repositories/player.repository'

async function getMe(token: string) {
  try {
    const discordResponse = await axios.get<DiscordMeResponseDto>(
      'https://discord.com/api/users/@me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    console.log('getme')
    const user = await getOrCreatePlayerByUsername({
      username: discordResponse.data.username,
      discordId: discordResponse.data.id,
      avatar: discordResponse.data.avatar,
    })
    return user
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { getMe }
