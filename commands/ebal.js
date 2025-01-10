const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ebal")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const { EmbedBuilder } = require("discord.js");

    const cfg = require("@config/xp");
    const gif = require("@config/gif");
    const xp = require("@models/xp");
    const numberFromat = require("@utils/numberFormat");

    let score = await xp.get_by_user(interaction.user.id);
    if (!score) score = { Xp: { score: 0 } };

    let roleText = "";
    for (let i = 0; i < cfg.roles.id.length; i++) {
      roleText += `<@&${cfg.roles.id[i]}> - ${numberFromat(
        cfg.roles.score[i]
      )} \n`;
    }

    const embed = new EmbedBuilder()
      .setTitle("🌟 Система досвіду - єБали 🌟")
      .setDescription(
        "Прокачуйте свій рівень активності та отримуйте нові ролі! 💪"
      )
      .setThumbnail(gif.star)
      .addFields(
        {
          name: "❓ Як фармити єБали?",
          value: `
                ⠀•⠀ 💬 *Написання повідомлення*: ${numberFromat(
                  cfg.points.message
                )}  
                ⠀•⠀ 👍 *Реакція на повідомлення*: ${numberFromat(
                  cfg.points.reaction
                )}  
                ⠀•⠀ 🎤 *Перебування у голосовому каналі*: ${numberFromat(
                  cfg.points.voice
                )}  
                ⠀•⠀ 🎮 *Грати однакову гру з іншими учасниками*: ${numberFromat(
                  cfg.points.playTogether
                )}  
      `,
        },
        {
          name: "🎯 Скільки єБалів потрібно для ролі?",
          value: `${roleText}`,
        },
        {
          name: `📊 У вас на рахунку - **${numberFromat(score.Xp.score)}**!`,
          value: "Не зупиняйтесь на досягнутому!  .<a:sla:1138386766420783124>",
        }
      )
      .setFooter({ text: "✨ SDED Community ✨" })
      .setColor(0x00ff00);

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
