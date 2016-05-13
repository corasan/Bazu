var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
// var upload = multer({ dest: 'dist/uploads/' });
var Firebase = require('firebase');
var ref = new Firebase('https://sms-react.firebaseio.com/');
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
// Multer function to store uploaded images
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './dist/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.jpeg`);
    }
});
var upload = multer({ storage: storage });

app.post('/upload', upload.single('imageFile'), function (req, res, next) {
    var user = ref.getAuth();
    var file = req.file.filename;
    ref.child('contacts').child(req.body.userID).once('value').then(function(dataSnapshot) {
        var data = dataSnapshot.val();
        for(var i in data) {
            // console.log(file);
            client.messages.create({
                from: twilioNumber,
                to: '1'+data[i].number,
                body: req.body.message,
                mediaUrl: `https://bazu-app.herokuapp.com/dist/uploads/${file}`
            }, function(err, message) {
                if(err) {
                    console.log('Error!', err);
                } else {
                    console.log('Message SID:', message.sid);
                }
            });
        }
    }).then(function() {
        res.send('<img src="https://bazu-app.herokuapp.com/dist/uploads/imageFile-1463163422238.jpeg"/>');
        res.end();
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
