const { EmbedBuilder } = require("discord.js");

module.exports = async (client) => {
  const cfg = require("@config/xp");
  const gif = require("@config/gif");
  const xp = require("@models/xp");
  const anti_abuse = require("./anti_abuse");

  const xp_data = await xp.getAll();
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  const channel = client.channels.cache.get(process.env.MESSAGE_CHANNEL_ID);

  for (const e of xp_data) {
    const { score } = e;
    const member_id = e.User.ds_id;

    let member;
    try {
      member = await guild.members.fetch(member_id);
    } catch (err) {
      console.warn(`[Role] Cannot fetch member ${member_id}:`, err.message || err);
      continue; 
    }

    anti_abuse(member);

    const role_index = findIndexRange(Number(score), cfg.roles.score);

    if (role_index === -1) continue; 

    const role = guild.roles.cache.get(cfg.roles.id[role_index]);
    if (!role) continue; 

    const has_role = member.roles.cache.has(role.id);
    if (has_role) continue;

    if (role_index > 0) {
      const prew_role = guild.roles.cache.get(cfg.roles.id[role_index - 1]);
      if (prew_role) {
        await member.roles.remove(prew_role);
        console.log(`[Role] Role ${prew_role.name} removed from ${member.user.tag}`);
      }
    }

    await member.roles.add(role);
    console.log(`[Role] Role ${role.name} added to ${member.user.tag}`);

    if (channel) {
      const embed = new EmbedBuilder()
        .setTitle("<a:starsded:1327385723975893094> Система досвіду - єБали <a:starsded:1327385723975893094>")
        .setDescription(
          `<a:partypoppersded:1327417596634464256>Вітаю <@${member.user.id}> , ви покращили свій рівень і здобули роль <@&${role.id}>`
        )
        .setFooter({ text: "SDED Community", iconURL: gif.lottie })
        .setColor("#FFA500");

      await channel.send(`<@${member.user.id}>`);
      await channel.send({ embeds: [embed] });
    }
  }
};


function findIndexRange(number, array) {
  for (let i = 0; i < array.length - 1; i++) {
    if (number >= Number(array[i]) && number <= Number(array[i + 1])) {
      return i;
    }
  }
  return -1;
}
