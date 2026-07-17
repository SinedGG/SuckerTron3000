module.exports = async (client) => {
  const update_name = require("./update_name");

  const streak = require("@models/streak");
  const streak_data = await streak.give_data();
  for (let i = 0; i < streak_data.length; i++) {
    const user_score = streak_data[i].User.Xp.score;
    await streak.update_last_score(streak_data[i].user_id, user_score);
    if (streak_data[i].give_today == false) {
      if (streak_data[i].freeze_days > 0) {
        await streak.update_freeze_days(
          streak_data[i].user_id,
          streak_data[i].freeze_days - 1,
        );
        console.log(
          `[Streak] ${streak_data[i].User.ds_name} freeze days left: ${streak_data[i].freeze_days - 1}`,
        );
        update_name(
          client,
          streak_data[i].User.ds_id,
          ` | ${streak_data[i].streak} 🧊`,
        );
      } else {
        await streak.update_streak(streak_data[i].user_id, 0);
        update_name(client, streak_data[i].User.ds_id, ``);
        console.log(`[Streak] ${streak_data[i].User.ds_name} streak reset`);
      }
    } else {
      await streak.update_give_today(streak_data[i].user_id, false);
      update_name(
        client,
        streak_data[i].User.ds_id,
        ` | ${streak_data[i].streak} 💧`,
      );
    }
  }
};
