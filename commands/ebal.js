const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ebal")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const { EmbedBuilder } = require("discord.js");
    const cfg = require("@config/xp");

    let roleText = "";

    cfg.roles.forEach((role) => {
      roleText += `<@&${role}> \n`;
    });

    const embed = new EmbedBuilder()
      .setTitle("Ebal")
      .setTimestamp()
      .setTitle("Система досвіду - єБали")
      .setDescription(roleText);
    await interaction.reply({ embeds: [embed] });
  },
};
