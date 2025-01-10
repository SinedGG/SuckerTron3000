require("dotenv").config();
require("module-alias/register");
const { Client, Events, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  require("./modules/xp")(readyClient);
  // require("./modules/streak")(readyClient);

  require("./handlers/command")(readyClient);
  deplayCommands();
});

function deplayCommands() {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);

  const commands = Array.from(client.commands.values()).map(
    (item) => item.data
  );

  guild.commands
    .set(commands)
    .then(() => console.log("Command registered!"))
    .catch(console.error);
}

client.login(process.env.DS_TOKEN);
