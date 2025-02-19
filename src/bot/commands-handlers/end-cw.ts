import {
  ChannelType,
  ChatInputCommandInteraction,
  Collection,
} from 'discord.js'
import activeCWs from '../../storage/active-cws'

async function handleEndCW(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: false })
  const cwName = interaction.options.getString('cwname', true)
  const guild = interaction.guild

  if (!guild)
    return interaction.editReply({
      content: 'Ошибка: гильдия не найдена.',
    })

  const category = guild.channels.cache.find(
    (channel) =>
      channel.type === ChannelType.GuildCategory &&
      channel.name === `${cwName}`,
  )

  if (!category) return interaction.editReply({ content: 'CW не найдена.' })

  const cwsborChannel = guild.channels.cache.find(
    (channel) =>
      channel.type === ChannelType.GuildVoice &&
      channel.name === '🎮-Creativity Room',
  )
  // console.log(cwsborChannel)
  if (!cwsborChannel)
    return interaction.editReply({
      content: 'Ошибка: канал "🎮-Creativity Room" не найден.',
    })

  try {
    const voiceChannels = guild.channels.cache.filter(
      (channel) =>
        channel.type === ChannelType.GuildVoice &&
        channel.parentId === category.id,
    )
    if (cwsborChannel?.type === ChannelType.GuildVoice) {
      for (const voiceChannel of voiceChannels.values()) {
        console.log('voiceChannel', voiceChannel.members)
        if (voiceChannel.members instanceof Collection) {
          for (const member of voiceChannel.members.values()) {
            console.log('member', member)
            await member.voice.setChannel(cwsborChannel).catch(console.error)
          }
        }
      }
    } else {
      console.error('Ошибка: cwsborChannel не является голосовым каналом.')
    }

    // Удаляем все каналы в категории
    for (const [, channel] of voiceChannels) {
      await channel.delete().catch(console.error)
    }

    await category.delete().catch(console.error)

    activeCWs.delete(cwName)

    await interaction.editReply({
      content: `CW "${cwName}" завершена, каналы удалены.`,
    })
  } catch (error) {
    console.error('Ошибка при удалении CW:', error)
    await interaction.editReply({
      content: 'Произошла ошибка при удалении CW.',
    })
  }
}

export { handleEndCW }
