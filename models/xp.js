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
  async get(ds_id) {
    return await prisma.xp.findUnique({
      where: {
        ds_id,
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
  async setMsgTimeout(ds_id, timeout) {
    return await prisma.xp.update({
      where: {
        ds_id,
      },
      data: {
        messageTimeout: timeout,
      },
    });
  },
  async getMsgTimeout(ds_id) {
    return await prisma.xp.findUnique({
      where: {
        ds_id,
      },
      select: {
        messageTimeout: true,
      },
    });
  },
  async setReactionTimeout(ds_id, timeout) {
    return await prisma.xp.update({
      where: {
        ds_id,
      },
      data: {
        reactionTimeout: timeout,
      },
    });
  },
  async getReactionTimeout(ds_id) {
    return await prisma.xp.findUnique({
      where: {
        ds_id,
      },
      select: {
        reactionTimeout: true,
      },
    });
  },
};
