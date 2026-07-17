module.exports = async (client) => {
  const xp = require("@models/xp");
  const cfg = require("@config/xp");

  const { ChannelType } = require("discord.js");

  const guild = client.guilds.cache.get(process.env.GUILD_ID);

  const voiceChannels = guild.channels.cache.filter(
    (channel) => channel.type === ChannelType.GuildVoice,
  );

  const users = [];

  voiceChannels.forEach((voiceChannel) => {
    if (
      voiceChannel.members.size === 0 ||
      voiceChannel.id === guild.afkChannelId
    ) {
      return;
    }

    const tempUsers = [];

    voiceChannel.members.forEach((member) => {
      const voiceState = guild.voiceStates.cache.get(member.id);

      if (!member.user.bot && !voiceState.selfDeaf) {
        let userActivity = [];

        if (member.presence) {
          userActivity = member.presence.activities
            .filter((activity) => activity.name !== "Custom Status")
            .map((activity) => activity.name);
        }

        tempUsers.push({
          id: member.id,
          name: member.user.username,
          mute: voiceState.selfMute,
          activity: userActivity,
        });
      }
    });

    if (tempUsers.length > 1) {
      users.push(...tempUsers);
    }
  });

  const result = calculateScores(users);

  for (const user of result) {
    const member = guild.members.cache.get(user.id);

    let userScore = user.score;

    if (member?.roles.cache.has(cfg.roles.serverBooster)) {
      userScore *= 2;
    }

    await xp.add(user.id, user.name, userScore);

    console.log(
      `[XP] ${user.name} got ${userScore} points for being active in voice channel`,
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
          otherUser.activity.includes(activity),
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
