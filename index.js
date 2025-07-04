require("http")
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Bot está rodando!");
  })
  .listen(process.env.PORT || 3000);

require("dotenv").config();
const { Client, GatewayIntentBits, Collection, Events, Partials } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Channel]
});

client.once("ready", () => {
  console.log(`Bot online como ${client.user.tag}`);
  require("./utils/sendButtons")(client);
});

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isButton()) {
    const handleButton = require("./interactions/handleButton");
    await handleButton(interaction);
  } else if (interaction.isModalSubmit()) {
    const handleModal = require("./interactions/handleModal");
    await handleModal(interaction);
  }
});

client.login(process.env.TOKEN);
