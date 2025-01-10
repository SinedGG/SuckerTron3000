const { SlashCommandBuilder } = require("discord.js");
const gif = require("@config/gif");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const { EmbedBuilder } = require("discord.js");
    const embed = new EmbedBuilder()
      .setTitle("<a:starsded:1327385723975893094> Система досвіду - єБали <a:starsded:1327385723975893094>")
      .setDescription(
        "<a:partypoppersded:1327417596634464256>Вітаю <@274449343124078593> , ви покращили свій рівень і здобули роль <@&1326269871159378072>"
      )
      .setFooter({ text: "SDED Community", iconURL: gif.lottie})
      .setColor("#FFA500");
    await interaction.reply({ embeds: [embed] });
  },
};
