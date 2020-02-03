const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: { 
    main: './src/index.js',
    about: './src/about.js',
    analytics: './src/analytics.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: { loader: 'babel-loader'},
      exclude: /node_modules/,
    },
    {
      test: /\.(woff|woff2|ttf|otf|png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
            disable: true,
          }
        }
      ]
    },
    {
      test: /\.css$/,
      use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
    }
    ]
  },
  resolve: {
    alias: {
      images: path.resolve(__dirname, "images")
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/about.html',
      filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/analytics.html',
      filename: 'analytics.html'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
          preset: ['default'],
      },
      canPrint: true
    }),
    new WebpackMd5Hash()
  ],
};