import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  Interaction,
  ChannelType,
} from 'discord.js'
import ratings from '../../constants/players-rating'
import activeCWs from '../../storage/active-cws'

const MAX_PLAYERS = 2

async function handleStartCW(interaction: ChatInputCommandInteraction) {
  const game = interaction.options.getString('game', true)
  const cwName = interaction.options.getString('cwname', true)

  activeCWs.set(cwName, { game, players: [] })

  const embed = createCWEmbed(cwName, game, [])

  const joinButton = new ButtonBuilder()
    .setCustomId(`join_cw_${cwName}`)
    .setLabel('Записаться')
    .setStyle(ButtonStyle.Primary)

  const leaveButton = new ButtonBuilder()
    .setCustomId(`leave_cw_${cwName}`)
    .setLabel('Покинуть')
    .setStyle(ButtonStyle.Danger)

  const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    joinButton,
    leaveButton,
  )

  await interaction.reply({ embeds: [embed], components: [actionRow] })
}

function createCWEmbed(cwName: string, game: string, players: string[]) {
  return new EmbedBuilder()
    .setTitle(`${cwName}`)
    .setDescription(
      `🛠️ **Сбор на CW в ${game}!**  
      👥 **Игроков в команде:** ${players.length}/${MAX_PLAYERS}`,
    )
    .setColor(0xff0000)
    .addFields(
      {
        name: '🟢 Участники',
        value: players.length > 0 ? players.join('\n') : 'Пока никого',
        inline: true,
      },
      {
        name: '⏳ Ожидание',
        value:
          players.length < MAX_PLAYERS ? 'Идет набор...' : 'Набор завершен!',
        inline: true,
      },
    )
    .setFooter({ text: 'Brigadir Bot' })
}

async function handleButtonClick(interaction: Interaction) {
  if (!interaction.isButton()) return
  let cwName = interaction.message.embeds[0].data.title

  if (!cwName) return
  const { customId, user, guild } = interaction
  if (
    !customId.startsWith('join_cw_') &&
    !customId.startsWith('leave_cw_') &&
    !customId.startsWith('start_cw_')
  )
    return

  const cw = activeCWs.get(cwName)
  if (!cw)
    return interaction.reply({ content: 'Сбор не найден.', ephemeral: true })

  if (customId.startsWith('join_cw_')) {
    if (cw.players.includes(user.username)) {
      return interaction.reply({ content: 'Вы уже записаны!', ephemeral: true })
    }

    if (isUserInAnyCW(user.username)) {
      return interaction.reply({
        content: 'Вы уже участвуете в другом CW!',
        ephemeral: true,
      })
    }

    if (cw.players.length >= MAX_PLAYERS) {
      return interaction.reply({
        content: 'Набор уже завершен!',
        ephemeral: true,
      })
    }

    cw.players.push(user.username)

    let actionRow
    if (cw.players.length === MAX_PLAYERS) {
      const startButton = new ButtonBuilder()
        .setCustomId(`start_cw_${cwName}`)
        .setLabel('Начать CW')
        .setStyle(ButtonStyle.Success)
      const leaveButton = new ButtonBuilder()
        .setCustomId(`leave_cw_${cwName}`)
        .setLabel('Покинуть')
        .setStyle(ButtonStyle.Danger)

      actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
        startButton,
        leaveButton,
      )
    } else {
      const joinButton = new ButtonBuilder()
        .setCustomId(`join_cw_${cwName}`)
        .setLabel('Записаться')
        .setStyle(ButtonStyle.Primary)
      const leaveButton = new ButtonBuilder()
        .setCustomId(`leave_cw_${cwName}`)
        .setLabel('Покинуть')
        .setStyle(ButtonStyle.Danger)

      actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
        joinButton,
        leaveButton,
      )
    }

    const embed = createCWEmbed(cwName, cw.game, cw.players)
    await interaction.update({ embeds: [embed], components: [actionRow] })
  }

  if (customId.startsWith('leave_cw_')) {
    if (!cw.players.includes(user.username)) {
      return interaction.reply({ content: 'Вы не записаны!', ephemeral: true })
    }

    cw.players.push(user.username)
    cw.players = cw.players.filter((player) => player !== user.username)

    const embed = createCWEmbed(cwName, cw.game, cw.players)
    await interaction.update({ embeds: [embed] })
  }

  if (customId.startsWith('start_cw_')) {
    const playersSorted = [...cw.players].sort(
      (a, b) => ratings[b] || 1000 - ratings[a] || 1000,
    )
    const team1 = playersSorted.filter((_, i) => i % 2 === 0)
    const team2 = playersSorted.filter((_, i) => i % 2 !== 0)
    if (!guild) return

    const category = await guild.channels.create({
      name: `${cwName}`,
      type: ChannelType.GuildCategory,
    })

    const team1Channel = await guild.channels.create({
      name: 'Команда 1',
      type: ChannelType.GuildVoice,
      parent: category.id,
    })

    const team2Channel = await guild.channels.create({
      name: 'Команда 2',
      type: ChannelType.GuildVoice,
      parent: category.id,
    })

    for (const player of team1) {
      const member = guild.members.cache.find((m) => m.user.username === player)
      if (member && member.voice.channel)
        await member.voice.setChannel(team1Channel)
    }

    for (const player of team2) {
      const member = guild.members.cache.find((m) => m.user.username === player)
      if (member && member.voice.channel)
        await member.voice.setChannel(team2Channel)
    }

    const startButton = new ButtonBuilder()
      .setCustomId(`start_cw_${cwName}`)
      .setLabel('Начать CW')
      .setStyle(ButtonStyle.Success)
      .setDisabled(true)
    const leaveButton = new ButtonBuilder()
      .setCustomId(`leave_cw_${cwName}`)
      .setLabel('Покинуть')
      .setStyle(ButtonStyle.Danger)
      .setDisabled(true)

    const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      startButton,
      leaveButton,
    )

    const embed = createCWEmbed(cwName, cw.game, cw.players)
    await interaction.update({
      embeds: [embed],
      components: [actionRow],
      content: 'CW началась! Каналы созданы и игроки распределены.',
    })
  }
}

function isUserInAnyCW(username: string): boolean {
  for (const [, cw] of activeCWs) {
    if (cw.players.includes(username)) {
      return true
    }
  }
  return false
}

export { handleStartCW, handleButtonClick, createCWEmbed }
