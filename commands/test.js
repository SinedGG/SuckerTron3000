const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const { EmbedBuilder } = require("discord.js");
    const embed = new EmbedBuilder()
      .setTitle("🌟 Система досвіду - єБали 🌟")
      .setDescription(
        "Вітаю 🎉 <@274449343124078593> , ви покращили свій рівень і здобули роль <@&1326269871159378072>"
      )
      .setFooter({ text: "✨ SDED Community ✨" });
    await interaction.reply({ embeds: [embed] });
  },
};
