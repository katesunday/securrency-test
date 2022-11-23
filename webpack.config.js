const WranglerJsCompatWebpackPlugin = require("wranglerjs-compat-webpack-plugin");

module.exports = {
  target: "webworker",
  entry: "./index.js",
  mode: "production",
  plugins: [new WranglerJsCompatWebpackPlugin()],
};
