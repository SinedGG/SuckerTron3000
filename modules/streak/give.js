const { update_top_streak } = require("../../models/streak");

async function give(client) {
const update_name = require("./update_name")

  const streak = require("@models/streak");
  const streak_data = await streak.give_data();
  for (let i = 0; i < streak_data.length; i++) {
    if (streak_data[i].give_today == 0) {
      const xp_today = streak_data[i].User.Xp.score - streak_data[i].last_score;
      if (xp_today >= 5) {
        let user_streak = streak_data[i].streak;
        user_streak += 1;
        await streak.update_streak(streak_data[i].user_id, user_streak);
        if (user_streak > streak_data[i].top_streak){
          await streak.update_top_streak(streak_data[i].user_id, user_streak)
        }
        await streak.update_give_today(streak_data[i].user_id, true);
        update_name(client,streak_data[i].User.ds_id,` | ${user_streak} 🔥`)
        console.log('user '+ streak_data[i].User.ds_name + ' resived ' + user_streak )
      } 
    }
  }
}
module.exports = give;



