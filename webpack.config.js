/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const rules = [{
  test: /\.tsx*/,
  exclude: /node_modules/,
  loader: 'babel-loader'
}];

module.exports = {
  target: 'web',
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js'
  },
  module: {
    rules
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    port: 3000,
  }
};