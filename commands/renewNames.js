const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const update_name = require("@modules/streak/update_name");
const streak = require("@models/streak");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("renewnames")
    .setDescription("Admin command to renew names")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const streak_data = await streak.give_data();
    for (let i = 0; i < streak_data.length; i++) {
      if (streak_data[i].give_today == true && streak_data[i].streak > 0) {
        update_name(
          interaction.client,
          streak_data[i].User.ds_id,
          ` | ${streak_data[i].streak} 🔥`,
        );
      } else if (
        streak_data[i].give_today == false &&
        streak_data[i].streak > 0 &&
        streak_data[i].freeze_days == 2
      ) {
        update_name(
          interaction.client,
          streak_data[i].User.ds_id,
          ` | ${streak_data[i].streak} 💧`,
        );
      } else if (
        streak_data[i].give_today == false &&
        streak_data[i].streak > 0 &&
        streak_data[i].freeze_days == 1
      ) {
        update_name(
          interaction.client,
          streak_data[i].User.ds_id,
          ` | ${streak_data[i].streak} 🧊`,
        );
      } else {
        update_name(interaction.client, streak_data[i].User.ds_id, ``);
      }
    }

    await interaction.reply("You are an admin, command executed!");
  },
};
