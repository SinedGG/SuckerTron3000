const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ebal")
    .setDescription("Система досвіду - єБали"),
  async execute(interaction) {
    const { EmbedBuilder } = require("discord.js");

    const cfg = require("@config/xp");
    const gif = require("@config/gif");
    const xp = require("@models/xp");
    const noun = require("@utils/noun_declension.js");

    const score = await xp.get_by_user(interaction.user.id);

    const emoji = [
      "<a:redheartsded:1327404985901649940>",
      "<a:pinkheartsded:1327404983527931964>",
      "<a:orangeheartsded:1327404981200097300>",
      "<a:yellowheartsded:1327404979102945331>",
      "<a:greenheartsded:1327404972220092527>",
      "<a:lightblueheartsded:1327404976867119134>",
      "<a:blueheartsded:1327404974212386842>",
      "<a:purpleheartsded:1327404969892122718>",
      "<a:heartwithribbonsded:1327404967388123257>",
    ];

    let roleText = "";
    for (let i = 0; i < cfg.roles.id.length; i++) {
      roleText += `${emoji[i]} <@&${cfg.roles.id[i]}> - ${noun(
        cfg.roles.score[i],
        0
      )} \n`;
    }

    const embed = new EmbedBuilder()
      .setTitle(
        "<a:starsded:1327385723975893094> Система досвіду - єБали <a:starsded:1327385723975893094>"
      )
      .setDescription(
        "Прокачуйте свій рівень активності та отримуйте нові ролі! <a:bicepssded:1327385721362841600>"
      )
      .setThumbnail(gif.star)
      .addFields(
        {
          name: "<:questionmark:1327388775940096101> Як фармити єБали?",
          value: `
                <:memoS:1327385276485472276> Написання повідомлення: ${noun(
                  cfg.points.message,
                  0
                )} 
                <a:growingheartsded:1327385731970109551> Реакція на повідомлення: ${noun(
                  cfg.points.reaction,
                  0
                )}
                <:speakermediumvolume:1327382711769370746> Перебування у голосовому каналі: ${noun(
                  cfg.points.voice,
                  0
                )}/хв  
                <:videogame:1327382402854813809> Грати однакову гру з іншими учасниками: ${noun(
                  cfg.points.playTogether,
                  0
                )}/хв  
      `,
        },
        {
          name: " <:exclamationmark:1327388827643543562> Увага",
          value: `<:memoS:1327385276485472276> Якщо мікрофон **ЗАМУЧЕНО:** ${noun(
            cfg.points.voiceMuted,
            0
          )}/хв  
                  <:noentry:1327388858756890634> За фул мют бали **НЕ НАРАХОВУЮТЬСЯ**   
                  <a:zzzsded:1327385726790144130> У сплячому каналі бали **НЕ НАРАХОВУЮТЬСЯ** 
                `,
        },
        {
          name: "<a:starsded:1327385723975893094> Скільки єБалів потрібно для ролі?",
          value: `${roleText}`,
        },
        {
          name: `<a:rocketsded:1327385729117978707> У вас на рахунку - **${noun(
            score ? score.Xp.score : 0,
            0
          )}**!`,
          value:
            "\u200b\n<a:starsded:1327385723975893094> **Не зупиняйтесь на досягнутому — і отримуйте Єбали кожного дня! **",
        }
      )
      .setFooter({ text: "SDED Community", iconURL: gif.lottie })
      .setTimestamp()
      .setColor("#FFA500");

    await interaction.reply({ embeds: [embed] });
  },
};
