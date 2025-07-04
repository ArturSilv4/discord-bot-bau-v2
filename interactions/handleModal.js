const { EmbedBuilder } = require("discord.js");

module.exports = async function handleModal(interaction) {
  const [_, tipo, canal] = interaction.customId.split("_");
  const item = interaction.fields.getTextInputValue("item");
  const quantidade = interaction.fields.getTextInputValue("quantidade");

  const embed = new EmbedBuilder()
    .setTitle(tipo === "entrada" ? "📥 Entrada Registrada" : "📤 Saída Registrada")
    .setColor(tipo === "entrada" ? 0x2ecc71 : 0xe74c3c)
    .addFields(
      { name: "Item", value: item, inline: true },
      { name: "Quantidade", value: quantidade, inline: true },
      { name: "Usuário", value: interaction.user.tag, inline: true }
    )
    .setTimestamp();

  const logChannelId = process.env[`${canal}_ID`];
  const logChannel = await interaction.client.channels.fetch(logChannelId);
  await logChannel.send({ embeds: [embed] });

  await interaction.reply({ content: `Registro de ${tipo} enviado com sucesso.`, flags: 64 });
};
