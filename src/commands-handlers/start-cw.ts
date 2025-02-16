import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  Interaction,
} from 'discord.js'

const MAX_PLAYERS = 2
const activeCWs = new Map<string, { game: string; players: string[] }>()

async function handleStartCW(interaction: ChatInputCommandInteraction) {
  const game = interaction.options.getString('game', true)
  const cwId = interaction.channelId

  activeCWs.set(cwId, { game, players: [] })

  const embed = createCWEmbed(game, [])

  const joinButton = new ButtonBuilder()
    .setCustomId(`join_cw_${cwId}`)
    .setLabel('Записаться')
    .setStyle(ButtonStyle.Primary)

  const leaveButton = new ButtonBuilder()
    .setCustomId(`leave_cw_${cwId}`)
    .setLabel('Покинуть')
    .setStyle(ButtonStyle.Danger)

  const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    joinButton, leaveButton,
  )

  await interaction.reply({ embeds: [embed], components: [actionRow] })
}

function createCWEmbed(game: string, players: string[]) {
  return new EmbedBuilder()
    .setTitle(`${game.toUpperCase()} - Clan War`)
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

  const { customId, user, channelId } = interaction
  if (!customId.startsWith('join_cw_') && !customId.startsWith('leave_cw_'))
    return
  if (customId.startsWith('join_cw_')) {
    const cw = activeCWs.get(channelId)
    if (!cw)
      return interaction.reply({ content: 'Сбор не найден.', ephemeral: true })

    if (cw.players.includes(user.username)) {
      return interaction.reply({ content: 'Вы уже записаны!', ephemeral: true })
    }

    if (cw.players.length >= MAX_PLAYERS) {
      return interaction.reply({
        content: 'Набор уже завершен!',
        ephemeral: true,
      })
    }

    cw.players.push(user.username)

    const embed = createCWEmbed(cw.game, cw.players)
    await interaction.update({ embeds: [embed] })
  }

  if (customId.startsWith('leave_cw_')) {
    const cw = activeCWs.get(channelId)
    if (!cw)
      return interaction.reply({ content: 'Сбор не найден.', ephemeral: true })

    if (!cw.players.includes(user.username)) {
      return interaction.reply({ content: 'Вы не записаны!', ephemeral: true })
    }

    cw.players.push(user.username)
    cw.players = cw.players.filter(player => player !== user.username)

    const embed = createCWEmbed(cw.game, cw.players)
    await interaction.update({ embeds: [embed] })
  }
}

export { handleStartCW, handleButtonClick }
