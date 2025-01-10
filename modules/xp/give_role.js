module.exports = async (client) => {
  const cfg = require("@config/xp");

  const xp = require("@models/xp");

  const xp_data = await xp.getAll();

  xp_data.forEach((e) => {
    const { score } = e;
    const memberId = e.User.ds_id;
  });
};
