var webpack = require("webpack");
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './web/1.js',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, './web/dist'),
    publicPath: '/dist/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    port: 3000,
    hot: true,
    contentBase: path.join(__dirname, "/web"),
    proxy: {
      "/api": {
        target: "http://localhost:7777",
      }
    }
    // publicPath: '/dist/'
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin([

      // {
      //   from: path.join(__dirname, './web/tools/axios.min.js')
      // },
      {
        from: path.join(__dirname, './web/main.html'),
        to: path.join(__dirname, './web/dist/main.html'),
      }
    ]),
  ],
  module: {
    rules: [
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    }
  }
}