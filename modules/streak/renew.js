module.exports = async (client) => {
  const update_name = require("./update_name");

  const streak = require("@models/streak");
  const streak_data = await streak.give_data();
  for (let i = 0; i < streak_data.length; i++) {
    const user_score = streak_data[i].User.Xp.score;
    await streak.update_last_score(streak_data[i].user_id, user_score);
    if (streak_data[i].give_today == false) {
      await streak.update_streak(streak_data[i].user_id, 0);
      update_name(client, streak_data[i].User.ds_id, ``);
      console.log(`[Streak] ${streak_data[i].User.ds_name} streak reset`);
    } else {
      await streak.update_give_today(streak_data[i].user_id, false);
    }
  }
};
