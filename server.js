var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var plivo = require('plivo');

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

// Load environment variables
require('dotenv').config();
const authId = process.env.PLIVO_AUTH_ID;
const authToken = process.env.PLIVO_AUTH_TOKEN;
const plivoNumber = process.env.PLIVO_NUMBER;
// Receives data from client and sends the message using Plivo
var p = plivo.RestAPI({authId: authId, authToken: authToken});
app.post('/', function(req, res) {
    console.log(req.url);
    p.send_message({
        src: plivoNumber,
    	dst: '1'+req.body.number,
        text: req.body.message,
    }, function(status, response) {
        console.log('Status:', status);
        console.log('API Response:\n', response);
        res.end();
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function(error) {
    if(error) {
        console.log('Error with server.', error);
    } else {
        console.log('Listening to port', port);
    }
});
