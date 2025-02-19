import axios from 'axios'
import { DiscordMeResponseDto } from '../../backend/dto/discord-me-response.dto'

async function getMe(token: string) {
  try {
    const discordResponse = await axios.get<DiscordMeResponseDto>('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(discordResponse.data)
    return discordResponse.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { getMe }