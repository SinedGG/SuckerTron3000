const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async getOrCreate(ds_id, ds_name) {
    return await prisma.user.upsert({
      where: {
        ds_id,
      },
      update: {},
      create: {
        ds_id,
        ds_name,
        Timeouts: {
          create: {},
        },
      },
    });
  },
};
