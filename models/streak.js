const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async give_data() {
    return await prisma.streak.findMany({
      include: { User: { include: { Xp: true } } },
    });
  },

  async update_give_today(user_id, value) {
    return await prisma.streak.update({
      where: { user_id: user_id },
      data: { give_today: value },
    });
  },

  async update_streak(user_id, streak) {
    return await prisma.streak.update({
      where: { user_id: user_id },
      data: { streak: streak },
    });
  },

  async update_last_score(user_id, score) {
    return await prisma.streak.update({
      where: { user_id: user_id },
      data: { last_score: score },
    });
  },

  async update_top_streak(user_id, top_streak) {
    return await prisma.streak.update({
      where: { user_id: user_id },
      data: { top_streak: top_streak },
    });
  },

  async get_top_current_streak() {
    return await prisma.streak.findMany({
      orderBy: {
        top_streak: "desc",
      },
      take: 15,
      include: { User: true },
    });
  },
  async get_user_streaks(ds_id) {
    return await prisma.user.findUnique({
      where: { ds_id: ds_id },
      include: { Streak: true },
    });
  },
};
