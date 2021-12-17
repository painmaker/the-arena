const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProduction = true;

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: isProduction ? 'production' : 'development',
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({}),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ['default', {
            normalizeUrl: false,
            colormin: false,
            minifyFontValues: false,
            reduceIdents: false,
            normalizeString: { preferredQuote: 'single' },
            normalizeWhitespace: false,
          }]
        }
      }),
    ],
  },
  entry: "./hud/index.tsx",
  context: path.resolve(__dirname, "src"),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, "layout/custom_game/hud"),
    publicPath: "file://{resources}/layout/custom_game/hud",
    clean: false,
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
              url: true,
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
              url: true,
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, "tsconfig.json"),
      },
    })
  ],
};