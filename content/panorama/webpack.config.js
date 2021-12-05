const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProduction = false;

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: isProduction ? 'production' : 'development',
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserPlugin({})],
  },
  entry: "./hud/index.tsx",
  context: path.resolve(__dirname, "src"),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, "layout/custom_game/hud"),
    publicPath: "file://{resources}/layout/custom_game/hud",
  },
  resolve: {
    extensions: [".ts", ".tsx", "..."],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          }
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      }
    ],
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, "tsconfig.json"),
      },
    }),
  ],
};