module.exports = async (client) => {
  const xp = require("@models/xp");

  const { ChannelType } = require("discord.js");

  const guild = client.guilds.cache.get(process.env.GUILD_ID);

  const voiceChannels = guild.channels.cache.filter(
    (channel) => channel.type === ChannelType.GuildVoice
  );

  const users = [];
  voiceChannels.forEach((voiceChannel) => {
    if (
      voiceChannel.members.size === 0 ||
      voiceChannel.id === guild.afkChannelId
    ) {
      return;
    }

    const temp_users = [];

    voiceChannel.members.forEach((member) => {
      if (
        !member.user.bot &&
        !guild.voiceStates.cache.get(member.id).selfDeaf
      ) {
        let user_activity = [];
        if (member.presence) {
          user_activity = member.presence.activities
            .filter((activity) => activity.name !== "Custom Status")
            .map((activity) => activity.name);
        }
        temp_users.push({
          id: member.id,
          name: member.user.username,
          mute: guild.voiceStates.cache.get(member.id).selfMute,
          activity: user_activity,
        });
      }
    });
    if (temp_users.length > 1) {
      users.push(...temp_users);
    }
  });
  const result = calculateScores(users);
  for (let i = 0; i < result.length; i++) {
    const user = result[i];
    const user_score = user.score;
    await xp.add(user.id, user.name, user_score);
    console.log(
      `[XP] ${user.name} got ${user_score} points for being active in voice channel`
    );
  }
};

const calculateScores = (data) => {
  const cfg = require("@config/xp");
  return data.map((user, _, array) => {
    let score = user.mute ? cfg.points.voiceMuted : cfg.points.voice;

    array.forEach((otherUser) => {
      if (user.id !== otherUser.id) {
        const hasCommonActivity = user.activity.some((activity) =>
          otherUser.activity.includes(activity)
        );
        if (
          hasCommonActivity &&
          user.activity.length > 0 &&
          otherUser.activity.length > 0
        ) {
          score += 2;
        }
      }
    });

    score = Math.min(score, 4);

    return { ...user, score };
  });
};
