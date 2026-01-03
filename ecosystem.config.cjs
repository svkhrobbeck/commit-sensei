/** @type {import('utilzify').EcosystemConfig} */
module.exports = {
  apps: [
    {
      name: "commit-sensei",
      script: "src/main.ts",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      interpreter: "tsx",
    },
  ],
};
