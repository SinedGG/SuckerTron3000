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
  async getAll() {
    return await prisma.xp.findMany({
      include: {
        User: true,
      },
    });
  },
  async get_by_user(ds_id) {
    return await prisma.user.findUnique({
      where: {
        ds_id: ds_id,
      },
      include: {
        Xp: true,
      },
    });
  },
  async get_top_scored() {
    return await prisma.xp.findMany({
      include: {
        User: true,
      },
      orderBy: {
        score: "desc",
      },
      take: 15,
    });
  },
};
