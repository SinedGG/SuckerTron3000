const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const user = require("@models/user");

module.exports = {
  async add(ds_id, ds_name, score) {
    const u = await user.getOrCreate(ds_id, ds_name);

    return await prisma.xp.upsert({
      where: {
        user_id: u.id,
      },
      update: {
        score: {
          increment: score,
        },
      },
      create: {
        User: {
          connect: {
            id: u.id,
          },
        },
        score,
      },
    });
  },
};
