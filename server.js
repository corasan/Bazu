// var express = require('express');
//
// var app = express();
//
// app.set('view engine', 'ejs');
// app.set('views', 'public');
// app.use(express.static(__dirname + '/dist'));
//
// app.get('*', function(req, res) {
//     res.render('index');
// });
//
//
// var port = process.env.PORT || 3000;
// app.listen(port, function(error) {
//     if(error) {
//         console.log('Error with server.', error);
//     } else {
//         console.log('Listening to port', port);
//     }
// })


// ************DEVELOPMENT SERVER***************
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(4000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:4000');
});
