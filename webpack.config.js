const { resolve }       = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const autoprefixer  = require('autoprefixer');
const postcssImport = require('postcss-import');
const cssMqPacker   = require('css-mqpacker');
const cssEasings    = require('postcss-easings');
const cssnano       = require('cssnano');
const precss        = require('precss');

let HtmlWebpackPluginObj = {
  template : './index.html',
  title    : 'Next Newsletter',
  namespace: 'gg'
};

const postCssPluginsDevelopment = ( webpack ) => {
  return [
    precss,
    autoprefixer,
    cssEasings,
    postcssImport({
      addDependencyTo: webpack
    })
  ];
}

const postCssPluginsProduction = () => {
  return [
    cssnano(),
    precss,
    autoprefixer,
    cssEasings
  ];
}

const webpackPluginsDevelopment = () => {
  return [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin( HtmlWebpackPluginObj ),
    new ExtractTextPlugin('styles.css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname
      }
    })
  ];
};

const webpackPluginsProduction = () => {
  return [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin( HtmlWebpackPluginObj ),
    new ExtractTextPlugin('styles.css')
  ];
}

const entrys = () => {
  let arrEntry = [];

  if( process.env.NODE_ENV != 'production' ) {
    arrEntry.push('react-hot-loader/patch');
    arrEntry.push('webpack-dev-server/client?http://0.0.0.0:8080');
    arrEntry.push('webpack/hot/only-dev-server');
  }

  arrEntry.push('./javascripts/index.js');

  return arrEntry;
}

module.exports = {
  entry: entrys(),

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  context: resolve(__dirname, 'src'),

  devtool: process.env.NODE_ENV == 'production' ? 'source-map' : 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins: process.env.NODE_ENV == 'production' ? postCssPluginsProduction() : postCssPluginsDevelopment(webpack)
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        use: 'file-loader?name=assets/images/[name].[ext]'
      },
      {
        test: /\.(svg)$/i,
        use: 'svg-inline-loader'
      },
      {
        test: /\.(mp4|mov|webm)$/,
        use: 'file-loader?name=assets/videos/[name].[ext]'
      },
      {
        test: /\.(ttf|eot|otf|woff(2)?)(\w+)?$/,
        use: 'file-loader?name=assets/fonts/[name].[ext]'
      }
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.scss', '.svg'],
    alias: {
      stylesheets : resolve(__dirname, 'src/stylesheets'),
      javascripts : resolve(__dirname, 'src/javascripts'),
      assets      : resolve(__dirname, 'assets')
    }
  },

  plugins: process.env.NODE_ENV == 'production' ? webpackPluginsProduction() : webpackPluginsDevelopment()
};