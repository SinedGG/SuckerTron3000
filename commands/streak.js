const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("streak")
    .setDescription("Дізнатись повну інформацію про вогник"),

  async execute(interaction) {
    const { EmbedBuilder } = require("discord.js");

    const gif = require("@config/gif");
    const noun = require("@utils/noun_declension.js");

    const emoji = [
      "<:1stplacemedal:1327268510123950154>",
      "<:2ndplacemedal:1327268938395943026>",
      "<:3rdplacemedal:1327268961984974889>",
      "<:smallorangediamond:1327429783121956964>",
      "<:smallorangediamond:1327429783121956964>",
      "<:smallorangediamond:1327429783121956964>",
      "<:smallorangediamond:1327429783121956964>",
      "<:smallorangediamond:1327429783121956964>",
      "<:smallorangediamond:1327429783121956964>",
      "<:smallorangediamond:1327429783121956964>",
    ];

    const streak = require("@models/streak");
    const streak_data = await streak.get_top_streak();

    const user_streak = await streak.get_user_streaks(interaction.user.id);

    let leaderboard = "";
    streak_data.forEach((e, i) => {
      leaderboard += `${emoji[i]} <@${e.User.ds_id}>\n`;
    });

    const combinedMessage = new EmbedBuilder()
      .setColor("#FFA500")
      .setThumbnail(gif.fire)
      .setTitle(
        "<a:RaisingHandSded:1327253274708938885> Ласкаво просимо до світу Вогників! <a:RaisingHandSded:1327253274708938885>\n"
      )
      .addFields({
        name: "<a:firesdednew:1327249055725916231>**Поточна таблиця вогників:**\n",
        value: leaderboard,
      })
      .setDescription(
        `
        <:chartsded:1327252388368879647> Щодня ти можеш підтримувати свій вогник активності!
        <a:firesdednew:1327249055725916231> Слідкуй за своїм прогресом, змагайся з друзями та залишайся у топі лідерів!\n
        <:exclamationmark:1327388827643543562> Вогник оновлюється кожні 24 години (о 24:00)!
        <:exclamationmark:1327388827643543562>Пропуск дня обнуляє стрік!\n`
      )
      .addFields(
        {
          name: "<a:firesdednew:1327249055725916231>Ваш вогник:",
          value: `<a:alarmclocksded:1327427765682704555>На даний момент у вас ${noun(
            user_streak ? user_streak.Streak.streak : 0,
            1
          )}  поспіль!
        <a:heartonfiresded:1327427763187093598>Ваш найкращий результат: ${noun(
          user_streak ? user_streak.Streak.top_streak : 0,
          1
        )}  поспіль!\n`,
        },
        {
          name: "\u200b",
          value:
            "<a:firesdednew:1327249055725916231> **Залишайтеся активними та не гасіть свій вогник!**",
        }
      )
      .setFooter({ text: "SDED Community", iconURL: gif.lottie })
      .setTimestamp();

    await interaction.reply({ embeds: [combinedMessage] });
  },
};
