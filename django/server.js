/**
 * Created by luca.lamorte on 18/05/2017.
 */


var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.local.config')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  headers: { "Access-Control-Allow-Origin": "*" },
  inline: true,
  color: true,
  progress: true,
  historyApiFallback: true,
}).listen(3000, config.ip, function (err, result) {
  if (err) {
    console.log(err)
  }

  console.log('Listening at ' + config.ip + ':3000')
})