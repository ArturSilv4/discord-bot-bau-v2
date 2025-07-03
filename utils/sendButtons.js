const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async function sendButtons(client) {
  const registros = [
    {
      registroId: process.env.REGISTRO1_ID,
      entradaCanal: "ENTRADA1",
      saidaCanal: "SAIDA1"
    },
    {
      registroId: process.env.REGISTRO2_ID,
      entradaCanal: "ENTRADA2",
      saidaCanal: "SAIDA2"
    }
  ];

  for (const reg of registros) {
    const canal = await client.channels.fetch(reg.registroId);
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`entrada_${reg.entradaCanal}`)
          .setLabel("✅ Entrada")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`saida_${reg.saidaCanal}`)
          .setLabel("❌ Saída")
          .setStyle(ButtonStyle.Danger)
      );

    const sent = await canal.send({ content: "Escolha uma ação:", components: [row] });
    await sent.pin();
  }
};
