const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async add(id, score) {
    return await prisma.xp.upsert({
      where: {
        ds_id: id,
      },
      update: {
        score: { increment: score },
      },
      create: {
        ds_id: id,
      },
    });
  },
  async getAll() {
    return await prisma.xp.findMany({
      orderBy: {
        score: "desc",
      },
    });
  },
};
