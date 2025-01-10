module.exports = (member) => {
  const cfg = require("@config/xp");
  const xp = require("@models/xp");

  const member_roles = member.roles.cache.map((role) => role.id);
  const xp_roles = cfg.roles.id;
  member_roles.forEach(async (role) => {
    const role_index = xp_roles.indexOf(role);

    if (role_index === -1) return;
    const score = await xp.get_by_user(member.id);

    if (
      score.Xp.score < cfg.roles.score[role_index] ||
      score.Xp.score > cfg.roles.score[role_index + 1]
    ) {
      console.log(`[AntiAbuse] Removing role ${role} from ${member.user.tag}`);
      member.roles.remove(role);
    }
  });
};
