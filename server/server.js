// ---------------------------------------------------
// Import NPM Libs
// ---------------------------------------------------

const express = require('express');
const http = require('http');
const cors = require('cors');

// ---------------------------------------------------
// Import Helpers
// ---------------------------------------------------

const routes = require('./routes');

// ---------------------------------------------------
// Constants
// ---------------------------------------------------

const app        = express();
const httpServer = http.Server( app );
const router     = express.Router();

const isProduction = (process.env.NODE_ENV === 'production') || false;
const port = 3000;

app.enable( 'trust proxy' );

app.use( '/', routes );

// ---------------------------------------------------
// Define template engine
// ---------------------------------------------------

app.use(express.static(__dirname + '/../dist'));
app.set('views', __dirname + '/../dist');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// ---------------------------------------------------
// Start Server
// ---------------------------------------------------

var server = httpServer.listen(process.env.PORT || port, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Started server at http://%s:%s', host, port);
});

// ---------------------------------------------------
// Start Webpack Server (Only Development)
// ---------------------------------------------------

if (!isProduction) {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const webpackConfig = require('../webpack.config.js');
  const compiler = webpack(webpackConfig);

  new WebpackDevServer(compiler, {
    hot: false,
    noInfo: true,
    quiet: false,
    stats: "errors-only",
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://0.0.0.0:3000',
        secure: false
      }
    },
    stats: { colors: true },
  }).listen(8080, '0.0.0.0', err => {
    if (err) console.log(err);
    console.log('Webpack Dev Server listening at 8080');
  });
}
