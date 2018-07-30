import nodeStart from "kin-pm2-start";

const pkg = require("../package.json");
const config = {
  name: pkg.name,
  script: "./app.js",
  watch: false,
  env: {
    PORT: "9090"
  }
};
nodeStart(config);
