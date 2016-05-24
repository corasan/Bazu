var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var Firebase = require('firebase');
var ref = new Firebase('https://sms-react.firebaseio.com/');

var app = express();

app.set('view engine', 'ejs');
app.set('views', 'public');
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('*', function(req, res) {
    res.render('index');
});

app.post('/payment', function (req, res) {
    // console.log(req.body.plan);
j    var stripeToken = req.body.stripeToken;
    var plan = req.body.plan;
    require('./server/subscribePlan')(stripeToken, plan);
    res.end();
});

// Multer function to store uploaded images
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.jpeg`);
    }
});
var upload = multer({ storage: storage });
// Save message to database with date
function saveMessage(uid, email, file) {
    var date = new Date();
    var day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear();

    ref.child('messages').child(uid).push({
        author: email,
        message: file,
        date: `${month+1}/${day}/${year}`,
    });
}

app.post('/upload', upload.single('imageFile'), function (req, res, next) {
    var file = req.file.filename;
    var body = req.body.message;
    var uid = req.body.userID;
    var email = req.body.userEmail;
    req.file.mimetype = 'image/jpeg';

    ref.child('contacts').child(uid).once('value').then(function(dataSnapshot) {
        var dataSnap = dataSnapshot.val();
        return dataSnap;
    }).then(function(data) {
        require('./server/twilioMessage')(data, body, file);
        saveMessage(uid, email, file);
    });
    res.redirect('/');
});

const port = process.env.PORT || 3000;
app.listen(port, function(error) {
    if(error) {
        console.log('Error with server.', error);
    } else {
        console.log('Listening to port', port);
    }
});
