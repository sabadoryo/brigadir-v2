import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  Interaction,
} from 'discord.js'
import activeCWs from '../../storage/active-cws'
import { createCWEmbed } from './start-cw'

async function handleListCW(interaction: ChatInputCommandInteraction) {
  if (activeCWs.size === 0) {
    return interaction.reply({
      content: 'Нет активных CW.',
      ephemeral: true,
    })
  }

  const cwNames = Array.from(activeCWs.keys()) // Получаем список CW
  let index = 0
  const firstCW = activeCWs.get(cwNames[index])!

  const embed = createCWEmbed(cwNames[index], firstCW.game, firstCW.players)

  const prevButton = new ButtonBuilder()
    .setCustomId(`cw_list_prev_${interaction.user.id}`)
    .setLabel('⬅ Назад')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true)

  const nextButton = new ButtonBuilder()
    .setCustomId(`cw_list_next_${interaction.user.id}`)
    .setLabel('Вперёд ➡')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(cwNames.length <= 1)

  const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    prevButton,
    nextButton,
  )

  await interaction.reply({
    embeds: [embed],
    components: [actionRow],
  })
}

async function handleListCWButtons(interaction: Interaction) {
  if (!interaction.isButton()) return

  const { customId, user, message } = interaction
  if (!customId.startsWith('cw_list_')) return

  const action = customId.split('_')[2]
  const userId = customId.split('_')[3]

  if (user.id !== userId) {
    return interaction.reply({
      content: 'Вы не можете управлять этим списком!',
      ephemeral: true,
    })
  }

  const cwNames = Array.from(activeCWs.keys())
  let currentIndex = cwNames.findIndex(
    (name) => name === message.embeds[0]?.data.title,
  )

  if (action === 'prev' && currentIndex > 0) currentIndex--
  if (action === 'next' && currentIndex < cwNames.length - 1) currentIndex++

  const currentCW = activeCWs.get(cwNames[currentIndex])!

  const embed = createCWEmbed(cwNames[currentIndex], currentCW.game, currentCW.players)

  const prevButton = new ButtonBuilder()
    .setCustomId(`cw_list_prev_${user.id}`)
    .setLabel('⬅ Назад')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(currentIndex === 0)

  const nextButton = new ButtonBuilder()
    .setCustomId(`cw_list_next_${user.id}`)
    .setLabel('Вперёд ➡')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(currentIndex === cwNames.length - 1)

  const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    prevButton,
    nextButton,
  )

  await interaction.update({
    embeds: [embed],
    components: [actionRow],
  })
}

export { handleListCW, handleListCWButtons }
