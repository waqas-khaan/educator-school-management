const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  publicPath: "/",
  devServer: {
    historyApiFallback: true,
    port: 8080,
  },
});
