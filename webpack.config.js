const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
require('dotenv').config();
const config = require("./config")


module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.resolve(__dirname, "./"), "node_modules"],
    alias: {
        Components: path.resolve(__dirname, "./src/components/"),
        Store: path.resolve(__dirname, "./src/redux/"),
        Pages: path.resolve(__dirname, "./src/pages/"),
        Util: path.resolve(__dirname, "./src/util/"),
        '../../theme.config': path.join(__dirname, '/src/semantic-ui/theme.config'),
        "../semantic-ui/site": path.join(__dirname, "/src/semantic-ui/site")
    }
  },
  externals: {
    "ConfigData": JSON.stringify(config)
  },
  performance: {
    hints: false
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'less-loader',
          ],
        },
        {
          test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
          use: 'url-loader',
        }
      ],
  },
  plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
  
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash].css',
      }),

   
  ]
};