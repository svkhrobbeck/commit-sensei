module.exports = {
  apps: [
    {
      name: "commit-sensei",
      script: "src/start.ts",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      interpreter: "tsx",
    },
  ],
};
