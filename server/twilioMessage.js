const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);

module.exports = function(data, body, file) {
    for(var i in data) {
        client.messages.create({
            from: twilioNumber,
            to: '1'+data[i].number,
            body: body,
            mediaUrl: `https://bazu-app.herokuapp.com/${file}`
        }, function(err, message) {
            if(err) {
                console.log('Error sending MMS! Details:', err);
            } else {
                console.log(`MMS with file: ${file}, sent with success`);
                console.log('Message SID:', message.sid);
            }
        });
    }
}
