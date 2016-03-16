var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');
var plivo = require('plivo');
require('dotenv').config();


var app = express();
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', 'public');
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('*', function(req, res) {
    res.render('index');
});
//
// var authId = config.authId;
// var authToken = config.authToken;
// var plivoNumber = config.plivoNumber;
const authId = process.env.PLIVO_AUTH_ID;
const authToken = process.env.PLIVO_AUTH_TOKEN;
const plivoNumber = process.env.PLIVO_NUMBER;
// Send message to each number in the contacts list
var p = plivo.RestAPI({authId: authId, authToken: authToken});
app.post('/contacts', function(req, res) {
    p.send_message({
        src: plivoNumber,
    	dst: '1'+req.body.number,
        text: req.body.message
    }, function(status, response) {
        console.log('Status: ', status);
        console.log('API Response:\n', response);
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function(error) {
    if(error) {
        console.log('Error with server.', error);
    } else {
        console.log('Listening to port', port);
    }
})


// ************DEVELOPMENT SERVER***************
// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
// var config = require('./webpack.config');
//
// new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   historyApiFallback: true
// }).listen(4000, 'localhost', function (err, result) {
//   if (err) {
//     console.log(err);
//   }
//   console.log('Listening at localhost:4000');
// });
