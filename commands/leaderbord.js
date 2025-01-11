const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderbord")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const { EmbedBuilder } = require("discord.js");

    const xp = require("@models/xp");
    const gif = require("@config/gif");

    const xp_data = await xp.get_top_scored();
    const role_id = require("@utils/get_role_id_by_xp");
    let score_text = "";

    xp_data.forEach((e, i) => {
      const role = role_id(e.score);
      const role_tag = role ? `<@&${role}>` : "";
      score_text += `${i + 1}. <@${e.User.ds_id}> - ${e.score}⠀⠀⠀⠀⠀\n`;
    });

    const streak = require("@models/streak");
    const streak_data = await streak.get_top_current_streak();

    let streak_text = "";
    streak_data.forEach((e, i) => {
      streak_text += `${i + 1}. <@${e.User.ds_id}>\n`;
    });

    const exampleEmbed = new EmbedBuilder()
      .setTitle("Some title")
      .setThumbnail(gif.fireworks)
      .setDescription("Some description heren \n\n\n")
      .addFields()
      .addFields(
        {
          name: "<a:starsded:1327385723975893094> Таблиця лідерів єБали:",
          value: score_text,
          inline: true,
        },
        {
          name: "<a:firesdednew:1327249055725916231> Найдовший стрік:",
          value: streak_text,
          inline: true,
        }
      )
      .setColor("#FFA500");

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
