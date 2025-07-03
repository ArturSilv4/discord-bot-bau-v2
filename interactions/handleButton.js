const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = async function handleButton(interaction) {
  const [tipo, canal] = interaction.customId.split("_");

  const modal = new ModalBuilder()
    .setCustomId(`modal_${tipo}_${canal}`)
    .setTitle(tipo === "entrada" ? "Registrar Entrada" : "Registrar Saída");

  const itemInput = new TextInputBuilder()
    .setCustomId("item")
    .setLabel("Nome do item")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const quantInput = new TextInputBuilder()
    .setCustomId("quantidade")
    .setLabel("Quantidade")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const row1 = new ActionRowBuilder().addComponents(itemInput);
  const row2 = new ActionRowBuilder().addComponents(quantInput);

  modal.addComponents(row1, row2);

  await interaction.showModal(modal);
};
