const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); 
const extractLess = new ExtractTextPlugin({                       
    filename: "styles.css",                                       
    disable: process.env.NODE_ENV === "development"
});

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
  LESS: path.resolve(__dirname, 'src/less'),
};

// Webpack configuration
module.exports = {
  entry: path.join(paths.JS, 'app.js'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js',
  },
  //externals: ['axios'],
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
    extractLess
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      },
      {
	    test: /\.less$/,
	    use: [{
	          loader: "style-loader" // creates style nodes from JS strings
	      }, {
	          loader: "css-loader" // translates CSS into CommonJS
	      }, {
	          loader: "less-loader" // compiles Less to CSS
	      }]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};