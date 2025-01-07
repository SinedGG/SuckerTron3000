const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async setMessage(ds_id) {
    return await prisma.user.update({
      where: {
        ds_id,
      },
      data: {
        Timeouts: {
          update: {
            message_timeout: new Date(),
          },
        },
      },
    });
  },
  async setReaction(ds_id) {
    return await prisma.user.update({
      where: {
        ds_id,
      },
      data: {
        Timeouts: {
          update: {
            reaction_timeout: new Date(),
          },
        },
      },
    });
  },
  async get(ds_id) {
    return await prisma.user.findUnique({
      where: {
        ds_id,
      },
      select: {
        Timeouts: true,
      },
    });
  },
};
