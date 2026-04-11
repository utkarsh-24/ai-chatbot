const path = require("path");
const ZipPlugin = require("zip-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const entries = {
  chatbotAgent: "./chatbotAgent/index.ts",
};

module.exports = {
  entry: entries,
  target: "node",
  mode: "production",
  externals: [
    nodeExternals({
      importType: "module",
      modulesDir: path.resolve("./node_modules"),
    }),
    "@aws-sdk",
  ],
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.join(__dirname, "dist/"),
    filename: "[name]/index.js",
    libraryTarget: "commonjs",
  },
  resolve: {
    extensions: [".ts", ".js", ".mjs"],
    alias: {},
    modules: [path.resolve("./"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: [
          [
            path.resolve(__dirname, ".serverless"),
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, ".webpack"),
            path.resolve(__dirname, "dist"),
          ],
        ],
      },
    ],
  },
  plugins: Object.keys(entries).map(
    (name) =>
      new ZipPlugin({
        filename: `${name}.zip`,
        include: [`${name}/`],
        path: path.resolve(__dirname, "dist"),
      })
  ),
};
