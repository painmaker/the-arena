const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { PanoramaManifestPlugin, PanoramaTargetPlugin } = require("@aabao/webpack-panorama");
const TerserPlugin = require('terser-webpack-plugin');


/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({})],
  },
  context: path.resolve(__dirname, "src"),
  output: {
    path: path.resolve(__dirname, "layout/custom_game"),
    publicPath: "file://{resources}/layout/custom_game/",
  },
  resolve: {
    extensions: [".ts", ".tsx", "..."],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.xml$/,
        loader: "@aabao/webpack-panorama/lib/layout-loader"
      },
      {
        test: /\.[jt]sx?$/,
        issuer: /\.xml$/,
        loader: "@aabao/webpack-panorama/lib/entry-loader"
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.css$/,
        issuer: /\.xml$/,
        loader: "file-loader",
        options: {
          name: "[path][name].css",
          esModule: false
        },
      },
    ],
  },
  plugins: [
    new PanoramaTargetPlugin(),
    new PanoramaManifestPlugin({
      entries: [
        { import: "./hud/index.xml", type: "Hud" },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, "tsconfig.json"),
      },
    }),
  ],
};