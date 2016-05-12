var express = require('express');
var bodyParser = require('body-parser');
// var plivo = require('plivo');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var browserHistory = require('react-router').browserHistory
var app = express();

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
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);

app.post('/upload', upload.single('imageFile'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.url);
  client.messages.create({
      from: twilioNumber,
      to: '1'+req.body.number,
      body: req.body.message,
      mediaUrl: req.file.path
  }, function(err, message) {
      if(err) {
          console.log('Error!', err);
          res.end();
      } else {
          console.log('Message SID:', message.sid);
          res.end();
      }
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function(error) {
    if(error) {
        console.log('Error with server.', error);
    } else {
        console.log('Listening to port', port);
    }
});
