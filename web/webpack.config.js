// If you get a wierd error about ExtractTextPlugin then uncomment the next line
// require('es6-promise').polyfill()
var webpack = require('webpack');  
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {  
  context: __dirname,
  entry: "./src/index.js",
  module: {
    loaders: [
      
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 
                     'transform-decorators-legacy']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  debug: true,
  devtool: "#eval-source-map",
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new ExtractTextPlugin('src/assets/stylesheets/app.css', { allChunks: true })
  ]
};
