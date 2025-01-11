module.exports = {
  apps: [
    {
      name: "sucker-tron3000",
      cwd: "/var/pm2/apps/sucker-tron3000",
      script: "index.js",
      log_date_format: "YYYY-MM-DD HH:mm Z",

      env: {
        DS_TOKEN: "",

        GUILD_ID: "",

        CLIENT_ID: "",

        MESSAGE_CHANNEL_ID: "",

        DATABASE_URL: "",
      },
    },
  ],
};
