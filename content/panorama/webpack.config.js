const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { PanoramaManifestPlugin, PanoramaTargetPlugin } = require("webpack-panorama");

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: isProduction ? 'production' : 'development',
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
        loader: "webpack-panorama/lib/layout-loader"
      },
      {
        test: /\.[jt]sx?$/,
        issuer: /\.xml$/,
        loader: "webpack-panorama/lib/entry-loader"
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
        { import: "./loading-screen/layout.xml", filename: "custom_loading_screen.xml" },
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