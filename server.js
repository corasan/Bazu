var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var Firebase = require('firebase');
var ref = new Firebase('https://sms-react.firebaseio.com/');
var subscribe = ('./server/subscribePlan');
var stripe = require('stripe')('sk_test_eKoluhDWiFcfBadmRMlf4I08');
// process.env.STRIPE_TEST_KEY
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

// Load environment variables
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);

app.post('/payment', function (req, res) {
    // console.log(req.body.plan);
    var email = req.body.email;
    var stripeToken = req.body.stripeToken;
    var plan = req.body.plan;
    // console.log(stripeToken);

    stripe.customers.create({
        source: stripeToken,
        plan: plan,
        email: email
    }, function(err, customer) {
        if (err) {
            console.log('An error occurred trying to subscribe to this plan:', err);
        } else {
            console.log('Subscription successful', customer);
        }
    });
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
        for(var i in data) {
            client.messages.create({
                from: twilioNumber,
                to: '1'+data[i].number,
                body: body,
                mediaUrl: `https://bazu-app.herokuapp.com/${file}`
                // mediaUrl: `http://localhost:3000/${file}`
            }, function(err, message) {
                if(err) {
                    console.log('Error sending MMS! Details:', err);
                } else {
                    console.log(`MMS with file: ${file}, sent with success`);
                    console.log('Message SID:', message.sid);
                }
            });
        }
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
