const { PrismaClient } = require("@prisma/client");
const cfg = require("@config/xp");

const prisma = new PrismaClient();

module.exports = {
  async setMessage(ds_id) {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + cfg.timeouts.message);

    return prisma.user.update({
      where: { ds_id },
      data: {
        Timeouts: {
          update: {
            message_timeout: expires,
          },
        },
      },
    });
  },

  async setReaction(ds_id) {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + cfg.timeouts.reaction);

    return prisma.user.update({
      where: { ds_id },
      data: {
        Timeouts: {
          update: {
            reaction_timeout: expires,
          },
        },
      },
    });
  },

  async get(ds_id) {
    return prisma.user.findUnique({
      where: { ds_id },
      select: {
        Timeouts: true,
      },
    });
  },
};