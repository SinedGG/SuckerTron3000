require("dotenv").config();
require("module-alias/register");
const { Client, Events, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  require("./modules/xp")(readyClient);
  require("./handlers/command")(client);
  const guild = client.guilds.cache.get(process.env.GUILD_ID);

  const pingCommand = require("./commands/ebal").data;

  guild.commands
    .set([pingCommand])
    .then(() => console.log("Command registered!"))
    .catch(console.error);
});

client.login(process.env.DS_TOKEN);
