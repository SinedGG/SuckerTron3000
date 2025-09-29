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
      let user_streak = streak_data[i].streak;
      if(user_streak > 0){
      update_name(interaction.client, streak_data[i].User.ds_id, ` | ${user_streak} 🔥`);
      }
    }

    await interaction.reply("You are an admin, command executed!");
  },
};
