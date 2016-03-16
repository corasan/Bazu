var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');

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

var accountSid = config.accountSid;
var authToken = config.authToken;
var sender = config.twilioNumber;
// Require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);
// Send message to each number in the contacts list
app.post('/contacts', function(req, res) {
    client.messages.create({
    	to: '1'+req.body.number,
    	from: '+15005550006',
        body: req.body.message
    }, function(err, message) {
        if(err) {
            console.log('There was an error sending the message', err);
        } else {
	       console.log(message.sid);
       }
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
