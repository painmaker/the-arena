"use strict";

var path = require("path");

var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

var TerserPlugin = require('terser-webpack-plugin');

var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

var isProduction = true;
/** @type {import('webpack').Configuration} */

module.exports = {
  mode: isProduction ? 'production' : 'development',
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserPlugin({}), new CssMinimizerPlugin()]
  },
  entry: "./hud/index.tsx",
  context: path.resolve(__dirname, "src"),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, "layout/custom_game/hud"),
    publicPath: "file://{resources}/layout/custom_game/hud"
  },
  resolve: {
    extensions: [".ts", ".tsx", "..."],
    symlinks: false
  },
  module: {
    rules: [{
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, {
        loader: "css-loader",
        options: {
          url: false,
          importLoaders: 1,
          modules: true
        }
      }],
      include: /\.module\.css$/
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, {
        loader: "css-loader",
        options: {
          url: false
        }
      }],
      exclude: /\.module\.css$/
    }, {
      test: /\.tsx?$/,
      loader: "ts-loader"
    }]
  },
  plugins: [new MiniCssExtractPlugin({
    filename: "index.css"
  }), new ForkTsCheckerWebpackPlugin({
    typescript: {
      configFile: path.resolve(__dirname, "tsconfig.json")
    }
  })]
};